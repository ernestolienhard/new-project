import { useEffect } from 'react';
import './App.css';

const leistungen = [
  { titel: 'SPS-Engineering', text: 'Produktneutrale Softwarearchitektur – klar, wartbar und serienreif.' },
  { titel: 'Projektierung & Steuerung', text: 'Vom ersten Konzept bis zur erfolgreichen Endabnahme aus einer Hand.' },
  { titel: 'Inbetriebnahme', text: 'Durchgängige Begleitung vor Ort und remote – termintreu und dokumentiert.' },
  { titel: 'Retrofit & Modernisierung', text: 'Sichere Migration von Altsteuerungen ohne lange Stillstandzeiten.' },
  { titel: 'Schulung & Wissenstransfer', text: 'Praxisnahe Schulungen, damit Ihr Team Anlagen selbstständig betreibt.' },
  { titel: 'Service & Wartung', text: 'Verlässlicher Support und vorausschauende Wartung für den Dauerbetrieb.' },
];

const schwerpunkte = [
  { titel: 'Unified Modernisierung', text: 'Webbasierte Visualisierung mit WinCC Unified – zukunftssicher und plattformunabhängig.' },
  { titel: 'Cybersecurity', text: 'Segmentierte Netze, gehärtete Steuerungen und sichere Fernzugriffe nach aktuellem Standard.' },
  { titel: 'SINEMA RC', text: 'Verschlüsselter Fernzugriff auf Maschinen weltweit – Service ganz ohne Anreise.' },
];

const technologien = ['STEP 7', 'TIA Portal', 'PCS 7', 'WinCC Unified', 'WinCC OA', 'OPC UA', 'PROFINET', 'PROFIBUS'];

const referenzen = [
  { kunde: 'EKZ', text: '3 000 SPS-Steuerungen in Trafostationen' },
  { kunde: 'Schweizer Post', text: 'Sortierzentrum mit 19 000 Sendungen pro Stunde' },
  { kunde: 'DHL Gateway Basel', text: '10 000 Sendungen pro Stunde' },
  { kunde: 'ARA Zermatt', text: 'Grösste Membranbiologieanlage der Schweiz' },
  { kunde: 'SBB', text: 'Migration kritischer Steuerungstechnik' },
  { kunde: 'Equinix', text: 'Infrastruktur- und Steuerungstechnik' },
];

function Wave({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  return (
    <div className="wave" style={{ background: from }} aria-hidden>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
        <path
          d="M0,64 C240,120 480,0 720,40 C960,80 1200,120 1440,56 L1440,120 L0,120 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}

function App() {
  useEffect(() => {
    const ziele = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const io = new IntersectionObserver(
      (eintraege) => {
        eintraege.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal--in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    ziele.forEach((z) => io.observe(z));
    return () => io.disconnect();
  }, []);

  return (
    <div className="page">
      {/* schwebende, weiche Farbverläufe über die ganze Seite */}
      <div className="orbs" aria-hidden>
        <span className="orb orb--1" />
        <span className="orb orb--2" />
        <span className="orb orb--3" />
        <span className="orb orb--4" />
      </div>

      <header className="topbar">
        <a className="brand" href="#start">
          Lienhard <span>Automation</span>
        </a>
        <nav className="topnav">
          <a href="#leistungen">Leistungen</a>
          <a href="#schwerpunkte">Schwerpunkte</a>
          <a href="#ueber">Über mich</a>
          <a href="#referenzen">Referenzen</a>
          <a className="topnav__cta" href="#kontakt">Kontakt</a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="start" className="hero">
          <div className="hero__text reveal">
            <p className="eyebrow">Automation · Engineering · Weltweit</p>
            <h1>
              Steuerungstechnik,<br />die <em>überall</em> zuverlässig läuft.
            </h1>
            <p className="lead">
              Lienhard Automation GmbH entwickelt massgeschneiderte Steuerungslösungen für den
              Maschinen- und Anlagenbau – als Siemens-Spezialist mit über 25 Jahren Erfahrung
              auf fünf Kontinenten.
            </p>
            <div className="hero__actions">
              <a className="btn btn--solid" href="#kontakt">Projekt anfragen</a>
              <a className="btn btn--soft" href="#leistungen">Leistungen ansehen</a>
            </div>
          </div>
          <div className="hero__art reveal">
            <img src="/hero-network.svg" alt="Weltweit vernetzte Automatisierung" />
          </div>
        </section>

        {/* LEISTUNGEN */}
        <section id="leistungen" className="band">
          <div className="band__head reveal">
            <p className="eyebrow eyebrow--center">Was ich für Sie tue</p>
            <h2>Leistungen, die ineinandergreifen</h2>
            <p className="sub">
              Von der ersten Skizze bis zur laufenden Anlage – ein durchgängiger Partner für Ihre
              Automatisierung.
            </p>
          </div>
          <div className="cards">
            {leistungen.map((l, i) => (
              <article className="soft-card reveal" style={{ transitionDelay: `${i * 70}ms` }} key={l.titel}>
                <span className="soft-card__dot" />
                <h3>{l.titel}</h3>
                <p>{l.text}</p>
              </article>
            ))}
          </div>
        </section>

        <Wave from="transparent" to="#f3e0c6" />

        {/* SCHWERPUNKTE */}
        <section id="schwerpunkte" className="band band--warm">
          <div className="band__head reveal">
            <p className="eyebrow eyebrow--center">Schwerpunkte</p>
            <h2>Spezialisiert auf das, was zählt</h2>
            <p className="sub">Themen, die Ihre Anlagen sicher, bedienbar und zukunftsfähig machen.</p>
          </div>
          <div className="focus">
            {schwerpunkte.map((s, i) => (
              <article className="focus__item reveal" style={{ transitionDelay: `${i * 90}ms` }} key={s.titel}>
                <h3>{s.titel}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
          <div className="tech reveal">
            {technologien.map((t) => (
              <span className="tech__chip" key={t}>{t}</span>
            ))}
          </div>
        </section>

        <Wave from="#f3e0c6" to="transparent" flip />

        {/* ÜBER MICH */}
        <section id="ueber" className="about">
          <div className="about__art reveal">
            <img src="/about-art.svg" alt="Engineering und Steuerungstechnik" />
            <span className="about__badge">EL</span>
          </div>
          <div className="about__text reveal">
            <p className="eyebrow">Über mich</p>
            <h2>Ernesto Lienhard</h2>
            <p className="about__role">Geschäftsführer · Techniker HF Automation</p>
            <p>
              Über 25 Jahre Praxis und mehr als 10 Jahre internationale Projekterfahrung – realisiert
              auf fünf Kontinenten. Mein Anspruch ist eine saubere, herstellerneutrale Programmierung,
              die auch nach Jahren verständlich, wartbar und erweiterbar bleibt.
            </p>
            <p>
              So bekommen Sie pragmatische Lösungen, klare Kommunikation und Technik, die im Feld
              zuverlässig läuft – egal an welchem Standort der Welt.
            </p>
          </div>
        </section>

        {/* REFERENZEN */}
        <section id="referenzen" className="band">
          <div className="band__head reveal">
            <p className="eyebrow eyebrow--center">Referenzen</p>
            <h2>Projekte, die für sich sprechen</h2>
            <p className="sub">Eine Auswahl realisierter Anlagen für renommierte Auftraggeber.</p>
          </div>
          <div className="cards">
            {referenzen.map((r, i) => (
              <article className="ref reveal" style={{ transitionDelay: `${i * 70}ms` }} key={r.kunde}>
                <h3>{r.kunde}</h3>
                <p>{r.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* KONTAKT / FOOTER fließt aus warmem Verlauf */}
      <Wave from="transparent" to="#241710" />
      <footer id="kontakt" className="contact">
        <div className="contact__inner reveal">
          <p className="eyebrow eyebrow--light">Kontakt</p>
          <h2>Sprechen wir über Ihr Projekt</h2>
          <p className="contact__lead">
            Ob neue Anlage, Modernisierung oder Service – ich freue mich auf Ihre Anfrage und melde
            mich umgehend zurück.
          </p>
          <div className="contact__grid">
            <a className="contact__card" href="tel:+41797011821">
              <span>Telefon</span>
              <strong>+41 79 701 18 21</strong>
            </a>
            <a className="contact__card" href="mailto:info@lienhard-automation.ch">
              <span>E-Mail</span>
              <strong>info@lienhard-automation.ch</strong>
            </a>
            <a
              className="contact__card"
              href="https://maps.google.com/?q=Freilagerstrasse+71+8047+Zürich"
              target="_blank"
              rel="noreferrer"
            >
              <span>Adresse</span>
              <strong>Freilagerstrasse 71, 8047 Zürich</strong>
            </a>
          </div>
          <p className="contact__copy">
            © {new Date().getFullYear()} Lienhard Automation GmbH · Schweiz &amp; weltweit
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
