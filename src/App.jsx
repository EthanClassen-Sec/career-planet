import { useState } from "react";
import Planet from "./Planet.jsx";

const SITE = "https://careerplanet.co.za";

const NAV = [
  { label: "Explore Careers", href: `${SITE}/planning-your-career/` },
  { label: "Study & Training", href: `${SITE}/training/` },
  { label: "Jobs & Opportunities", href: `${SITE}/opportunities/` },
  { label: "About", href: `${SITE}/about-career-planet/` },
];

const TAGS = [
  { label: "Careers", href: `${SITE}/planning-your-career/`, tone: "mint" },
  { label: "Learnerships", href: `${SITE}/training/training-options/learnerships/`, tone: "lilac" },
  { label: "Bursaries", href: `${SITE}/training/bursaries/`, tone: "peach" },
];

function Flag() {
  return (
    <svg className="flag" viewBox="0 0 60 40" role="img" aria-label="South African flag">
      <defs>
        <clipPath id="flag-clip">
          <rect width="60" height="40" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-clip)">
        <rect width="60" height="20" fill="#DE3831" />
        <rect y="20" width="60" height="20" fill="#002395" />
        <path fill="#fff" d="M0 0 27 20 0 40Z" />
        <path fill="#FFB612" d="M0 4 21.5 20 0 36Z" />
        <path fill="#007A4D" d="M0 8 16.5 20 0 32Z" />
        <path fill="#000" d="M0 12 11.5 20 0 28Z" />
        <path fill="#fff" d="M13 16.2h47v7.6H13z" />
        <path fill="#FFB612" d="M15.2 17.6h44.8v4.8H15.2z" />
        <path fill="#007A4D" d="M17.2 18.7h42.8v2.6H17.2z" />
      </g>
    </svg>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="page">
      <header className="nav">
        <a className="brand" href={SITE}>
          <img src="/logo.png" alt="Career Planet. Welcome to a World of Opportunities!" />
        </a>

        <nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="join join-menu" href={`${SITE}/contact-us/`} onClick={() => setOpen(false)}>
            Join for Free
          </a>
        </nav>

        <div className="nav-end">
          <a className="join" href={`${SITE}/contact-us/`}>
            Join for Free
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="copy">
          <p className="eyebrow">Your future, your way</p>
          <h1>
            Find your path.
            <span className="future">
              Build your future.
              <svg viewBox="0 0 320 18" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M4 12 C 48 4, 90 16, 150 9 S 250 14, 316 6"
                  fill="none"
                  stroke="#FF725C"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="lede">
            Explore careers, discover training and find real opportunities to take your next step.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href={`${SITE}/planning-your-career/`}>
              Explore Careers <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn-ghost" href={`${SITE}/opportunities/`}>
              Find Opportunities <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="trust">
            <Flag />
            <span>Free resources for learners, students and job seekers across South Africa.</span>
          </p>
        </div>

        <div className="visual">
          <svg className="orbits orbits-back" viewBox="0 0 800 700" aria-hidden="true">
            <ellipse cx="455" cy="348" rx="292" ry="214" transform="rotate(-16 455 348)" />
            <ellipse cx="468" cy="368" rx="270" ry="228" className="warm" transform="rotate(22 468 368)" />
          </svg>

          <div className="planet-slot">
            <Planet />
          </div>

          <figure className="shot shot-student">
            <img src="/portrait-student.jpg" alt="A student standing in a college library with a book" />
          </figure>
          <figure className="shot shot-work">
            <img src="/portrait-work.jpg" alt="Two colleagues working together at a laptop" />
          </figure>
          <figure className="shot shot-office">
            <img src="/portrait-office.jpg" alt="A professional smiling at her desk" />
          </figure>

          <div className="opp">
            <div className="opp-title">
              <span className="rocket" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M14 4c2.5.4 4.6 2.5 5 5-2.2.2-4 .8-5.4 2.2L12 13l-1.6-1.6C8.8 9.8 7 9.2 4.8 9 5.2 6.5 7.3 4.4 9.8 4H14z" />
                  <path d="M9 14.2 6.2 17c-.4 1.5-1 2.6-1.7 3.2 1.2-.2 2.4-.7 3.5-1.5L11 16.2 9 14.2z" />
                  <circle cx="13.2" cy="8.6" r="1.1" fill="#fff" />
                </svg>
              </span>
              Your next opportunity
            </div>
            <div className="tags">
              {TAGS.map((tag) => (
                <a key={tag.label} className={`tag ${tag.tone}`} href={tag.href}>
                  {tag.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
