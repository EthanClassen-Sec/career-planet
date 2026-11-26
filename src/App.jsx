import Planet from "./Planet.jsx";

const SITE = "https://careerplanet.co.za";

const PHOTOS = [
  { src: "/job-grow.jpg", alt: "Hands planting a seedling" },
  { src: "/job-cook.jpg", alt: "A chef" },
  { src: "/job-fire.jpg", alt: "A firefighter" },
  { src: "/job-study.jpg", alt: "A student on the phone" },
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
        <div className="stage-inner">
          <div className="lead">
            <div className="photos">
              {PHOTOS.map((photo) => (
                <img key={photo.src} src={photo.src} alt={photo.alt} />
              ))}
            </div>
            <div className="copy">
              <span className="rule" />
              <h1>
                Understand
                <br />
                the world of work
                <span className="script">and your place in it!</span>
              </h1>
            </div>
          </div>

          <div className="planet-slot">
            <div className="planet-frame">
              <Planet />
            </div>
            <p className="hint">Drag to turn</p>
          </div>
        </div>
      </section>
    </div>
  );
}
