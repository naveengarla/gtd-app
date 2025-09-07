import { addDays, nextDay, parse as parseDate, set } from 'date-fns';
import { Task } from './types';

export interface ParsedTask extends Partial<Task> {
  title: string;
}

const dayMap: Record<string, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

function parseNaturalDate(token: string, now = new Date()): Date | undefined {
  const lower = token.toLowerCase();
  if (lower === 'today') return set(now, { hours: 17, minutes: 0, seconds: 0, milliseconds: 0 });
  if (lower === 'tomorrow') return set(addDays(now, 1), { hours: 17, minutes: 0, seconds: 0, milliseconds: 0 });
  if (dayMap[lower]?.toString()) return nextDay(now, dayMap[lower]);
  const inMatch = lower.match(/^in\s+(\d+)([dw])$/);
  if (inMatch) {
    const qty = parseInt(inMatch[1], 10);
    const unit = inMatch[2];
    return unit === 'd' ? addDays(now, qty) : addDays(now, qty * 7);
  }
  // yyyy-mm-dd or yyyy-mm-dd hh:mm
  const parsed = parseDate(token, 'yyyy-MM-dd', now);
  if (!isNaN(parsed.getTime())) return parsed;
  return undefined;
}

/**
 * Quick-add parser. It is intentionally deterministic and very small.
 */
export function parseQuickAdd(input: string, now = new Date()): ParsedTask {
  let title = input.trim();
  const stakeholders: string[] = [];
  const tags: string[] = [];
  let project: string | undefined;
  let status: Task['status'] = 'inbox';
  let dueAt: string | undefined;

  title = title.replace(/@([\w-]+)/g, (_, m) => {
    stakeholders.push(m);
    return '';
  });

  title = title.replace(/\+([\w-]+)/g, (_, m) => {
    tags.push(m);
    return '';
  });

  title = title.replace(/#([\w-]+)/g, (_, m) => {
    project = m;
    return '';
  });

  title = title.replace(/!(\w+)/g, (_, m) => {
    if (m === 'waiting') status = 'waiting';
    if (m === 'risk') tags.push('risk');
    return '';
  });

  const dateMatch = title.match(/\b(by|on)?\s*(today|tomorrow|mon|tue|wed|thu|fri|sat|sun|in\s+\d+[dw]|\d{4}-\d{2}-\d{2})\b/i);
  if (dateMatch) {
    const d = parseNaturalDate(dateMatch[2], now);
    if (d) dueAt = d.toISOString();
    title = title.replace(dateMatch[0], '').trim();
  }

  return {
    title: title.trim(),
    stakeholderIds: stakeholders,
    contextTags: tags,
    projectId: project,
    status,
    dueAt,
  } as ParsedTask;
}
