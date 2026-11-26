export const SITE = "https://careerplanet.co.za";

export const careers = [
  {
    id: "study",
    label: "Study",
    field: "Qualifications",
    outcome: "A degree, diploma, or TVET qualification, and a reason you chose it.",
    href: `${SITE}/training/`,
    cta: "See training paths",
    icon: "cap",
  },
  {
    id: "college",
    label: "Colleges",
    field: "Where you can study",
    outcome: "TVET colleges, universities, universities of technology, and private colleges.",
    href: `${SITE}/training/tvet-colleges/`,
    cta: "Explore colleges",
    icon: "landmark",
  },
  {
    id: "trades",
    label: "Trades",
    field: "Apprenticeships",
    outcome: "Learn a trade on the job, write your trade test, and earn while you qualify.",
    href: `${SITE}/apprenticeships/`,
    cta: "Look at apprenticeships",
    icon: "wrench",
  },
  {
    id: "work",
    label: "Work",
    field: "The working world",
    outcome: "What the first years of work actually ask of you, and how to get ready.",
    href: `${SITE}/working-world/`,
    cta: "Enter the working world",
    icon: "briefcase",
  },
  {
    id: "health",
    label: "Care",
    field: "Job descriptions",
    outcome: "Read the work before you commit to the title. Health, care, and hundreds of other roles.",
    href: `${SITE}/careers-listings/careers/`,
    cta: "Read job descriptions",
    icon: "heart",
  },
  {
    id: "tech",
    label: "Tech",
    field: "The future of work",
    outcome: "The jobs forming around technology, and the skills that travel with them.",
    href: `${SITE}/the-future-of-work/`,
    cta: "See the future of work",
    icon: "laptop",
  },
  {
    id: "grow",
    label: "Growth",
    field: "Industries hiring",
    outcome: "Sectors in South Africa that are taking people on, including routes with lower barriers.",
    href: `${SITE}/growth-sectors/`,
    cta: "Find growth sectors",
    icon: "sprout",
  },
  {
    id: "artisan",
    label: "Artisan",
    field: "Artisan careers",
    outcome: "From workshop to trade test. A practical path with a clear end point.",
    href: `${SITE}/artisan-careers/`,
    cta: "Artisan careers",
    icon: "hardhat",
  },
  {
    id: "science",
    label: "Science",
    field: "Still at school",
    outcome: "Subject choices that keep science, health, and engineering open after Grade 9.",
    href: `${SITE}/tools-4-school/`,
    cta: "Tools for school",
    icon: "flask",
  },
];

export const paths = [
  {
    id: "school",
    label: "Still at school",
    text: "You are choosing subjects. The useful move is to keep as many futures open as you can.",
    links: [
      { label: "Tools for school", href: `${SITE}/tools-4-school/` },
      { label: "Training options", href: `${SITE}/training/training-options/` },
      { label: "For parents", href: `${SITE}/parents-guardians-educators/` },
    ],
    light: ["science", "study", "college"],
  },
  {
    id: "leaver",
    label: "Just left school",
    text: "Matric is done, or nearly. Next is a qualification, a learnership, or a first job.",
    links: [
      { label: "Plan your career", href: `${SITE}/planning-your-career/` },
      { label: "Bursaries", href: `${SITE}/training/bursaries/` },
      { label: "TVET colleges", href: `${SITE}/training/tvet-colleges/` },
    ],
    light: ["study", "college", "tech"],
  },
  {
    id: "seeking",
    label: "Looking for work",
    text: "You need a way in. Skills programmes, apprenticeships, and roles that are actually open.",
    links: [
      { label: "I’m unemployed", href: `${SITE}/unemployed-looking-for-work/` },
      { label: "Find opportunities", href: `${SITE}/opportunities/` },
      { label: "Free skills training", href: `${SITE}/free-skills-training/` },
    ],
    light: ["trades", "artisan", "work"],
  },
  {
    id: "parent",
    label: "I’m a parent",
    text: "You are helping someone else decide. Start with the question they are actually asking.",
    links: [
      { label: "Parents and guardians", href: `${SITE}/parents-guardians-educators/` },
      { label: "Tools for school", href: `${SITE}/tools-4-school/` },
      { label: "FAQ", href: `${SITE}/faq/` },
    ],
    light: ["study", "health", "grow"],
  },
];

export const doors = [
  { label: "Get training", href: `${SITE}/training/` },
  { label: "Start a business", href: `${SITE}/entrepreneurship/` },
  { label: "Find opportunities", href: `${SITE}/opportunities/` },
  { label: "FAQ", href: `${SITE}/faq/` },
];

export const steps = [
  {
    n: "01",
    title: "Grade 9 subjects",
    text: "Choose subjects that leave you the widest set of training and career options.",
    href: `${SITE}/tools-4-school/`,
    cta: "Choose subjects",
  },
  {
    n: "02",
    title: "A qualification",
    text: "University, a TVET college, a learnership, or an apprenticeship. Different lengths, different doors.",
    href: `${SITE}/training/`,
    cta: "Compare training",
  },
  {
    n: "03",
    title: "A first role",
    text: "Learnerships, internships, apprenticeships, and opportunities you can apply for now.",
    href: `${SITE}/opportunities/`,
    cta: "Find opportunities",
  },
  {
    n: "04",
    title: "The next move",
    text: "Build a CV recruiters can find, then learn how to show up once you are in the room.",
    href: `${SITE}/planning-your-career/`,
    cta: "Start My Career",
  },
];

export const lessons = [
  {
    n: "00",
    title: "Intro",
    text: "What the one-minute finishing school is for.",
  },
  {
    n: "01",
    title: "The apology",
    text: "How to say sorry and mean it, at work and outside it.",
  },
  {
    n: "02",
    title: "Mobile phones",
    text: "When a phone in your hand costs you the room.",
  },
];

export const notes = [
  {
    title: "What is cloud computing?",
    text: "A plain explanation, and why the phrase shows up in so many job ads.",
    href: `${SITE}/what-is-cloud-computing/`,
  },
  {
    title: "From Grade 9 to PhD through TVET college",
    text: "How a college path can run much further than people expect.",
    href: `${SITE}/from-grade-9-to-phd-through-tvet-college/`,
  },
  {
    title: "The new tourism pioneers",
    text: "People opening different kinds of work in tourism.",
    href: `${SITE}/the-new-tourism-pioneers/`,
  },
];

export const suggestions = [
  { label: "Artisan", href: `${SITE}/artisan-careers/` },
  { label: "TVET", href: `${SITE}/training/tvet-colleges/` },
  { label: "Bursary", href: `${SITE}/training/bursaries/` },
  { label: "Learnership", href: `${SITE}/training/training-options/learnerships/` },
  { label: "Nurse", href: `${SITE}/careers-listings/careers/` },
  { label: "Software", href: `${SITE}/the-future-of-work/` },
];

export const footerLinks = [
  { label: "About us", href: `${SITE}/about-career-planet/` },
  { label: "Job descriptions", href: `${SITE}/careers-listings/careers/` },
  { label: "Personal growth", href: `${SITE}/personal-growth/` },
  { label: "Contact", href: `${SITE}/contact-us/` },
  { label: "Terms", href: `${SITE}/career-planet-term-and-conditions/` },
  { label: "Privacy", href: `${SITE}/privacy-policy/` },
];
