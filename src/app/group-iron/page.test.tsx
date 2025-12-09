import { renderToStaticMarkup } from 'react-dom/server';
import { Mock, vi } from 'vitest';
import { headers } from 'next/headers';
import Page from './page';

vi.mock('@/app/group-iron/components/SearchForm', () => ({
  __esModule: true,
  default: ({ size, competitive }: { size: string; competitive: string }) => (
    <div data-testid="search-form">
      {size}:{competitive}
    </div>
  ),
}));

vi.mock('@/app/group-iron/components/GroupResults', () => ({
  __esModule: true,
  default: ({ data }: { data: unknown }) => (
    <div data-testid="group-results">{JSON.stringify(data)}</div>
  ),
}));

describe('Group Iron page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (headers as unknown as Mock).mockResolvedValue({
      get: (key: string) => {
        if (key === 'x-forwarded-proto') return 'https';
        if (key === 'x-forwarded-host') return 'example.com';
        return null;
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders only the search form when query missing', async () => {
    const html = renderToStaticMarkup(await Page({ searchParams: Promise.resolve({}) }));
    expect(html).toContain('data-testid="search-form"');
    expect(html).not.toContain('data-testid="group-results"');
  });

  it('renders results when API succeeds', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          content: [],
          totalElements: 0,
          totalPages: 0,
          size: 25,
          empty: true,
        }),
        { headers: { 'content-type': 'application/json' } }
      )
    );

    const html = renderToStaticMarkup(
      await Page({
        searchParams: Promise.resolve({ size: '2', competitive: 'true', page: '0' }),
      })
    );
    expect(html).toContain('data-testid="group-results"');
  });

  it('shows upstream text for non-JSON responses', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response('plain text', { headers: { 'content-type': 'text/plain' } })
    );

    const html = renderToStaticMarkup(
      await Page({
        searchParams: Promise.resolve({ size: '2', competitive: 'true', page: '0' }),
      })
    );
    expect(html).toContain('plain text');
  });

  it('handles fetch errors gracefully', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network'));

    const html = renderToStaticMarkup(
      await Page({
        searchParams: Promise.resolve({ size: '2', competitive: 'true', page: '0' }),
      })
    );
    expect(html).toContain('Upstream responded with status');
  });
});
