import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchHiscore, fetchProfile, fetchQuests } from './api';
import type { HiscoreResponse, RuneMetricsProfile, RuneMetricsQuestsResponse } from './types';

const mockJsonResponse = <T>(data: T, ok = true) =>
  ({
    ok,
    json: () => Promise.resolve(data),
  }) as Response;

const stubFetch = (value: unknown) => {
  const fetchMock = vi.fn().mockResolvedValue(value);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('fetchHiscore', () => {
  it('returns data when the request succeeds', async () => {
    const payload: HiscoreResponse = { magic: { level: 1, rank: 1, xp: 1 } } as HiscoreResponse;
    const fetchMock = stubFetch(mockJsonResponse(payload));

    const data = await fetchHiscore('Player');
    expect(data).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('Player'),
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });

  it('returns null when the response is not ok', async () => {
    stubFetch(mockJsonResponse({}, false));
    await expect(fetchHiscore('Player')).resolves.toBeNull();
  });

  it('returns null when fetch throws', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network'));
    vi.stubGlobal('fetch', fetchMock);
    await expect(fetchHiscore('Player')).resolves.toBeNull();
  });
});

describe('fetchQuests', () => {
  it('delegates to the quests endpoint and returns parsed data', async () => {
    const payload: RuneMetricsQuestsResponse = {
      quests: [],
      loggedIn: true,
    };
    const fetchMock = stubFetch(mockJsonResponse(payload));

    const data = await fetchQuests('Quest Player');
    expect(data).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('quests?user=Quest%20Player'),
      expect.any(Object)
    );
  });
});

describe('fetchProfile', () => {
  it('uses the provided activities value and returns the profile data', async () => {
    const payload = { name: 'Profile', rank: 1 } as RuneMetricsProfile;
    const fetchMock = stubFetch(mockJsonResponse(payload));

    const data = await fetchProfile('Profile User', 10);
    expect(data).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://apps.runescape.com/runemetrics/profile/profile?user=Profile%20User&activities=10',
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });

  it('returns null when response is not ok', async () => {
    stubFetch(mockJsonResponse({}, false));
    await expect(fetchProfile('User', 5)).resolves.toBeNull();
  });
});
