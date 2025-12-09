import { render, waitFor } from '@testing-library/react';
import RecentSearchesClient from './RecentSearchesClient';

describe('RecentSearchesClient', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('writes recent searches to cookie', async () => {
    render(<RecentSearchesClient rsn="Alice" recent={['Bob']} />);
    await waitFor(() => {
      expect(document.cookie).toContain('recent_rsn=');
    });
    expect(decodeURIComponent(document.cookie)).toContain('Alice');
    expect(decodeURIComponent(document.cookie)).toContain('Bob');
  });

  it('handles invalid cookie data gracefully', async () => {
    document.cookie = 'recent_rsn=not-json';
    render(<RecentSearchesClient rsn="Charlie" recent={[]} />);
    await waitFor(() => {
      expect(document.cookie).toContain('recent_rsn=');
    });
    expect(decodeURIComponent(document.cookie)).toContain('Charlie');
  });
});
