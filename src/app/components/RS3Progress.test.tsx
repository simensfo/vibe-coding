import { renderToStaticMarkup } from 'react-dom/server';
import { Mock, vi } from 'vitest';
import { cookies } from 'next/headers';
import RS3Progress from './RS3Progress';

vi.mock('@/app/components/RecentSearchesClient', () => ({
  __esModule: true,
  default: ({ rsn, recent }: { rsn: string; recent: string[] }) => (
    <div data-testid="recent-client">
      {rsn}:{recent.join(',')}
    </div>
  ),
}));

describe('RS3Progress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders heading and form', async () => {
    (cookies as unknown as Mock).mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: '["Bob"]' }),
    });

    const html = renderToStaticMarkup(await RS3Progress({ rsn: 'Alice' }));
    expect(html).toContain('RS3 Progress');
    expect(html).toContain('Recent:');
    expect(html).toContain('Alice');
    expect(html).toContain('Bob');
  });

  it('handles invalid cookie payload', async () => {
    (cookies as unknown as Mock).mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: 'not-json' }),
    });

    const html = renderToStaticMarkup(await RS3Progress({ rsn: '' }));
    expect(html).not.toContain('Recent:');
  });
});
