import { describe, expect, it } from 'vitest';
import { selectToday, selectWeek } from '../src/selectors';
import { Task } from '../src/types';

const base = new Date('2023-07-05T12:00:00Z'); // Wednesday

const tasks: Task[] = [
  {
    id: '1',
    title: 'today task',
    status: 'next',
    stakeholderIds: [],
    contextTags: [],
    priority: 0,
    energy: 'med',
    createdAt: '',
    updatedAt: '',
    source: 'manual',
  },
  {
    id: '2',
    title: 'tomorrow waiting',
    status: 'waiting',
    stakeholderIds: [],
    contextTags: [],
    priority: 0,
    energy: 'med',
    createdAt: '',
    updatedAt: '',
    source: 'manual',
    dueAt: '2023-07-06',
  },
  {
    id: '3',
    title: 'next week',
    status: 'next',
    stakeholderIds: [],
    contextTags: [],
    priority: 0,
    energy: 'med',
    createdAt: '',
    updatedAt: '',
    source: 'manual',
    dueAt: '2023-07-10',
  },
];

describe('selectors', () => {
  it('selectToday', () => {
    const res = selectToday(tasks, base);
    expect(res.map((t) => t.id)).toEqual(['1']);
  });
  it('selectWeek', () => {
    const res = selectWeek(tasks, base);
    expect(res.map((t) => t.id)).toEqual(['2']);
  });
});
