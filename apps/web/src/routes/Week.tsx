import { useEffect } from 'react';
import { useStore, selectWeek } from '../store';

export default function Week() {
  const tasks = useStore((s) => selectWeek(s.tasks));
  const load = useStore((s) => s.load);
  useEffect(() => {
    load();
  }, [load]);
  return (
    <div>
      <h1>Week</h1>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
