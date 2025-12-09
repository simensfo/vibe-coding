import { describe, expect, it } from 'vitest';
import { isGroupEntry, isGroupScoresResponse } from './groupIron';

describe('isGroupEntry', () => {
  const baseEntry = {
    id: 1,
    name: 'Group',
    groupTotalXp: 1000,
    groupTotalLevel: 200,
    size: 5,
    isCompetitive: true,
  };

  it('returns true for valid group entries', () => {
    expect(isGroupEntry(baseEntry)).toBe(true);
  });

  it('returns false when required fields are missing or invalid', () => {
    expect(isGroupEntry({ ...baseEntry, id: '1' })).toBe(false);
    expect(isGroupEntry({ ...baseEntry, name: 42 })).toBe(false);
    expect(isGroupEntry({ ...baseEntry, isCompetitive: 'yes' })).toBe(false);
  });
});

describe('isGroupScoresResponse', () => {
  const validResponse = {
    content: [
      {
        id: 1,
        name: 'Group',
        groupTotalXp: 1000,
        groupTotalLevel: 200,
        size: 3,
        isCompetitive: true,
      },
    ],
    totalElements: 1,
    totalPages: 1,
    size: 25,
    empty: false,
  };

  it('accepts responses with valid content and metadata', () => {
    expect(isGroupScoresResponse(validResponse)).toBe(true);
  });

  it('rejects responses with invalid content array', () => {
    expect(isGroupScoresResponse({ ...validResponse, content: [{}] })).toBe(false);
  });

  it('rejects responses missing metadata', () => {
    expect(isGroupScoresResponse({ ...validResponse, totalElements: '1' })).toBe(false);
  });
});
