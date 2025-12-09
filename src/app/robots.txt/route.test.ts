import { describe, expect, it } from 'vitest';
import { GET } from './route';

describe('robots.txt route', () => {
  it('returns static policy', async () => {
    const res = await GET();
    expect(res.headers.get('content-type')).toContain('text/plain');
    expect(await res.text()).toContain('User-agent');
  });
});
