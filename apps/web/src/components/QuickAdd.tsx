import { useState } from 'react';
import { useStore } from '../store';

export default function QuickAdd() {
  const [text, setText] = useState('');
  const add = useStore((s) => s.addFromInput);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (text.trim()) {
          add(text);
          setText('');
        }
      }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Quick add"
      />
    </form>
  );
}
