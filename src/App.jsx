import { useEffect, useMemo, useRef, useState } from "react";
import {
  SITE,
  careers,
  doors,
  footerLinks,
  lessons,
  notes,
  paths,
  steps,
  suggestions,
} from "./content.js";
import { Icon, Mark } from "./icons.jsx";

const RADIUS = 43;
const ORIGIN = { x: 53, y: 66 };

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export default function App() {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState(careers[0].id);
  const [pathId, setPathId] = useState(paths[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const stageRef = useRef(null);

  const placed = useMemo(
    () =>
      careers.map((career, index) => {
        const angle = -Math.PI / 2 + (index * 2 * Math.PI) / careers.length;
        return {
          ...career,
          x: 50 + Math.cos(angle) * RADIUS,
          y: 50 + Math.sin(angle) * RADIUS,
        };
      }),
    []
  );

  const active = placed.find((career) => career.id === activeId) ?? placed[0];
  const path = paths.find((item) => item.id === pathId) ?? paths[0];

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const nodes = document.querySelectorAll(".step");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-lit");
        });
      },
      { threshold: 0.55 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  function tilt(event) {
    if (reduced || !stageRef.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    stageRef.current.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
  }

  function resetTilt() {
    if (stageRef.current) stageRef.current.style.transform = "";
  }

  function choosePath(next) {
    setPathId(next.id);
    setActiveId(next.light[0]);
  }

  return (
    <>
      <a className="skip" href="#where">
        Skip to where you are
      </a>
      <header className="nav">
        <a className="brand" href="#top">
          <Mark />
          <span>
            <strong>Career Planet</strong>
            <small>Welcome to a world of opportunities</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href={`${SITE}/training/`}>Training</a>
          <a href={`${SITE}/opportunities/`}>Opportunities</a>
          <a href={`${SITE}/planning-your-career/`}>My career</a>
          <a href={`${SITE}/faq/`}>FAQ</a>
        </nav>
        <a className="btn btn-line nav-cta" href={`${SITE}/planning-your-career/`}>
          My Career
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr">{menuOpen ? "Close menu" : "Open menu"}</span>
          <i />
          <i />
        </button>
      </header>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu">
          <button className="menu-close" type="button" onClick={() => setMenuOpen(false)}>
            Close
          </button>
          {[
            ["Training", `${SITE}/training/`],
            ["Opportunities", `${SITE}/opportunities/`],
            ["My career", `${SITE}/planning-your-career/`],
            ["Find your place", "#where"],
            ["FAQ", `${SITE}/faq/`],
            ["About", `${SITE}/about-career-planet/`],
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      )}

      <main id="top">
        <section className="hero" onMouseMove={tilt} onMouseLeave={resetTilt}>
          <div className="stars" aria-hidden="true" />
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="kicker">Career Planet · Since 2008</p>
              <h1>
                <span>The planet</span>
                <span className="accent">lights up.</span>
              </h1>
              <p className="lede">
                Understand the world of work. <em>And your place in it.</em>
              </p>
              <div className="hero-actions">
                <a className="btn btn-green" href="#where">
                  Find your place
                  <Icon name="arrow" />
                </a>
                <a className="btn btn-line" href="#ask">
                  I already know
                </a>
              </div>
              <article className="career-card" aria-live="polite">
                <p className="kicker">{active.field}</p>
                <h2>{active.label}</h2>
                <p>{active.outcome}</p>
                <a href={active.href}>
                  {active.cta}
                  <Icon name="arrow" />
                </a>
              </article>
            </div>

            <div className="orbit-wrap">
              <div className="orbit-stage" ref={stageRef}>
                <div className="corona" aria-hidden="true" />
                <svg className="rings" viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r="46" />
                  <circle cx="50" cy="50" r="36" />
                </svg>
                <div
                  className="earth"
                  role="img"
                  aria-label="Earth at night, with Africa and Europe lit by city lights"
                />
                <svg className="route" viewBox="0 0 100 100" aria-hidden="true">
                  <line
                    key={active.id}
                    x1={ORIGIN.x}
                    y1={ORIGIN.y}
                    x2={active.x}
                    y2={active.y}
                  />
                  {!reduced && (
                    <circle r="0.9" fill="#F8F0E0">
                      <animateMotion
                        dur="2.6s"
                        repeatCount="indefinite"
                        path={`M ${ORIGIN.x} ${ORIGIN.y} L ${active.x} ${active.y}`}
                      />
                    </circle>
                  )}
                </svg>
                <span className="pin" style={{ left: `${ORIGIN.x}%`, top: `${ORIGIN.y}%` }} aria-hidden="true" />
                {placed.map((career) => {
                  const isActive = career.id === active.id;
                  const isLit = path.light.includes(career.id);
                  return (
                    <button
                      key={career.id}
                      type="button"
                      className={`node${isActive ? " is-active" : ""}${isLit ? " is-lit" : ""}`}
                      style={{ left: `${career.x}%`, top: `${career.y}%` }}
                      aria-pressed={isActive}
                      onClick={() => setActiveId(career.id)}
                    >
                      <Icon name={career.icon} />
                      <span>{career.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="panel" id="where">
          <div className="wrap">
            <p className="kicker ink">Where are you right now?</p>
            <div className="section-head">
              <h2>Pick a place. The routes change.</h2>
              <p>
                Eight ways in, the same ones Career Planet has always offered. Four of them start here.
                The rest stay one tap away.
              </p>
            </div>
            <div className="path-grid">
              {paths.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`path${item.id === path.id ? " is-on" : ""}`}
                  aria-pressed={item.id === path.id}
                  onClick={() => choosePath(item)}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                </button>
              ))}
            </div>
            <div className="path-detail">
              <p>{path.text}</p>
              <div className="link-row">
                {path.links.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                    <Icon name="arrow" />
                  </a>
                ))}
              </div>
            </div>
            <ul className="doors">
              {doors.map((door) => (
                <li key={door.href}>
                  <a href={door.href}>{door.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="panel story-panel" id="path">
          <div className="wrap story-wrap">
            <p className="kicker ink">From Grade 9</p>
            <h2>Four lights, in order.</h2>
            <ol className="story">
              {steps.map((step) => (
                <li key={step.n} className="step">
                  <span className="step-index">{step.n}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                    <a href={step.href}>
                      {step.cta}
                      <Icon name="arrow" />
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="night-band" id="school">
          <div className="wrap">
            <div className="section-head light">
              <p className="kicker">One minute finishing school</p>
              <h2>Tips to take you to the top.</h2>
              <p>Short listens on the real Career Planet series. Each one is about a minute.</p>
            </div>
            <div className="snap">
              {lessons.map((lesson) => (
                <a key={lesson.n} className="lesson" href={`${SITE}/1-minute-finishing-school/`}>
                  <span>{lesson.n}</span>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.text}</p>
                  <em>Listen</em>
                </a>
              ))}
              <a className="lesson lesson-last" href={`${SITE}/industry-focus-series/`}>
                <span>→</span>
                <h3>Industry access</h3>
                <p>Growth industries with a way in, starting with BPO.</p>
                <em>Open the series</em>
              </a>
            </div>
          </div>
        </section>

        <section className="panel" id="ask">
          <div className="wrap ask">
            <p className="kicker ink">Ask the planet</p>
            <h2>What do you want to become?</h2>
            <form action={`${SITE}/`} method="get" role="search">
              <label className="sr" htmlFor="q">
                Search careers on Career Planet
              </label>
              <input id="q" name="s" required placeholder="Nurse, plumber, software, chef…" />
              <button className="btn btn-green" type="submit">
                Search
              </button>
            </form>
            <div className="pills">
              {suggestions.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="notes-head">
              <p className="kicker ink">Field notes</p>
              <a href={`${SITE}/category/home-page-news`}>The journal</a>
            </div>
            <div className="notes">
              {notes.map((note) => (
                <a key={note.href} href={note.href}>
                  <h3>{note.title}</h3>
                  <p>{note.text}</p>
                  <span>Read</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <a className="brand" href="#top">
              <Mark />
              <span>
                <strong>Career Planet</strong>
                <small>Not for profit</small>
              </span>
            </a>
            <p>
              Free career guidance for young people in South Africa, on the web and on a phone.
              A registered non-profit, helping since 2008.
            </p>
            <p className="meta">NPO 129-906 · PBO 930025803</p>
          </div>
          <div>
            <p className="kicker">On this site</p>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker">Keep in touch</p>
            <p>The newsletter and the full library live on the current Career Planet site.</p>
            <a className="btn btn-line" href={`${SITE}/contact-us/`}>
              Contact Career Planet
            </a>
            <p className="meta">
              <a href="mailto:admin@careerplanet.co.za">admin@careerplanet.co.za</a>
              <br />
              <a href="https://www.facebook.com/CareerPlanetJobs">Facebook</a>
            </p>
          </div>
        </div>
        <div className="wrap legal">
          <span>© {new Date().getFullYear()} Career Planet</span>
          <span>
            Earth at night: NASA / NOAA, public domain.{" "}
            <a href={SITE}>careerplanet.co.za</a>
          </span>
        </div>
      </footer>
    </>
  );
}
