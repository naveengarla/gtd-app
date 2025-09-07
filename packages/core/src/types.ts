export type TaskStatus = 'inbox' | 'next' | 'waiting' | 'someday' | 'done';
export type EnergyLevel = 'low' | 'med' | 'high';
export type TaskSource = 'manual' | 'email' | 'url';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  projectId?: string;
  stakeholderIds: string[];
  dueAt?: string;
  deferUntil?: string;
  estimateMin?: number;
  energy: EnergyLevel;
  priority: number;
  contextTags: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  source: TaskSource;
}

export type Rag = 'red' | 'amber' | 'green';

export interface Project {
  id: string;
  name: string;
  goal?: string;
  rag: Rag;
  nextActionTaskId?: string;
  milestones: { id: string; title: string; dueAt?: string }[];
  lastReviewedAt?: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  role?: string;
  org?: string;
  email?: string;
  phone?: string;
  lastTouchAt?: string;
  nextTouchAt?: string;
  touches: { at: string; note: string }[];
}

export interface Risk {
  id: string;
  projectId: string;
  title: string;
  probability: number; // 0-1
  impact: 1 | 2 | 3 | 4 | 5;
  score: number;
  mitigation?: string;
  ownerStakeholderId?: string;
  dueAt?: string;
  status: 'open' | 'mitigating' | 'closed';
}

export interface ReviewSession {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  plannedTop3: string[];
  notes?: string;
  completedAt: string;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  linkedIds: string[];
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  kind: 'context' | 'domain';
}

export interface Attachment {
  id: string;
  taskId: string;
  urlOrBlobRef: string;
  mime: string;
  title?: string;
}
