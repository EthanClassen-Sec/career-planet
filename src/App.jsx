import Planet from "./Planet.jsx";

const SITE = "https://careerplanet.co.za";

function Jobs() {
  return (
    <div className="strip" aria-hidden="true">
      <div className="frame grow">
        <svg viewBox="0 0 80 100">
          <circle cx="40" cy="28" r="12" fill="#f3d2b0" />
          <path d="M22 78c2-18 10-26 18-26s16 8 18 26" fill="#2f6b34" />
          <path d="M40 52c8-14 18-16 24-14-4 10-12 16-24 16Z" fill="#8fe04a" />
          <path d="M40 54c-6-12-16-14-22-12 3 9 10 14 22 14Z" fill="#5cb82e" />
          <rect x="38" y="54" width="4" height="16" rx="2" fill="#2f6b34" />
        </svg>
      </div>
      <div className="frame cook">
        <svg viewBox="0 0 80 100">
          <path d="M24 36c0-12 8-20 16-20s16 8 16 20v6H24v-6Z" fill="#fff" />
          <rect x="22" y="40" width="36" height="6" rx="2" fill="#f4f4f4" />
          <circle cx="40" cy="62" r="12" fill="#f3d2b0" />
          <path d="M18 92c3-16 12-22 22-22s19 6 22 22" fill="#f2f2f2" />
          <path d="M28 70h24l-2 8H30l-2-8Z" fill="#e85d2c" />
        </svg>
      </div>
      <div className="frame fire">
        <svg viewBox="0 0 80 100">
          <path d="M40 18c8 10 6 16 2 20 8-2 14 6 14 14a16 16 0 0 1-32 0c0-8 6-12 10-16 0 6 4 8 6 8-2-8 0-18 0-26Z" fill="#ffd000" />
          <path d="M40 34c4 6 3 10 1 13 5 0 8 4 8 8a9 9 0 0 1-18 0c0-4 3-7 6-9 0 3 2 4 3 4-1-5 0-11 0-16Z" fill="#ff7a18" />
          <path d="M18 78c2-14 10-20 22-20s20 6 22 20" fill="#1f2937" />
          <path d="M22 48h36l-4 10H26l-4-10Z" fill="#b91c1c" />
        </svg>
      </div>
      <div className="frame study">
        <svg viewBox="0 0 80 100">
          <circle cx="40" cy="34" r="12" fill="#f3d2b0" />
          <path d="M20 86c2-16 10-24 20-24s18 8 20 24" fill="#163a78" />
          <rect x="48" y="48" width="16" height="26" rx="2" fill="#111" />
          <rect x="50" y="50" width="12" height="18" rx="1" fill="#7ec8ff" />
        </svg>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="bar">
        <a className="brand" href={SITE}>
          <span className="name">
            Career Planet<sup>™</sup>
          </span>
          <span className="tag">Welcome to a World of Opportunities!</span>
        </a>
        <a className="mycareer" href={`${SITE}/planning-your-career/`}>
          My Career
        </a>
      </header>

      <section className="stage">
        <div className="stage-inner">
        <Jobs />
        <div className="copy">
          <span className="rule" />
          <h1>
            Understand
            <br />
            <span className="line">the world of work</span>
            <span className="script">and your place in it!</span>
          </h1>
          <p className="spin">give it a spin</p>
        </div>
        <div className="planet-slot">
          <Planet />
        </div>
        </div>
      </section>
    </div>
  );
}
