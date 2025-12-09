import { afterEach, describe, expect, it, vi } from 'vitest';
import type { NextRequest } from 'next/server';
import { GET } from './route';

const mockRequest = (url: string) => ({ url }) as NextRequest;

describe('profile API route', () => {
  it('requires rsn', async () => {
    const res = await GET(mockRequest('https://example.com/api/profile'));
    expect(res.status).toBe(400);
  });

  it('returns upstream payload', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response('{"profile":true}', { status: 200 }));
    const res = await GET(mockRequest('https://example.com/api/profile?rsn=alice'));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('{"profile":true}');
  });

  it('handles upstream exceptions', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('fail'));
    const res = await GET(mockRequest('https://example.com/api/profile?rsn=alice'));
    expect(res.status).toBe(502);
  });
});
afterEach(() => {
  vi.restoreAllMocks();
});
