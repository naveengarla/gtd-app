import Dexie, { Table } from 'dexie';
import { Task, Project, Stakeholder, Risk } from '@core/types';

export class GTDDatabase extends Dexie {
  tasks!: Table<Task, string>;
  projects!: Table<Project, string>;
  stakeholders!: Table<Stakeholder, string>;
  risks!: Table<Risk, string>;

  constructor() {
    super('gtd-db');
    this.version(1).stores({
      tasks: 'id, status, dueAt, projectId',
      projects: 'id',
      stakeholders: 'id',
      risks: 'id, projectId, score',
    });
  }
}
