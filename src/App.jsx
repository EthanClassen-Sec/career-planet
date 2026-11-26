import Planet from "./Planet.jsx";

const SITE = "https://careerplanet.co.za";

const PHOTOS = [
  { src: "/job-grow.jpg", alt: "Hands holding a young plant" },
  { src: "/job-cook.jpg", alt: "A cook at work" },
  { src: "/job-fire.jpg", alt: "A firefighter in uniform" },
  { src: "/job-study.jpg", alt: "A student reading" },
];

const OPTIONS = [
  { label: "School learners", href: `${SITE}/tools-4-school/`, icon: "/options/school.png" },
  { label: "School leavers", href: `${SITE}/planning-your-career/`, icon: "/options/leavers.png" },
  { label: "Unemployed", href: `${SITE}/unemployed-looking-for-work/`, icon: "/options/unemployed.png" },
  { label: "Get training", href: `${SITE}/training/`, icon: "/options/training.png" },
  { label: "Start a business", href: `${SITE}/entrepreneurship/`, icon: "/options/business.png" },
  { label: "Find opportunities", href: `${SITE}/opportunities/`, icon: "/options/opportunities.png" },
  { label: "FAQ", href: `${SITE}/faq/`, icon: "/options/faq.png" },
  { label: "Parents & guardians", href: `${SITE}/parents-guardians-educators/`, icon: "/options/parents.png" },
];

export default function App() {
  return (
    <div className="page">
      <header className="bar">
        <a className="brand" href={SITE}>
          <img src="/logo.jpg" alt="Career Planet. Welcome to a World of Opportunities!" />
        </a>
        <a className="mycareer" href={`${SITE}/planning-your-career/`}>
          My Career
        </a>
      </header>

      <section className="stage">
        <div className="story">
          <div className="portraits">
            {PHOTOS.map((photo) => (
              <img key={photo.src} src={photo.src} alt={photo.alt} />
            ))}
          </div>

          <h1>
            Understand the world of work
            <span>and your place in it!</span>
          </h1>

          <nav className="choices" aria-label="Choose where you are">
            {OPTIONS.map((item) => (
              <a key={item.href} className="choice" href={item.href}>
                <img src={item.icon} alt="" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <p className="hint">Drag the planet to turn it</p>
        </div>

        <div className="earth-wrap">
          <Planet />
        </div>
      </section>
    </div>
  );
}
