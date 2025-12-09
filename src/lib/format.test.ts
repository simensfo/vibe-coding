import { describe, expect, it, vi } from 'vitest';
import { formatCompact, formatNumber } from './format';

describe('formatNumber', () => {
  it('formats numeric values with locale separators', () => {
    const value = 123_456;
    expect(formatNumber(value)).toBe(value.toLocaleString());
  });

  it('parses numeric strings before formatting', () => {
    expect(formatNumber('98765')).toBe(Number('98765').toLocaleString());
  });

  it('returns em dash when the value is not numeric', () => {
    expect(formatNumber('not-a-number')).toBe('—');
    expect(formatNumber({})).toBe('—');
  });
});

describe('formatCompact', () => {
  it('returns compact notation when Intl formatting succeeds', () => {
    const value = 12500;
    const expected = new Intl.NumberFormat(undefined, {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);

    expect(formatCompact(value)).toBe(expected);
  });

  it('falls back to locale string when Intl.NumberFormat throws', () => {
    const original = Intl.NumberFormat;
    const ThrowingNumberFormat = vi
      .fn(function MockNumberFormat(this: Intl.NumberFormat) {
        throw new Error('Intl not supported');
      })
      .mockName('MockNumberFormat') as unknown as typeof Intl.NumberFormat;
    // @ts-expect-error overriding for test
    Intl.NumberFormat = ThrowingNumberFormat;

    const value = 1234;
    expect(formatCompact(value)).toBe(value.toLocaleString());

    Intl.NumberFormat = original;
  });

  it('returns em dash for invalid inputs', () => {
    expect(formatCompact('abc')).toBe('—');
    expect(formatCompact(null)).toBe('—');
  });
});
