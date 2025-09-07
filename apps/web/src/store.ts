import create from 'zustand';
import { Task } from '@core/types';
import { parseQuickAdd, selectToday as todaySelector, selectWeek as weekSelector } from '@core';
import { taskRepo } from '@storage/repositories';

interface State {
  tasks: Task[];
  load: () => Promise<void>;
  addFromInput: (text: string) => Promise<void>;
}

export const useStore = create<State>((set) => ({
  tasks: [],
  load: async () => {
    const tasks = await taskRepo.all();
    set({ tasks });
  },
  addFromInput: async (text: string) => {
    const partial = parseQuickAdd(text);
    const now = new Date().toISOString();
    const task: Task = {
      id: Math.random().toString(36).slice(2),
      title: partial.title,
      status: partial.status,
      stakeholderIds: partial.stakeholderIds ?? [],
      contextTags: partial.contextTags ?? [],
      projectId: partial.projectId,
      dueAt: partial.dueAt,
      priority: 0,
      energy: 'med',
      createdAt: now,
      updatedAt: now,
      source: 'manual',
    };
    await taskRepo.add(task);
    set((s) => ({ tasks: [...s.tasks, task] }));
  },
}));

export const selectToday = (tasks: Task[]) => todaySelector(tasks);
export const selectWeek = (tasks: Task[]) => weekSelector(tasks);
