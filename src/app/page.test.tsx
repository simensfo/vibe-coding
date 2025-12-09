import { renderToStaticMarkup } from 'react-dom/server';
import { vi } from 'vitest';
import Page from './page';

vi.mock('@/app/components/RS3Progress', () => ({
  __esModule: true,
  default: ({ rsn }: { rsn: string }) => <div data-testid="progress">{rsn}</div>,
}));

describe('Home Page', () => {
  it('passes trimmed rsn to RS3Progress', async () => {
    const html = renderToStaticMarkup(
      await Page({ searchParams: Promise.resolve({ rsn: ' Alice ' }) })
    );
    expect(html).toContain('data-testid="progress">Alice<');
  });
});
