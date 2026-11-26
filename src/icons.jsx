const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function Icon({ name }) {
  switch (name) {
    case "cap":
      return (
        <svg {...common}>
          <path d="M2.5 10 12 5l9.5 5L12 15 2.5 10Z" />
          <path d="M6.5 12.2V16c0 .6 2.2 2.6 5.5 2.6s5.5-2 5.5-2.6v-3.8" />
          <path d="M21 10.2V15" />
        </svg>
      );
    case "landmark":
      return (
        <svg {...common}>
          <path d="M4 10h16" />
          <path d="M12 3.5 3.5 10h17L12 3.5Z" />
          <path d="M6.5 10v7M10 10v7M14 10v7M17.5 10v7" />
          <path d="M4 17h16M3 20.5h18" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4.2 4.2 0 0 0-5.8 5.7L4 17l3 3 5-4.9a4.2 4.2 0 0 0 5.6-5.6L15 12l-3-3 2.7-2.7Z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
          <path d="M3 12.5h18" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9Z" />
        </svg>
      );
    case "laptop":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="10" rx="1.6" />
          <path d="M2.5 19h19" />
          <path d="M9 19c.4-1.2 1.2-1.8 3-1.8s2.6.6 3 1.8" />
        </svg>
      );
    case "sprout":
      return (
        <svg {...common}>
          <path d="M12 21V11" />
          <path d="M12 11c0-4.2 3.2-6.4 7.2-6.4C18 8.6 15.6 11 12 11Z" />
          <path d="M12 13.2C12 10 9.4 8 5.6 8 6.8 11.6 9.2 13.2 12 13.2Z" />
        </svg>
      );
    case "hardhat":
      return (
        <svg {...common}>
          <path d="M4 14.5a8 8 0 0 1 16 0" />
          <path d="M3 14.5h18v1.8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.8Z" />
          <path d="M12 6.2v2" />
        </svg>
      );
    case "flask":
      return (
        <svg {...common}>
          <path d="M9 3h6" />
          <path d="M10 3v5.5L5.2 18.6A2.2 2.2 0 0 0 7.1 22h9.8a2.2 2.2 0 0 0 1.9-3.4L14 8.5V3" />
          <path d="M8.2 14.5h7.6" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}

export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#009840" />
      <path
        d="M22.5 10.2a8.2 8.2 0 1 0 .2 11.7"
        fill="none"
        stroke="#F8F0E0"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
