import { useEffect, useRef, useState } from 'react';
import './App.css';

const panels = [
  { id: 'start', label: 'Start' },
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'schwerpunkte', label: 'Schwerpunkte' },
  { id: 'ueber', label: 'Über mich' },
  { id: 'referenzen', label: 'Referenzen' },
  { id: 'kontakt', label: 'Kontakt' },
];

const leistungen = [
  { nr: '01', titel: 'SPS-Engineering', text: 'Produktneutrale Softwarearchitektur – klar, wartbar, serienreif.' },
  { nr: '02', titel: 'Projektierung & Steuerung', text: 'Vom Konzept bis zur Endabnahme aus einer Hand.' },
  { nr: '03', titel: 'Inbetriebnahme', text: 'Durchgängige Unterstützung vor Ort und remote.' },
  { nr: '04', titel: 'Retrofit & Modernisierung', text: 'Sichere Migration von Altsteuerungen ohne lange Stillstände.' },
  { nr: '05', titel: 'Schulung & Service', text: 'Wissenstransfer und verlässliche Wartung für Ihren Betrieb.' },
];

const schwerpunkte = [
  { titel: 'Unified Modernisierung', text: 'Webbasierte Visualisierung mit WinCC Unified – zukunftssicher und plattformunabhängig.' },
  { titel: 'Cybersecurity', text: 'Segmentierte Netze, gehärtete Steuerungen, sichere Fernzugriffe nach aktuellem Standard.' },
  { titel: 'SINEMA RC', text: 'Verschlüsselter Fernzugriff auf Maschinen weltweit – Service ohne Anreise.' },
];

const technologien = ['STEP 7', 'TIA Portal', 'PCS 7', 'WinCC Unified', 'WinCC OA', 'OPC UA', 'PROFINET', 'PROFIBUS'];

const referenzen = [
  { kunde: 'EKZ', text: '3 000 SPS-Steuerungen in Trafostationen' },
  { kunde: 'Schweizer Post', text: 'Sortierzentrum · 19 000 Sendungen / Stunde' },
  { kunde: 'DHL Gateway Basel', text: '10 000 Sendungen / Stunde' },
  { kunde: 'ARA Zermatt', text: 'Grösste Membranbiologieanlage der Schweiz' },
  { kunde: 'SBB', text: 'Migration kritischer Steuerungstechnik' },
  { kunde: 'Equinix', text: 'Infrastruktur- & Steuerungstechnik' },
];

function App() {
  const [aktiv, setAktiv] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sektionen = Array.from(document.querySelectorAll<HTMLElement>('.panel'));
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        eintraege.forEach((e) => {
          if (e.isIntersecting) {
            const index = sektionen.indexOf(e.target as HTMLElement);
            if (index >= 0) setAktiv(index);
          }
        });
      },
      { threshold: 0.55 }
    );
    sektionen.forEach((s) => beobachter.observe(s));
    return () => beobachter.disconnect();
  }, []);

  const springeZu = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="shell">
      {/* Fixierte Marke oben links */}
      <a className="mark" href="#start" onClick={(e) => { e.preventDefault(); springeZu('start'); }}>
        LIENHARD<span>AUTOMATION</span>
      </a>

      {/* Panel-Zähler oben rechts */}
      <div className="counter">
        <strong>{String(aktiv + 1).padStart(2, '0')}</strong>
        <span>/ {String(panels.length).padStart(2, '0')}</span>
      </div>

      {/* Punkt-Navigation rechts */}
      <nav className="dots">
        {panels.map((p, i) => (
          <button
            key={p.id}
            className={`dots__item ${aktiv === i ? 'is-active' : ''}`}
            onClick={() => springeZu(p.id)}
            aria-label={p.label}
          >
            <span className="dots__label">{p.label}</span>
            <span className="dots__dot" />
          </button>
        ))}
      </nav>

      <div className="deck" ref={deckRef}>
        {/* 01 — START */}
        <section id="start" className="panel panel--dark">
          <div className="panel__bg-grid" />
          <div className="panel__inner hero">
            <p className="kicker">Lienhard Automation GmbH · Zürich</p>
            <h1 className="mega">
              AUTOMATION.<br />
              ENGINEERING.<br />
              <span className="mega__accent">WELTWEIT.</span>
            </h1>
            <p className="hero__lead">
              Massgeschneiderte Steuerungstechnik für den Maschinen- und Anlagenbau.
              Siemens-Spezialist mit über 25 Jahren Erfahrung auf fünf Kontinenten.
            </p>
            <button className="scroll-hint" onClick={() => springeZu('leistungen')}>
              Scrollen <span className="scroll-hint__arrow">↓</span>
            </button>
          </div>
        </section>

        {/* 02 — LEISTUNGEN */}
        <section id="leistungen" className="panel panel--blue">
          <div className="panel__inner">
            <header className="panel__head">
              <span className="panel__no">02</span>
              <h2 className="panel__title">Leistungen</h2>
            </header>
            <ul className="leist">
              {leistungen.map((l) => (
                <li key={l.nr} className="leist__row">
                  <span className="leist__nr">{l.nr}</span>
                  <span className="leist__titel">{l.titel}</span>
                  <span className="leist__text">{l.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 03 — SCHWERPUNKTE */}
        <section id="schwerpunkte" className="panel panel--light">
          <div className="panel__inner">
            <header className="panel__head">
              <span className="panel__no panel__no--ink">03</span>
              <h2 className="panel__title panel__title--ink">Schwerpunkte</h2>
            </header>
            <div className="focus">
              {schwerpunkte.map((s) => (
                <article key={s.titel} className="focus__item">
                  <h3>{s.titel}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
            <div className="chips">
              {technologien.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — ÜBER MICH */}
        <section id="ueber" className="panel panel--amber">
          <div className="panel__inner ueber">
            <div className="ueber__left">
              <span className="ueber__avatar">EL</span>
            </div>
            <div className="ueber__right">
              <span className="panel__no panel__no--ink">04</span>
              <h2 className="panel__title panel__title--ink">Ernesto Lienhard</h2>
              <p className="ueber__role">Geschäftsführer · Techniker HF Automation</p>
              <p className="ueber__bio">
                Über 25 Jahre Praxis, mehr als 10 Jahre internationale Projekterfahrung – realisiert
                auf fünf Kontinenten. Mein Anspruch: saubere, herstellerneutrale Programmierung, die
                auch nach Jahren verständlich, wartbar und erweiterbar bleibt.
              </p>
            </div>
          </div>
        </section>

        {/* 05 — REFERENZEN */}
        <section id="referenzen" className="panel panel--dark">
          <div className="panel__bg-grid" />
          <div className="panel__inner">
            <header className="panel__head">
              <span className="panel__no">05</span>
              <h2 className="panel__title">Referenzen</h2>
            </header>
            <div className="refs">
              {referenzen.map((r) => (
                <article key={r.kunde} className="refs__item">
                  <h3>{r.kunde}</h3>
                  <p>{r.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 06 — KONTAKT */}
        <section id="kontakt" className="panel panel--blue">
          <div className="panel__inner kontakt">
            <header className="panel__head">
              <span className="panel__no">06</span>
              <h2 className="panel__title">Kontakt</h2>
            </header>
            <p className="kontakt__claim">Sprechen wir über Ihr Projekt.</p>
            <div className="kontakt__grid">
              <a className="kontakt__card" href="tel:+41797011821">
                <span>Telefon</span>
                <strong>+41 79 701 18 21</strong>
              </a>
              <a className="kontakt__card" href="mailto:info@lienhard-automation.ch">
                <span>E-Mail</span>
                <strong>info@lienhard-automation.ch</strong>
              </a>
              <a
                className="kontakt__card"
                href="https://maps.google.com/?q=Freilagerstrasse+71+8047+Zürich"
                target="_blank"
                rel="noreferrer"
              >
                <span>Adresse</span>
                <strong>Freilagerstrasse 71, 8047 Zürich</strong>
              </a>
            </div>
            <p className="kontakt__foot">
              © {new Date().getFullYear()} Lienhard Automation GmbH · Schweiz &amp; weltweit
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
