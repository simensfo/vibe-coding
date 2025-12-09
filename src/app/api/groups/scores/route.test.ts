import { afterEach, describe, expect, it, vi } from 'vitest';
import type { NextRequest } from 'next/server';
import { GET } from './route';

const mockRequest = (query: string) =>
  ({ url: `https://example.com/api/groups/scores${query}` }) as NextRequest;

const sampleResponse = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  size: 20,
  empty: true,
};

describe('group scores API route', () => {
  it('validates query parameters', async () => {
    const res = await GET(mockRequest('?size=10'));
    expect(res.status).toBe(400);
  });

  it('returns parsed JSON when upstream succeeds', async () => {
    vi.spyOn(global, 'fetch').mockImplementation((url) => {
      expect(String(url)).toContain('groupSize=2');
      return Promise.resolve(
        new Response(JSON.stringify(sampleResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );
    });

    const res = await GET(mockRequest('?size=2&competitive=true&page=0&pageSize=20'));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(sampleResponse);
  });

  it('passes through non-json responses', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response('text response', {
        status: 200,
        headers: { 'content-type': 'text/plain' },
      })
    );

    const res = await GET(mockRequest('?size=2&competitive=true&page=0&pageSize=20'));
    expect(await res.text()).toBe('text response');
  });

  it('handles JSON shape mismatches', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response('{"unexpected":true}', {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    );

    const res = await GET(mockRequest('?size=2&competitive=true&page=0&pageSize=20'));
    expect(res.status).toBe(502);
  });

  it('handles upstream failures', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('boom'));
    const res = await GET(mockRequest('?size=2&competitive=true&page=0&pageSize=20'));
    expect(res.status).toBe(502);
  });
});
afterEach(() => {
  vi.restoreAllMocks();
});
