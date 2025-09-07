import 'fake-indexeddb/auto';
import { db } from './repositories';

function id() {
  return Math.random().toString(36).slice(2);
}

async function seed() {
  await db.delete();
  await db.open();

  const projects = Array.from({ length: 12 }, (_, i) => ({
    id: id(),
    name: `Project ${i + 1}`,
    rag: 'green' as const,
    milestones: [],
  }));
  await db.projects.bulkPut(projects);

  const stakeholders = Array.from({ length: 50 }, (_, i) => ({
    id: id(),
    name: `Stakeholder ${i + 1}`,
    touches: [],
  }));
  await db.stakeholders.bulkPut(stakeholders);

  const tasks = Array.from({ length: 200 }, (_, i) => ({
    id: id(),
    title: `Task ${i + 1}`,
    status: 'inbox' as const,
    projectId: projects[i % projects.length].id,
    stakeholderIds: [stakeholders[i % stakeholders.length].id],
    contextTags: [],
    priority: 0,
    energy: 'med' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: 'manual' as const,
  }));
  await db.tasks.bulkPut(tasks);

  console.log('seeded', tasks.length, 'tasks');
  process.exit(0);
}

seed();
