import React, { useState, useEffect, useCallback } from 'react';
import Login from './component/Login';
import TopicCard from './component/TopicCard';

const defaultTopics = [
  { id: 1, title: 'Should remote work be permanent?' },
  { id: 2, title: 'Is electric vehicles the future of transport?' },
  { id: 3, title: 'Should voting be compulsory?' },
];

function App() {
  const [user, setUser] = useState(localStorage.getItem('username'));
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('topics');
    if (stored) setTopics(JSON.parse(stored));
    else {
      const initial = defaultTopics.map(t => ({ ...t, forVotes: 0, againstVotes: 0 }));
      setTopics(initial);
      localStorage.setItem('topics', JSON.stringify(initial));
    }
  }, []);

  const handleVote = useCallback((id, type) => {
    setTopics(prev => {
      const updated = prev.map(t => {
        if (t.id === id) {
          return {
            ...t,
            forVotes: type === 'for' ? t.forVotes + 1 : t.forVotes,
            againstVotes: type === 'against' ? t.againstVotes + 1 : t.againstVotes,
          };
        }
        return t;
      });
      localStorage.setItem('topics', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUser(null);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="app">
      <header>
        <h1>CareDuel Debates</h1>
        <div className="user-section">
          <span>Welcome, {user}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="topics">
        {topics.map(topic => (
          <TopicCard key={topic.id} topic={topic} onVote={handleVote} />
        ))}
      </div>
    </div>
  );
}

export default App;