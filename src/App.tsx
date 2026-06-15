import { useEffect, useState } from 'react';
import { Message, supabase } from './supabaseClient';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);
    const { data, error } = await supabase
      .from('portal_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      setError(error.message);
    } else {
      setMessages(data ?? []);
    }
    setLoading(false);
  }

  async function addMessage() {
    if (!content.trim()) return;
    setLoading(true);
    const { error } = await supabase.from('portal_messages').insert({ content: content.trim() });
    if (error) {
      setError(error.message);
    } else {
      setContent('');
      fetchMessages();
    }
    setLoading(false);
  }

  return (
    <div className="app">
      <header>
        <h1>Supabase Portal</h1>
        <p>Demo portal ready for Vercel deployment.</p>
      </header>

      <section className="form-card">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a message to save to Supabase"
          rows={4}
        />
        <button onClick={addMessage} disabled={loading}>
          {loading ? 'Saving...' : 'Save message'}
        </button>
        {error ? <p className="error">{error}</p> : null}
      </section>

      <section className="messages-card">
        <h2>Recent messages</h2>
        {loading && !messages.length ? (
          <p>Loading messages…</p>
        ) : messages.length ? (
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <span>{new Date(message.created_at).toLocaleString()}</span>
                <p>{message.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages yet.</p>
        )}
      </section>
    </div>
  );
}

export default App;
