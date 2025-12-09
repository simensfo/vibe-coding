import { afterEach, describe, expect, it, vi } from 'vitest';
import type { NextRequest } from 'next/server';
import { GET } from './route';

const mockRequest = (url: string) => ({ url }) as NextRequest;

describe('quests API route', () => {
  it('requires rsn parameter', async () => {
    const res = await GET(mockRequest('https://example.com/api/quests'));
    expect(res.status).toBe(400);
  });

  it('returns upstream body', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response('{"quests": []}', { status: 200 }));
    const res = await GET(mockRequest('https://example.com/api/quests?rsn=alice'));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('{"quests": []}');
  });

  it('returns 502 on upstream failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('fail'));
    const res = await GET(mockRequest('https://example.com/api/quests?rsn=alice'));
    expect(res.status).toBe(502);
  });
});
afterEach(() => {
  vi.restoreAllMocks();
});
