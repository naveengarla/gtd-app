import { useEffect } from 'react';
import { useStore, selectToday } from '../store';

export default function Today() {
  const tasks = useStore((s) => selectToday(s.tasks));
  const load = useStore((s) => s.load);
  useEffect(() => {
    load();
  }, [load]);
  return (
    <div>
      <h1>Today</h1>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
