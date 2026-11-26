import { useEffect, useRef, useState } from "react";
import Planet from "./Planet.jsx";

const SITE = "https://careerplanet.co.za";

const LEFT = [
  { label: "School learners", href: `${SITE}/tools-4-school/`, icon: "/options/school.png" },
  { label: "School leavers", href: `${SITE}/planning-your-career/`, icon: "/options/leavers.png" },
  { label: "Unemployed", href: `${SITE}/unemployed-looking-for-work/`, icon: "/options/unemployed.png" },
  { label: "Get training", href: `${SITE}/training/`, icon: "/options/training.png" },
];

const RIGHT = [
  { label: "Start a business", href: `${SITE}/entrepreneurship/`, icon: "/options/business.png" },
  { label: "Find opportunities", href: `${SITE}/opportunities/`, icon: "/options/opportunities.png" },
  { label: "FAQ", href: `${SITE}/faq/`, icon: "/options/faq.png" },
  { label: "Parents & guardians", href: `${SITE}/parents-guardians-educators/`, icon: "/options/parents.png" },
];

const LEFT_ANGLES = [0.78, 0.26, -0.26, -0.78].map((angle) => Math.PI + angle);
const RIGHT_ANGLES = [-0.78, -0.26, 0.26, 0.78];

function Choices({ items, side, points }) {
  return (
    <nav className={`choices ${side}`} aria-label={side === "left" ? "Where you are" : "What you need"}>
      {items.map((item, index) => (
        <a
          key={item.href}
          className="choice"
          href={item.href}
          style={points ? { left: `${points[index].x}px`, top: `${points[index].y}px` } : undefined}
        >
          <img src={item.icon} alt="" />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

function place(field, earth, angles) {
  const fieldBox = field.getBoundingClientRect();
  const earthBox = earth.getBoundingClientRect();
  const orbit = earthBox.width / 2 + 58;
  const cx = earthBox.left - fieldBox.left + earthBox.width / 2;
  const cy = earthBox.top - fieldBox.top + earthBox.height / 2;
  return angles.map((angle) => ({
    x: cx + Math.cos(angle) * orbit,
    y: cy + Math.sin(angle) * orbit,
  }));
}

export default function App() {
  const fieldRef = useRef(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    const field = fieldRef.current;
    const update = () => {
      const earth = field.querySelector(".planet");
      const earthWidth = earth?.getBoundingClientRect().width ?? 0;
      const stacked = window.matchMedia("(max-width: 900px)").matches || earthWidth < 520;
      if (!earth || stacked) {
        setPoints(null);
        return;
      }
      setPoints({
        left: place(field, earth, LEFT_ANGLES),
        right: place(field, earth, RIGHT_ANGLES),
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(field);
    const media = window.matchMedia("(max-width: 900px)");
    media.addEventListener("change", update);
    window.addEventListener("resize", update);
    update();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

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
        <div className="intro">
          <h1>
            Understand the world of work
            <span>and your place in it!</span>
          </h1>
          <p>Drag the planet. Choose where you are.</p>
        </div>

        <div className={`field${points ? " orbiting" : ""}`} ref={fieldRef}>
          <Choices items={LEFT} side="left" points={points?.left} />
          <div className="earth-wrap">
            <Planet />
          </div>
          <Choices items={RIGHT} side="right" points={points?.right} />
        </div>
      </section>
    </div>
  );
}
