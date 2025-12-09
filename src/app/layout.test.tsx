import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { vi } from 'vitest';
import RootLayout from './layout';

vi.mock('next/font/google', () => ({
  DM_Sans: () => ({ variable: 'font-sans' }),
  DM_Mono: () => ({ variable: 'font-mono' }),
}));

describe('RootLayout', () => {
  it('renders html shell containing children and results', () => {
    const html = renderToStaticMarkup(
      <RootLayout results={<div data-testid="results">results</div>}>
        <div data-testid="children">child</div>
      </RootLayout>
    );
    expect(html).toContain('data-testid="children"');
    expect(html).toContain('data-testid="results"');
    expect(html).toContain('font-sans');
    expect(html).toContain('font-mono');
  });
});
