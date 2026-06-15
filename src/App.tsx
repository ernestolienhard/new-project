import { useEffect, useState } from 'react';
import { Message, supabase, supabaseEnvMissing } from './supabaseClient';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const portalAvailable = !!supabase && !supabaseEnvMissing;
  const client = supabase;

  useEffect(() => {
    if (portalAvailable) {
      fetchMessages();
    }
  }, [portalAvailable]);

  async function fetchMessages() {
    if (!client) return;
    setLoading(true);
    const { data, error } = await client
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
    if (!client) return;
    if (!content.trim()) return;

    setLoading(true);
    const { error } = await client.from('portal_messages').insert({ content: content.trim() });
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
      <header className="hero">
        <p className="eyebrow">Vercel-ready portal</p>
        <h1>Your new homepage is live</h1>
        <p>
          This landing page is built for Vercel and includes an optional Supabase message portal.
          If you set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in Vercel,
          the portal becomes active immediately.
        </p>
      </header>

      <section className="intro-grid">
        <div>
          <h2>Instant deploy</h2>
          <p>Vercel can serve this site immediately with static content, so you’ll see a homepage right away.</p>
        </div>
        <div>
          <h2>Supabase ready</h2>
          <p>Once your environment variables are configured in Vercel, the portal connects to Supabase automatically.</p>
        </div>
      </section>

      {portalAvailable ? (
        <section className="form-card">
          <h2>Supabase message portal</h2>
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

          <div className="messages-card">
            <h3>Recent messages</h3>
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
          </div>
        </section>
      ) : (
        <section className="portal-card">
          <h2>Portal configuration</h2>
          <p>
            Supabase is not configured yet. Your homepage is still visible on Vercel, and the portal will become active once these env vars are set in your Vercel project:
          </p>
          <div className="env-list">
            <code>VITE_SUPABASE_URL</code>
            <code>VITE_SUPABASE_ANON_KEY</code>
          </div>
          <p>Deploy now, then add the values in Vercel. The site remains a working landing page for visitors.</p>
        </section>
      )}
    </div>
  );
}

export default App;
