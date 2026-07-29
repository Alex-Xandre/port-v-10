export type TimelineEntry = {
  title: string;
  company: string;
  client?: string;
  date: string;
  endYear: number | null;
  description: string;
  ic: string;
};

export const timeLineData: TimelineEntry[] = [
  {
    title: "Sr. Full Stack Developer",
    company: "Uptic",
    client: "IAC.AI ",
    date: "Oct 2025 - Present",
    endYear: null,
    description:
      "Embedded in Uptic's core engineering team as a senior full-stack engineer, delivering against active client assignments.",
    ic: "💼",
  },
  {
    title: "Full Stack Developer",
    company: "Guestpulse",
    date: "June 2024 - July 2025",
    endYear: 2025,
    description:
      "Full-stack developer for a Belgium-based company. Collaborated closely with the CEO and two senior engineers on product development and design optimization.",
    ic: "💼",
  },
  {
    title: "Lead Developer",
    company: "Subsidium",
    date: "December 2023 - December 2024",
    endYear: 2024,
    description:
      "Lead developer on a major Las Vegas-based project with a team of five. Concurrently contributed as a full-stack developer for a Canadian startup agency, handling everything from UI development to backend integration.",
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
      "Started my professional career as a front-end developer for a German-founded company with an office in Baguio City, Philippines. Built a solid foundation in production-level development and team collaboration.",
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
