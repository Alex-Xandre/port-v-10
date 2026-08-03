export type TimelineEntry = {
  title: string;
  company: string;
  client?: string;
  date: string;
  endYear: number | null;
  description: string;
  ic: string;
};

export const TIMELINE_DATA: TimelineEntry[] = [
  {
    title: "Sr. Full Stack Developer",
    company: "Uptic",
    client: "IAC.AI ",
    date: "Oct 2025 - Present",
    endYear: null,
    description:
      "Building and maintaining a platform. Embedded in the core engineering team, shipping features against live client accounts.",
    ic: "💼",
  },
  {
    title: "Full Stack Developer",
    company: "Guestpulse",
    date: "June 2024 - July 2025",
    endYear: 2025,
    description:
      "Built the core analytics studio and CRM for customer data platform for top hoteliers in EU, unifying siloed guest data into one system for loyalty, targeting, and insights. Worked directly with the CEO and multiple senior engineers.",
    ic: "💼",
  },
  {
    title: "Lead Developer",
    company: "Subsidium",
    date: "December 2023 - December 2024",
    endYear: 2024,
    description:
      "Led a team of building the core of a combined e-commerce and e-learning platform for a Las Vegas combat sports gym — class booking, tiered private and pro training sessions, and course delivery. Concurrently worked full-stack for a Canadian startup agency.",
    ic: "💼",
  },
  {
    title: "Part-Time Developer",
    company: "Freelance",
    date: "July 2023 - December 2023",
    endYear: 2023,
    description:
      "Transitioned to part-time freelance and project-based work, securing multiple local and international clients across front-end and full-stack projects.",
    ic: "🕒",
  },
  {
    title: "Front-End Developer",
    company: "MKBGIT Solutions",
    date: "July 2022 - July 2023",
    endYear: 2023,
    description:
      "Maintained a legacy React platform for a German-founded company and led its migration from class components to functional components and hooks. My first production codebase, and where I learned to work in an established team.",
    ic: "💼",
  },
  {
    title: "Graduation",
    company: "STI College Vigan",
    date: "July 2022",
    endYear: 2022,
    description:
      "Graduated with a Bachelor of Science in Computer Science from STI College Vigan, Philippines.",
    ic: "🎓",
  },
  {
    title: "First Freelance Project",
    company: "STI La Union",
    date: "December 2021",
    endYear: 2021,
    description:
      "Landed my first freelance client, based in California. Delivered three landing pages for NFT projects and built a full-stack e-learning system, which sparked my interest in freelancing and remote work.",
    ic: "💡",
  },
  {
    title: "Code Start",
    company: "STI La Union",
    date: "June 2018",
    endYear: 2018,
    description:
      "Began my journey in tech by enrolling in the Bachelor of Science in Computer Science program at STI College, Philippines. Wrote my first line of code that first semester and immediately developed a passion for software development.",
    ic: "👨‍💻",
  },
];
