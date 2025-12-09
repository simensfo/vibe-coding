import { describe, expect, it } from 'vitest';
import type { HiscoreSkill, RuneMetricsQuest } from './types';
import { bySkillOrder, getQuestPoints } from './utils';

describe('bySkillOrder', () => {
  it('sorts skills by their id', () => {
    const skills: HiscoreSkill[] = [
      { id: 5, name: 'Magic', level: 1, xp: 0, rank: 0 },
      { id: 2, name: 'Defence', level: 1, xp: 0, rank: 0 },
    ];

    const sorted = [...skills].sort(bySkillOrder);
    expect(sorted[0].id).toBe(2);
    expect(sorted[1].id).toBe(5);
  });
});

describe('getQuestPoints', () => {
  it('returns null when there are no quests', () => {
    expect(getQuestPoints(undefined)).toBeNull();
    expect(getQuestPoints([])).toBeNull();
  });

  it('sums quest points for completed quests only', () => {
    const quests: RuneMetricsQuest[] = [
      { title: 'Completed', status: 'COMPLETED', questPoints: 25, difficulty: '', members: false },
      { title: 'Incomplete', status: 'STARTED', questPoints: 50, difficulty: '', members: false },
      { title: 'Completed without qp', status: 'COMPLETED', difficulty: '', members: false },
    ];

    expect(getQuestPoints(quests)).toBe(25);
  });

  it('returns null when no completed quests have quest points', () => {
    const quests: RuneMetricsQuest[] = [
      { title: 'Completed with no points', status: 'COMPLETED', difficulty: '', members: false },
    ];

    expect(getQuestPoints(quests)).toBeNull();
  });
});
