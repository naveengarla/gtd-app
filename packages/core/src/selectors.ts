import { Task } from './types';
import { isWithinInterval, startOfDay, endOfDay, endOfWeek } from 'date-fns';

export function selectToday(tasks: Task[], now = new Date()): Task[] {
  return tasks.filter((t) =>
    ['next', 'waiting'].includes(t.status) &&
    (!t.deferUntil || new Date(t.deferUntil) <= now) &&
    (!t.dueAt || isWithinInterval(new Date(t.dueAt), { start: startOfDay(now), end: endOfDay(now) }))
  );
}

export function selectWeek(tasks: Task[], now = new Date()): Task[] {
  const start = startOfDay(now);
  const end = endOfWeek(now, { weekStartsOn: 1 });
  return tasks.filter(
    (t) =>
      ['next', 'waiting'].includes(t.status) &&
      t.dueAt &&
      isWithinInterval(new Date(t.dueAt), { start, end })
  );
}
