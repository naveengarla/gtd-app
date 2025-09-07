import { useEffect } from 'react';
import { useStore } from '../store';
import QuickAdd from '../components/QuickAdd';

export default function Inbox() {
  const tasks = useStore((s) => s.tasks);
  const load = useStore((s) => s.load);
  useEffect(() => {
    load();
  }, [load]);
  return (
    <div>
      <h1>Inbox</h1>
      <QuickAdd />
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
