import { describe, expect, it } from 'vitest';
import { getSkillIconUrl, RS3_SKILL_ICON_BY_ID, RS3_SKILL_ICON_URLS } from './icons';

describe('getSkillIconUrl', () => {
  it('prefers ID-based lookup when available', () => {
    const icon = getSkillIconUrl({ id: 1, name: 'Attack', level: 1, xp: 0, rank: 0 });
    expect(icon).toBe(RS3_SKILL_ICON_BY_ID[1]);
  });

  it('falls back to name-based lookup when ID is missing', () => {
    const icon = getSkillIconUrl({ id: 999, name: 'Magic', level: 1, xp: 0, rank: 0 });
    expect(icon).toBe(RS3_SKILL_ICON_URLS.Magic);
  });

  it('returns undefined for unknown skills', () => {
    const icon = getSkillIconUrl({ id: 9999, name: 'Unknown', level: 1, xp: 0, rank: 0 });
    expect(icon).toBeUndefined();
  });
});
