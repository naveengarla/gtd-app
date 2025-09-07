import { differenceInCalendarDays } from 'date-fns';
import { TaskStatus } from './types';

export interface PriorityInput {
  impact: number;
  dueAt?: string;
  deferUntil?: string;
  status: TaskStatus;
}

/**
 * Simple priority heuristic inspired by GTD. Higher numbers mean higher priority.
 * Impact is scaled 0-5. Time urgency boosts priority as due date nears.
 * Waiting tasks get a penalty so they fall down the list.
 */
export function computePriority(input: PriorityInput, now = new Date()): number {
  const { impact, dueAt, deferUntil, status } = input;
  let score = impact * 2; // base weight

  if (deferUntil && new Date(deferUntil) > now) {
    // deferred in the future => very low priority
    score -= 5;
  }

  if (dueAt) {
    const days = differenceInCalendarDays(new Date(dueAt), now);
    if (days < 0) score += 5; // overdue
    else score += Math.max(0, 3 - days); // within next 3 days
  }

  if (status === 'waiting') score -= 4;

  return score;
}
