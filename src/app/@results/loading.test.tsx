import { renderToStaticMarkup } from 'react-dom/server';
import { vi } from 'vitest';
import Loading from './loading';

vi.mock('@/app/components/ResultsSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="slot-skeleton">slot</div>,
}));

describe('@results loading', () => {
  it('wraps skeleton in container', () => {
    const html = renderToStaticMarkup(<Loading />);
    expect(html).toContain('data-testid="slot-skeleton"');
  });
});
