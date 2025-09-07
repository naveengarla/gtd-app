import { describe, expect, it } from 'vitest';
import { computePriority } from '../src/priority';

const base = new Date('2023-01-01T00:00:00Z');

describe('priority', () => {
  it('uses impact', () => {
    expect(computePriority({ impact: 3, status: 'inbox' }, base)).toBe(6);
  });

  it('boosts near due date', () => {
    expect(
      computePriority({ impact: 1, status: 'next', dueAt: '2023-01-02' }, base)
    ).toBeGreaterThan(2);
  });

  it('penalizes waiting', () => {
    expect(computePriority({ impact: 1, status: 'waiting' }, base)).toBeLessThan(2);
  });

  it('boosts overdue', () => {
    expect(
      computePriority({ impact: 1, status: 'next', dueAt: '2022-12-30' }, base)
    ).toBeGreaterThan(6);
  });

  it('penalizes deferred future', () => {
    expect(
      computePriority({ impact: 3, status: 'next', deferUntil: '2023-01-10' }, base)
    ).toBeLessThan(6);
  });
});
