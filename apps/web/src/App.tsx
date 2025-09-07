import { Link, Route, Routes } from 'react-router-dom';
import Inbox from './routes/Inbox';
import Today from './routes/Today';
import Week from './routes/Week';

export default function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/inbox">Inbox</Link> | <Link to="/today">Today</Link> |{' '}
        <Link to="/week">Week</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/today" element={<Today />} />
          <Route path="/week" element={<Week />} />
        </Routes>
      </main>
    </div>
  );
}
