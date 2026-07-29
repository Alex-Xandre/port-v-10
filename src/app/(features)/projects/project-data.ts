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
  github?: string;
};

export const PROJECT_DATA: ProjectEntry[] = [
  {
    title: "ELMS",
    banner: [
      "https://res.cloudinary.com/dn9zkhies/image/upload/v1785326880/test_xciufd.png",
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1753859077/els-1_eiecqj.png",
    ],
    web_link: "https://e-learning-two-opal.vercel.app/",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    description:
      "A full-featured e-commerce and event learning management system for selling educational event products and managing student engagement, with integrated payments.",
    features: [
      "Module creation and management",
      "Interactive quizzes and assessments",
      "Automatic quiz scoring and feedback",
      "Student profile and progress tracking",
      "Role-based access (admin, instructor, student)",
      "Secure payment integration for course and event purchases",
      "Event scheduling and calendar system",
      "Admin dashboard with analytics",
    ],
    type: "Web",
    testAccount: ["2", "1"],
    github: "https://github.com/Alex-Xandre/els.git",
  },
  {
    title: "Membo",
    banner: [
      "https://res.cloudinary.com/dnhka2l80/image/upload/v1742269695/membo_zbz5be.png",
    ],
    web_link: "https://membo-nine.vercel.app/",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    description:
      "An e-commerce platform focused on event management products, with payment integrations.",
    features: [],
    type: "Web",
    github: "https://github.com/Alex-Xandre/membo",
  },
  {
    title: "Anywear Fashion",
    banner: [
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1744296663/anywear_vsoky7.png",
    ],
    web_link: "https://www.anywear-fashion-trading.com/",
    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Tailwind CSS",
      "React Native",
    ],
    description:
      "An HR management system handling HR tasks and progress quotas, with a companion mobile app.",
    features: [],
    type: "Web · Mobile",
  },
  {
    title: "Planteria",
    banner: [
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1700539674/proj_1_fttl7o.png",
    ],
    web_link: "https://bukal-garden-planteria.store/",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    description:
      "An e-commerce store for plant products, with payment integrations.",
    features: [
      "Built a fully functional e-commerce app for plant selling with React on the frontend and Node.js with Express on the backend",
      "Implemented an inventory system and payment integrations",
      "Created separate modules for seller, admin, and user",
    ],
    type: "Web",
    testAccount: ["xndrmcua22@gmail.com", "12345678"],
  },
  {
    title: "DineEase",
    banner: [
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1690989227/proj-3-removebg-preview_yrzyse_1_iytqvm.png",
    ],
    web_link: "https://dineease-8pbh.onrender.com/",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    description: "A restaurant management system for a samgyupsal business.",
    features: [
      "Built a fully functional restaurant app for a samgyupsal business with React on the frontend and Node.js with Express on the backend",
      "Implemented an inventory system, payment integrations, and real-time ordering",
      "Created separate modules for admin, customers, kitchen, and cashier",
    ],
    type: "Web",
    testAccount: ["T1", "customer"],
  },
  {
    title: "Yes-O Calaca",
    banner: [
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1700542829/proj2_rnhyco.png",
    ],
    web_link: "https://www.yes-o-calaca-shs.com/",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    description:
      "A volunteer management system for Youth for Environment in Schools.",
    features: [
      "Built a fully functional volunteer management system with React on the frontend and Node.js with Express on the backend",
      "Implemented a social-media-style platform and donation features",
      "Created separate modules for admin and volunteer users",
    ],
    type: "Web",
    testAccount: ["xndrmcua22@gmail.com", "12345678"],
  },
  {
    title: "MTP Educational Assistance",
    banner: [
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1700539674/proj_1_fttl7o.png",
    ],
    web_link: "https://www.mtp-educational-assistance.com/",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    description:
      "An automated scholarship application system with built-in chat.",
    features: [
      "Built a fully functional scholarship assessment platform with React on the frontend and Node.js with Express on the backend",
      "Added real-time chat using WebSockets",
      "Created separate modules for admin and applicant",
    ],
    type: "Web",
    testAccount: ["xndrmcua22@gmail.com", "12345678"],
  },
  {
    title: "AS Glass & Aluminum",
    banner: [
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1691459923/OT12YY1_wgu70c.png",
    ],
    web_link: "https://glass-aluminum.onrender.com/",
    stack: ["MongoDB", "Express", "React", "Node.js", "Styled Components"],
    description:
      "An e-commerce platform for a glass and aluminum business in the Philippines.",
    features: [
      "Built a fully functional e-commerce app for a hardware business with React on the frontend and Node.js with Express on the backend",
      "Implemented an inventory system, payment integrations, and service booking",
      "Created separate modules for admin and customer",
    ],
    type: "Web",
    testAccount: ["xndrmcua22@gmail.com", "xndrmcua22@gmail.com"],
  },
  {
    title: "IRemember",
    banner: [
      "https://res.cloudinary.com/dfhhkd04c/image/upload/v1703333491/OWINKS1_zhzgcg.png",
    ],
    web_link: "https://www.ipetmemorial-iremember.com/",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    description:
      "An end-of-life planner and online pet memorial system for pet owners.",
    features: [
      "Built a fully functional social platform for pet owners, centered on pet memorials and veterinary clinic services",
      "Implemented service booking, blog features, and email notifications",
      "Created separate modules for admin, service provider, and pet owner",
    ],
    type: "Web",
    testAccount: ["starlight1", "starlight1"],
  },
];
