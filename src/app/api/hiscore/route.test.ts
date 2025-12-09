import { afterEach, describe, expect, it, vi } from 'vitest';
import type { NextRequest } from 'next/server';
import { GET } from './route';

const mockRequest = (url: string) => ({ url }) as NextRequest;

describe('hiscore API route', () => {
  it('requires rsn', async () => {
    const res = await GET(mockRequest('https://example.com/api/hiscore'));
    expect(res.status).toBe(400);
  });

  it('proxies upstream response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response('{"ok":true}', { status: 200 }));
    const res = await GET(mockRequest('https://example.com/api/hiscore?rsn=alice'));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('{"ok":true}');
  });

  it('handles upstream errors', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('boom'));
    const res = await GET(mockRequest('https://example.com/api/hiscore?rsn=alice'));
    expect(res.status).toBe(502);
  });
});
afterEach(() => {
  vi.restoreAllMocks();
});
