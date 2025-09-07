import { GTDDatabase } from './db';
import { TaskRepo, ProjectRepo, StakeholderRepo, RiskRepo } from './ports';
import { Task, Project, Stakeholder, Risk } from '@core/types';

export const db = new GTDDatabase();

export const taskRepo: TaskRepo = {
  async add(task: Task) {
    await db.tasks.put(task);
  },
  async all() {
    return db.tasks.toArray();
  },
};

export const projectRepo: ProjectRepo = {
  async all() {
    return db.projects.toArray();
  },
};

export const stakeholderRepo: StakeholderRepo = {
  async all() {
    return db.stakeholders.toArray();
  },
};

export const riskRepo: RiskRepo = {
  async all() {
    return db.risks.toArray();
  },
};
