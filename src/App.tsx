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
        <p className="eyebrow">Sinema RC</p>
        <h1>Steuere deine Kino- und Medienproduktion</h1>
        <p>
          Sinema RC ist die schlanke Weboberfläche für Fernsteuerung, Szenenmanagement und Medienautomation.
          Ideal für Filmproduktionen, Streaming-Studios und kreative Teams, die schnell und verlässlich arbeiten wollen.
        </p>
      </header>

      <section className="intro-grid">
        <div>
          <h2>Alles in einer Übersicht</h2>
          <p>Behalte Kameras, Licht und Mediensteuerung in einer zentralen Oberfläche im Blick.</p>
        </div>
        <div>
          <h2>Automatisierte Abläufe</h2>
          <p>Starte Szenen, wechsle Sets und synchronisiere Ausrüstung per Knopfdruck.</p>
        </div>
      </section>

      <section className="form-card">
        <h2>Was ist Sinema RC?</h2>
        <p>
          Sinema RC unterstützt die Produktion mit einer modernen Web-Plattform, die sowohl manuelle Steuerung als auch automatische Workflow-Skripte ermöglicht.
          So kannst du Fokus auf die kreative Arbeit legen und gleichzeitig technische Abläufe sicher steuern.
        </p>
        <ul>
          <li>Fernsteuerung für Mediengeräte und Produktionsabläufe</li>
          <li>Direkter Zugriff auf Szenen, Presets und Live-Parameter</li>
          <li>Integration mit modernen Cloud-Diensten wie Supabase</li>
        </ul>
      </section>

      <section className="portal-card">
        <h2>Sinema RC Portal</h2>
        <p>
          Wenn Supabase konfiguriert ist, wird das Kontrollportal aktiv und speichert Nachrichten, Kommentare oder Produktionshinweise direkt in deiner Datenbank.
        </p>
        <div className="env-list">
          <code>VITE_SUPABASE_URL</code>
          <code>VITE_SUPABASE_ANON_KEY</code>
        </div>
        <p>Füge diese Werte in den Vercel-Projekteinstellungen ein, damit das Portal vollständig funktioniert.</p>
      </section>

      {portalAvailable ? (
        <section className="form-card">
          <h2>Feedback senden</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Gib hier eine Nachricht ein..."
            rows={4}
          />
          <button onClick={addMessage} disabled={loading}>
            {loading ? 'Speichern...' : 'Nachricht speichern'}
          </button>
          {error ? <p className="error">{error}</p> : null}

          <div className="messages-card">
            <h3>Letzte Einträge</h3>
            {loading && !messages.length ? (
              <p>Lade Einträge…</p>
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
              <p>Noch keine Einträge vorhanden.</p>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default App;
