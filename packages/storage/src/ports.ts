import {
  Task,
  Project,
  Stakeholder,
  Risk,
  ReviewSession,
  Note,
  Tag,
  Attachment,
} from '@core/types';

export interface TaskRepo {
  add(task: Task): Promise<void>;
  all(): Promise<Task[]>;
}

export interface ProjectRepo {
  all(): Promise<Project[]>;
}

export interface StakeholderRepo {
  all(): Promise<Stakeholder[]>;
}

export interface RiskRepo {
  all(): Promise<Risk[]>;
}

export interface ReviewRepo {
  all(): Promise<ReviewSession[]>;
}

export interface NoteRepo {
  all(): Promise<Note[]>;
}

export interface TagRepo {
  all(): Promise<Tag[]>;
}

export interface AttachmentRepo {
  all(): Promise<Attachment[]>;
}

export interface Clock {
  now(): Date;
}

export interface IdGenerator {
  id(): string;
}

export interface Logger {
  log(...args: unknown[]): void;
}
