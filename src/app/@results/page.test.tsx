import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { vi } from 'vitest';
import ResultsSlot from './page';

vi.mock('@/app/components/RS3Results', () => ({
  __esModule: true,
  default: ({ rsn }: { rsn: string }) => <div data-testid="rs3results">{rsn}</div>,
}));

describe('@results slot', () => {
  it('returns null when rsn missing', async () => {
    const result = await ResultsSlot({ searchParams: Promise.resolve({}) });
    expect(result).toBeNull();
  });

  it('renders RS3Results when rsn provided', async () => {
    const html = renderToStaticMarkup(
      (await ResultsSlot({ searchParams: Promise.resolve({ rsn: 'Bob' }) })) as React.ReactElement
    );
    expect(html).toContain('Bob');
  });
});
