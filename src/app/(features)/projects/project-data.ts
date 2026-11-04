export type ProjectEntry = {
  title: string;
  banner: string[];
  web_link: string;
  stack: string[];
  description: string;
  features: string[];
  type: string;
  year?: number;
  testAccount?: [string, string];
  bannerLabels?: string[];
  github?: string;
};

export const PROJECT_DATA: ProjectEntry[] = [
  {
    title: "Steadly",
    banner: [
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1793770857/steadly-1_elif7o.png",
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1793770858/steaddly-2_vuymuo.png",
    ],
    web_link: "https://steadly.vercel.app/",
    stack: [
      "Postgres",
      "Supabase",
      "Next JS",
      "Drizzle",
      "Tailwind CSS",
      "Zod",
      "Vercel",
    ],
    description:
      "A white-label platform for trading academies: mentors run courses and review trades, and students track their prop firm rules and journal every trade.",
    features: [
      "A branded academy for each mentor, with its own colors, subdomain and public course page",
      "Invite links with mentor approval, cohorts that control course access, and seat limits per plan",
      "Course builder with modules, video lessons and quizzes",
      "Prop firm rule check that marks each rule OK, at risk or breached for every account",
      "Order ticket that sizes a position from the risk you set, and logs the trade to the journal",
      "Trade journal with CSV import, screenshots, planned-vs-actual results and full stats",
      "Trade review queue where mentors comment on and tag students' mistakes",
      "Community feed with posts, shared trades, replies and per-post visibility",
      "Each academy's data walled off with Postgres row-level security",
    ],
    type: "Web",
    bannerLabels: ["students.png", "branding.png"],
  },
  {
    title: "Matterly",
    banner: [
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1791262504/desktop_u93ss9.png",
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1791262693/cases_hdzwej.png",
    ],
    web_link: "https://matterly-lac.vercel.app/",
    stack: [
      "Postgres",
      "Supabase",
      "Next JS",
      "Drizzle",
      "Semaphore SMS",
      "Tailwind CSS",
      "Vercel",
    ],
    description:
      "Case and client management for Philippine law firms, with client updates by SMS and a client portal.",
    features: [
      "Case tracking with stages per case type, lead lawyers, staff assignment and archiving",
      "Conflict check that flags when a new client or opposing party already appears in another case",
      "Spreadsheet import for cases, clients and deadlines, with every row reviewed before it is saved",
      "Client updates drafted by staff, approved by a lawyer, and sent by SMS with a portal link",
      "Hearing and filing deadlines with SMS reminders at 7, 3 and 1 days, plus month and week calendars",
      "Client portal with short-lived links showing the case stage, updates and next court date",
      "Dashboard of overdue deadlines, quiet cases, failed sends and caseload per lawyer",
      "Separate roles for lawyers, staff and clients, with row-level security per firm, a full audit log, CSV export and encrypted daily backups",
    ],
    type: "Web",
    bannerLabels: ["dashboard.png", "cases.png"],
  },

  {
    title: "Portfolio",
    banner: [],
    web_link: "https://xandremicua.vercel.app/",
    stack: ["Next JS", "Tailwind CSS", "Motion", "React Markdown", "Vercel"],
    description:
      "This site. A terminal-styled portfolio where every page reads as shell output, and the shell actually works.",
    features: [
      "An interactive shell: press /, with tab completion, command history and commands that really navigate (projects --postgres filters and routes)",
      "Section headers written as commands that update live: filter by --postgres and the header reads ls projects/ --postgres",
      "Career as a git log, stack as an npm ls tree, and the 404 page as a bash error",
      "A live ticker with last push and public repo count from the GitHub API, cached hourly and hidden if the fetch fails",
      "theme green recolors the whole site from one token block",
      "Blog written in markdown",
      "A pixel cat that patrols the footer",
    ],
    type: "Web",
    year: 2026,
    github: "https://github.com/Alex-Xandre/port-v-10",
  },
  {
    title: "Terminal Portfolio",
    banner: [],
    web_link: "",
    stack: ["AGENTS.md", "Claude Code", "Next JS", "Tailwind CSS"],
    description:
      "My portfolio's design system, written as an agent harness. Point Claude Code at it and it builds a new terminal-style portfolio that follows the same rules without copying this one.",
    features: [
      "About forty design rules in one AGENTS.md, each with the reason behind it",
      "The pattern for every page: command headers, cd links, filter flags, window frames, git log, npm ls tree, ticker and 404",
      "Three palette presets (amber, green phosphor and ice blue), each a single token block",
      "A generation recipe that tells an agent what to build, in what order, and what it must never add",
      "Consistency checks to run before every commit",
      "Tested from an empty folder with a made-up backend engineer; what the agent got wrong, and one call it got right that the harness hadn't, went back into the rules",
    ],
    type: "Open Source",
    year: 2026,
    github: "https://github.com/Alex-Xandre/terminal-portfolio",
  },

  {
    title: "Position Size Calculator",
    banner: [
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1793772273/journal-test_avjfuk.png",
    ],
    web_link: "",
    stack: [
      "JavaScript",
      "Chrome Extension (MV3)",
      "Google Sheets API",
      "Apps Script",
    ],
    description:
      "A Chrome side-panel extension that sizes a position from your risk and stop, checks it against your prop firm's loss caps, and journals the trade.",
    features: [
      "Lot size from balance, risk % and stop, rounded down to 0.01 lot, then the risk you actually take is recomputed",
      "Reads the symbol to tell forex, metals, crypto, indices and energy apart, broker suffixes like EURUSD.m included, and converts the quote currency to USD",
      "Warns when the stop or take profit is on the wrong side, when margin exceeds the balance, or when a loss would breach today's daily cap",
      "Shows how many losses in a row your daily and max loss caps allow at this risk",
      "Journal of the last 500 trades with Win / Loss / BE outcomes, today's realized P&L and CSV export",
      "Optional Google Sheets sync, by Google sign-in (it can only see the sheet it created) or your own Apps Script, with outcome edits matched to the row by trade ID",
      "Every trade is saved locally first, so a failed sync never loses it",
    ],
    type: "Extension",
    year: 2026,
  },
  {
    title: "Volume Profile Pro",
    banner: ["https://res.cloudinary.com/dfhhkd04c/image/upload/v1793772642/test-vp_m85o2c.png"],
    web_link: "",
    stack: ["Pine Script v6", "TradingView"],
    description:
      "A TradingView volume profile for forex and CFD traders: a live session profile on the right, two draggable ranges on the left, and CME futures volume mapped onto charts that only have tick volume.",
    features: [
      "Session profile drawn to the right of price: daily from a New York reset hour, a custom window like London or New York, or a rolling last-N-bars profile for scalping",
      "Two ranges you set by clicking the chart and drag to move, with the histogram pinned to the left edge of the screen",
      "POC and value area, previous session POC / VAH / VAL, and naked POCs that extend until price touches them",
      "Built from lower-timeframe intrabar data (down to 1-second bars), spreading each bar's volume across the prices it traded",
      "Pulls volume from CME futures (6E, 6A, 6J, gold) onto forex and CFD charts, inverting USD-base pairs and shifting levels by a smoothed basis",
      "Rolling mode subtracts bars as they leave the window instead of rebuilding the profile every bar",
      "Monochrome, delta (buy / sell) and volume-heat themes, session VWAP with bands, and alerts on POC and value area crosses",
    ],
    type: "Trading Tool",
    year: 2026,
  },
  // {
  //   title: "ELMS",
  //   banner: [
  //     "https://res.cloudinary.com/dn9zkhies/image/upload/v1785326880/test_xciufd.png",
  //     "https://res.cloudinary.com/dfhhkd04c/image/upload/v1753859077/els-1_eiecqj.png",
  //   ],
  //   web_link: "https://e-learning-two-opal.vercel.app/",
  //   stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
  //   description:
  //     "A full-featured e-commerce and event learning management system for selling educational event products and managing student engagement, with integrated payments.",
  //   features: [
  //     "Module creation and management",
  //     "Interactive quizzes and assessments",
  //     "Automatic quiz scoring and feedback",
  //     "Student profile and progress tracking",
  //     "Role-based access (admin, instructor, student)",
  //     "Event scheduling and calendar system",
  //     "Admin dashboard with analytics",
  //   ],
  //   type: "Web",
  //   testAccount: ["2", "1"],
  //   github: "https://github.com/Alex-Xandre/els.git",
  // },
  // {
  //   title: "Membo",
  //   banner: [
  //     "https://res.cloudinary.com/dnhka2l80/image/upload/v1742269695/membo_zbz5be.png",
  //   ],
  //   web_link: "https://membo-nine.vercel.app/",
  //   stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
  //   description:
  //     "An e-commerce platform focused on event management products, with payment integrations.",
  //   features: [
  //     "Built a fully functional e-commerce app for event and ticketing management for staffs and workers with React on the frontend and Node.js with Express on the backend",
  //     "Implemented product catalog, cart, and checkout with integrated payments",
  //     "Created separate modules for admin and customer",
  //   ],
  //   type: "Web",
  //   github: "https://github.com/Alex-Xandre/membo",
  // },
  // {
  //   title: "Anywear Fashion",
  //   banner: [
  //     "https://res.cloudinary.com/dfhhkd04c/image/upload/v1744296663/anywear_vsoky7.png",
  //   ],
  //   web_link: "https://www.anywear-fashion-trading.com/",
  //   stack: [
  //     "MongoDB",
  //     "Express",
  //     "React",
  //     "Node.js",
  //     "Tailwind CSS",
  //     "React Native",
  //   ],
  //   description:
  //     "An HR management system handling HR tasks and progress quotas, with a companion mobile app.",
  //   features: [
  //     "Built an HR management system with React on the web and React Native for the companion mobile app",
  //     "Implemented employee records, task assignment, and progress quota tracking",
  //     "Created separate modules for HR admins and employees",
  //     "Synced data between web and mobile through a shared Node.js and Express API",
  //   ],
  //   type: "Web · Mobile",
  // },
  // {
  //   title: "Planteria",
  //   banner: [
  //     "https://res.cloudinary.com/dfhhkd04c/image/upload/v1700539674/proj_1_fttl7o.png",
  //   ],
  //   web_link: "https://bukal-garden-planteria.store/",
  //   stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
  //   description:
  //     "An e-commerce store for plant products, with payment integrations.",
  //   features: [
  //     "Built a fully functional e-commerce app for plant selling with React on the frontend and Node.js with Express on the backend",
  //     "Implemented an inventory system and payment integrations",
  //     "Created separate modules for seller, admin, and user",
  //   ],
  //   type: "Web",
  //   testAccount: ["xndrmcua22@gmail.com", "12345678"],
  // },
  // {
  //   title: "DineEase",
  //   banner: [
  //     "https://res.cloudinary.com/dfhhkd04c/image/upload/v1690989227/proj-3-removebg-preview_yrzyse_1_iytqvm.png",
  //   ],
  //   web_link: "https://dineease-8pbh.onrender.com/",
  //   stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
  //   description: "A restaurant management system for a samgyupsal business.",
  //   features: [
  //     "Built a fully functional restaurant app for a samgyupsal business with React on the frontend and Node.js with Express on the backend",
  //     "Implemented an inventory system, payment integrations, and real-time ordering",
  //     "Created separate modules for admin, customers, kitchen, and cashier",
  //   ],
  //   type: "Web",
  //   testAccount: ["T1", "customer"],
  // },
  // {
  //   title: "Yes-O Calaca",
  //   banner: [
  //     "https://res.cloudinary.com/dfhhkd04c/image/upload/v1700542829/proj2_rnhyco.png",
  //   ],
  //   web_link: "https://www.yes-o-calaca-shs.com/",
  //   stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
  //   description:
  //     "A volunteer management system for Youth for Environment in Schools.",
  //   features: [
  //     "Built a fully functional volunteer management system with React on the frontend and Node.js with Express on the backend",
  //     "Implemented a social-media-style platform and donation features",
  //     "Created separate modules for admin and volunteer users",
  //   ],
  //   type: "Web",
  //   testAccount: ["xndrmcua22@gmail.com", "12345678"],
  // },
  // {
  //   title: "MTP Educational Assistance",
  //   banner: [
  //     "https://res.cloudinary.com/dfhhkd04c/image/upload/v1700539674/proj_1_fttl7o.png",
  //   ],
  //   web_link: "https://www.mtp-educational-assistance.com/",
  //   stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
  //   description:
  //     "An automated scholarship application system with built-in chat.",
  //   features: [
  //     "Built a fully functional scholarship assessment platform with React on the frontend and Node.js with Express on the backend",
  //     "Added real-time chat using WebSockets",
  //     "Created separate modules for admin and applicant",
  //   ],
  //   type: "Web",
  //   testAccount: ["xndrmcua22@gmail.com", "12345678"],
  // },

  // {
  //   title: "IRemember",
  //   banner: [
  //     "https://res.cloudinary.com/dfhhkd04c/image/upload/v1703333491/OWINKS1_zhzgcg.png",
  //   ],
  //   web_link: "https://www.ipetmemorial-iremember.com/",
  //   stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
  //   description:
  //     "An end-of-life planner and online pet memorial system for pet owners.",
  //   features: [
  //     "Built a fully functional social platform for pet owners, centered on pet memorials and veterinary clinic services",
  //     "Implemented service booking, blog features, and email notifications",
  //     "Created separate modules for admin, service provider, and pet owner",
  //   ],
  //   type: "Web",
  //   testAccount: ["starlight1", "starlight1"],
  // },
];
