import { renderToStaticMarkup } from 'react-dom/server';
import { vi } from 'vitest';
import Loading from './loading';

vi.mock('@/app/components/ResultsSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton">loading...</div>,
}));

describe('Root loading', () => {
  it('renders heading and skeleton', () => {
    const html = renderToStaticMarkup(<Loading />);
    expect(html).toContain('RS3 Progress');
    expect(html).toContain('data-testid="skeleton"');
  });
});
