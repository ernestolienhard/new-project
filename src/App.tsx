import { useEffect, useState } from 'react';
import './App.css';

const leistungen = [
  {
    titel: 'SPS-Engineering',
    text: 'Produktneutrale Softwarelösungen mit klarer, wartbarer Programmarchitektur – von der Spezifikation bis zur Serienreife.',
  },
  {
    titel: 'Projektierung & Steuerung',
    text: 'Begleitung über den gesamten Lebenszyklus: vom Konzept über das Engineering bis zur erfolgreichen Endabnahme.',
  },
  {
    titel: 'Programmierung & Inbetriebnahme',
    text: 'Durchgängige Unterstützung vor Ort und remote – termintreu, dokumentiert und auf maximale Anlagenverfügbarkeit ausgelegt.',
  },
  {
    titel: 'Retrofit & Modernisierung',
    text: 'Sichere Migration von Altsteuerungen auf aktuelle Plattformen – ohne unnötige Stillstandzeiten.',
  },
  {
    titel: 'Schulung & Wissenstransfer',
    text: 'Praxisnahe Schulungen für Ihr Team, damit Sie Ihre Anlagen langfristig selbstständig betreiben können.',
  },
  {
    titel: 'Service & Wartung',
    text: 'Verlässlicher Support, schnelle Reaktionszeiten und vorausschauende Wartung für einen störungsfreien Betrieb.',
  },
];

const technologien = [
  'SIMATIC STEP 7 Classic',
  'TIA Portal',
  'SIMATIC PCS 7',
  'WinCC Unified',
  'WinCC OA',
  'OPC UA',
  'PROFINET',
  'PROFIBUS',
];

const schwerpunkte = [
  {
    titel: 'Unified Modernisierung',
    text: 'Migration bestehender Visualisierungen auf WinCC Unified – zukunftssicher, webbasiert und plattformunabhängig bedienbar.',
  },
  {
    titel: 'Cybersecurity',
    text: 'Schutz industrieller Anlagen nach aktuellen Standards: segmentierte Netze, gehärtete Steuerungen und sichere Fernzugriffe.',
  },
  {
    titel: 'SINEMA RC',
    text: 'Sicherer Fernzugriff auf Maschinen weltweit über verschlüsselte Verbindungen – für schnellen Service ohne Anreise.',
  },
];

const referenzen = [
  {
    kunde: 'EKZ',
    projekt: 'Beleuchtungssteuerung',
    kennzahl: '3 000 SPS-Steuerungen in Trafostationen',
  },
  {
    kunde: 'Schweizer Post',
    projekt: 'Mix-Mail Sortierzentrum',
    kennzahl: '19 000 Sendungen pro Stunde',
  },
  {
    kunde: 'DHL Gateway Basel',
    projekt: 'Paketsortierung',
    kennzahl: '10 000 Sendungen pro Stunde',
  },
  {
    kunde: 'ARA Zermatt',
    projekt: 'Membranbiologieanlage',
    kennzahl: 'Grösste Anlage ihrer Art in der Schweiz',
  },
  {
    kunde: 'SBB',
    projekt: 'Modernisierung',
    kennzahl: 'Migration kritischer Steuerungstechnik',
  },
  {
    kunde: 'Equinix',
    projekt: 'Rechenzentrum',
    kennzahl: 'Infrastruktur- und Steuerungstechnik',
  },
];

const navLinks = [
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'schwerpunkte', label: 'Schwerpunkte' },
  { id: 'ueber-mich', label: 'Über mich' },
  { id: 'referenzen', label: 'Referenzen' },
  { id: 'kontakt', label: 'Kontakt' },
];

function App() {
  const [menuOffen, setMenuOffen] = useState(false);
  const [gescrollt, setGescrollt] = useState(false);

  useEffect(() => {
    const onScroll = () => setGescrollt(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="site">
      <header className={`nav ${gescrollt ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#top" className="brand">
            <span className="brand__mark">LA</span>
            <span className="brand__name">
              Lienhard <strong>Automation</strong>
            </span>
          </a>

          <nav className={`nav__links ${menuOffen ? 'nav__links--open' : ''}`}>
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOffen(false)}>
                {link.label}
              </a>
            ))}
            <a className="nav__cta" href="#kontakt" onClick={() => setMenuOffen(false)}>
              Anfrage senden
            </a>
          </nav>

          <button
            className="nav__burger"
            aria-label="Menü öffnen"
            onClick={() => setMenuOffen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__inner">
            <p className="hero__eyebrow">Automation. Engineering. Weltweit.</p>
            <h1 className="hero__title">
              Industrielle Steuerungstechnik,
              <br />
              auf die Sie sich verlassen können.
            </h1>
            <p className="hero__lead">
              Lienhard Automation GmbH entwickelt massgeschneiderte Steuerungslösungen für den
              Maschinen- und Anlagenbau – spezialisiert auf Siemens-Technologien, von der ersten
              Idee bis zur erfolgreichen Inbetriebnahme.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#kontakt">
                Projekt anfragen
              </a>
              <a className="btn btn--ghost" href="#leistungen">
                Leistungen entdecken
              </a>
            </div>

            <dl className="hero__stats">
              <div>
                <dt>25+ Jahre</dt>
                <dd>Erfahrung in der Automation</dd>
              </div>
              <div>
                <dt>5 Kontinente</dt>
                <dd>Internationale Projekte</dd>
              </div>
              <div>
                <dt>Weltweit</dt>
                <dd>Service & Fernzugriff</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="leistungen" className="section">
          <div className="section__head">
            <p className="section__eyebrow">Leistungen</p>
            <h2>Alles aus einer Hand</h2>
            <p className="section__intro">
              Von der Projektierung bis zur Wartung – ein durchgängiger Partner für Ihre
              Automatisierungsprojekte.
            </p>
          </div>
          <div className="grid grid--3">
            {leistungen.map((item) => (
              <article key={item.titel} className="card">
                <h3>{item.titel}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="schwerpunkte" className="section section--alt">
          <div className="section__head">
            <p className="section__eyebrow">Schwerpunkte</p>
            <h2>Spezialisiert auf das, was zählt</h2>
            <p className="section__intro">
              Moderne Themen, die Ihre Anlagen sicher, bedienbar und zukunftsfähig machen.
            </p>
          </div>
          <div className="grid grid--3">
            {schwerpunkte.map((item) => (
              <article key={item.titel} className="card card--accent">
                <h3>{item.titel}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="tech">
            <h3>Technologien</h3>
            <ul className="tech__list">
              {technologien.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="ueber-mich" className="section">
          <div className="about">
            <div className="about__text">
              <p className="section__eyebrow">Über mich</p>
              <h2>Ernesto Lienhard</h2>
              <p>
                Als Techniker HF Automation mit über 25 Jahren Erfahrung habe ich Projekte auf fünf
                Kontinenten realisiert – von der Schweiz bis in die entlegensten Industriestandorte.
                Über 10 Jahre internationale Projekterfahrung bedeuten für Sie: pragmatische
                Lösungen, klare Kommunikation und Technik, die im Feld zuverlässig läuft.
              </p>
              <p>
                Mein Anspruch ist eine saubere, wartbare und herstellerneutrale Programmarchitektur,
                die auch nach Jahren noch verständlich und erweiterbar ist.
              </p>
            </div>
            <div className="about__card">
              <span className="about__avatar">EL</span>
              <p className="about__role">Geschäftsführer & Engineering</p>
              <ul>
                <li>Techniker HF Automation</li>
                <li>25+ Jahre Praxiserfahrung</li>
                <li>Internationale Inbetriebnahmen</li>
                <li>Siemens-Spezialist</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="referenzen" className="section section--alt">
          <div className="section__head">
            <p className="section__eyebrow">Referenzen</p>
            <h2>Projekte, die für sich sprechen</h2>
            <p className="section__intro">
              Eine Auswahl realisierter Anlagen für renommierte Auftraggeber.
            </p>
          </div>
          <div className="grid grid--3">
            {referenzen.map((ref) => (
              <article key={ref.kunde + ref.projekt} className="ref">
                <span className="ref__kunde">{ref.kunde}</span>
                <h3>{ref.projekt}</h3>
                <p>{ref.kennzahl}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="kontakt" className="section">
          <div className="kontakt">
            <div className="kontakt__text">
              <p className="section__eyebrow">Kontakt</p>
              <h2>Sprechen wir über Ihr Projekt</h2>
              <p>
                Ob neue Anlage, Modernisierung oder Service – ich freue mich auf Ihre Anfrage und
                melde mich umgehend zurück.
              </p>
              <ul className="kontakt__liste">
                <li>
                  <span>Telefon</span>
                  <a href="tel:+41797011821">+41 79 701 18 21</a>
                </li>
                <li>
                  <span>E-Mail</span>
                  <a href="mailto:info@lienhard-automation.ch">info@lienhard-automation.ch</a>
                </li>
                <li>
                  <span>Adresse</span>
                  <a
                    href="https://maps.google.com/?q=Freilagerstrasse+71+8047+Zürich"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Freilagerstrasse 71, 8047 Zürich
                  </a>
                </li>
                <li>
                  <span>Einsatzgebiet</span>
                  <span className="kontakt__plain">Schweiz &amp; weltweit</span>
                </li>
              </ul>
            </div>

            <div className="kontakt__cta">
              <h3>Direkt anfragen</h3>
              <p>Schreiben Sie mir – ich antworte in der Regel innerhalb eines Werktags.</p>
              <a
                className="btn btn--primary btn--block"
                href="mailto:info@lienhard-automation.ch?subject=Projektanfrage%20Lienhard%20Automation"
              >
                E-Mail schreiben
              </a>
              <a className="btn btn--ghost btn--block" href="tel:+41797011821">
                Jetzt anrufen
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="brand__mark">LA</span>
            <div>
              <strong>Lienhard Automation GmbH</strong>
              <p>Automation. Engineering. Weltweit.</p>
            </div>
          </div>
          <div className="footer__meta">
            <p>Freilagerstrasse 71, 8047 Zürich, Schweiz</p>
            <p>
              <a href="tel:+41797011821">+41 79 701 18 21</a> ·{' '}
              <a href="mailto:info@lienhard-automation.ch">info@lienhard-automation.ch</a>
            </p>
            <p className="footer__copy">
              © {new Date().getFullYear()} Lienhard Automation GmbH · Alle Rechte vorbehalten
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
