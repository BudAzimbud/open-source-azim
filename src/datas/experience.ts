export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  companyUrl?: string;
  companyLogo?: string;
  type: "full-time" | "contract" | "freelance" | "part-time";
}

export const experienceData: Experience[] = [
  {
    id: 1,
    company: "B ONE CONSULTING",
    position: "Fullstack Developer",
    location: "Bali, Indonesia",
    period: "Feb 2025 - Present",
    startDate: "2025-02",
    endDate: "present",
    isCurrent: true,
    type: "full-time",
    description:
      "Leading full-stack development for multiple enterprise clients, managing concurrent delivery of 5+ projects including LMS, e-commerce, and internal management systems.",
    responsibilities: [
      "Led concurrent delivery of 5 client projects including LMS, e-commerce, and internal management systems",
      "Engineered and implemented complex backend architectures ensuring scalability and fault tolerance",
      "Built payroll automation and project tracking systems to digitalize operational processes",
      "Integrated PayPal, Xendit, WhatsApp API, and DocuSign to automate financial and communication workflows",
      "Oversaw backend deployments, architecture decisions, and code standardization across environments",
      "Developed HRIS system with automated payroll and attendance tracking",
      "Built CRM system with lead management, sales pipeline, and automated marketing campaigns",
    ],
    technologies: [
      "ReactJS",
      "VueJS",
      "NestJS",
      "ExpressJS",
      "PostgreSQL",
      "Docker",
      "AWS",
      "PayPal API",
      "Xendit API",
      "WhatsApp API",
      "DocuSign API",
    ],
    achievements: [
      "Optimized API response time from 3 seconds to 300ms (90% faster)",
      "Reduced page load bounce rates by 20% through performance optimization",
      "Successfully delivered 5 concurrent projects on time and within budget",
      "Reduced HRIS reporting time by 70% through payroll automation",
    ],
  },
  {
    id: 2,
    company: "Self-Employed",
    position: "Freelance Fullstack Developer",
    location: "Remote",
    period: "Feb 2024 - Feb 2025",
    startDate: "2024-02",
    endDate: "2025-02",
    isCurrent: false,
    type: "freelance",
    description:
      "Delivered full-cycle development for startups and SMEs, focusing on automation, HR, and digital services. Built scalable web and mobile applications with 99% uptime.",
    responsibilities: [
      "Delivered full-cycle development for startups and SMEs, focusing on automation, HR, and digital services",
      "Architected and deployed scalable web and mobile apps using React, NestJS, PostgreSQL, and Socket.IO",
      "Maintained 99% uptime across multi-service infrastructures deployed with Docker and VPS",
      "Collaborated directly with clients to define requirements and deliver production-ready solutions",
      "Built The Plug App - multi-region marketplace for Bali, Miami/Broward, and Brazil",
      "Developed OBS Trading App with real-time trading (under 1s latency) using Socket.IO",
      "Created Eroses Portal (Malaysia) - centralized workflows with 60% faster data sync",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "Flutter",
      "NestJS",
      "ExpressJS",
      "PostgreSQL",
      "Socket.IO",
      "Docker",
      "Redis",
      "Xendit",
      "Google Maps API",
    ],
    achievements: [
      "Maintained 99% uptime across multi-service infrastructures",
      "Built real-time trading platform with under 1 second latency",
      "Improved data synchronization speed by 60% for Eroses Portal",
      "Successfully launched multi-region marketplace in 3 countries",
    ],
  },
  {
    id: 3,
    company: "IFG LIFE (Jiwasraya)",
    position: "Frontend Developer",
    location: "Jakarta, Indonesia",
    period: "Feb 2023 - Feb 2024",
    startDate: "2023-02",
    endDate: "2024-02",
    isCurrent: false,
    type: "full-time",
    companyUrl: "https://www.life.id",
    description:
      "Managed 40% of frontend development within a 3-team agile structure for insurance management platform. Led performance optimization and team mentoring initiatives.",
    responsibilities: [
      "Managed 40% of frontend development within a 3-team agile structure",
      "Enhanced performance with parallax animation and code refactoring",
      "Mentored junior developers and coordinated sprints, QA, and release planning",
      "Built policy management features with offline-first architecture",
      "Developed claims processing workflow with document upload and tracking",
      "Implemented secure authentication and authorization flows",
      "Created customer portal for policy holders to view and manage insurance",
    ],
    technologies: [
      "React Native",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "Firebase",
      "RESTful API",
    ],
    achievements: [
      "Reduced app load time from 2 seconds to under 1 second",
      "Improved UX and conversion rates through performance optimization",
      "Lowered reported UI bugs by 30% through code refactoring",
      "Achieved 4.5+ star rating on app stores",
    ],
  },
  {
    id: 4,
    company: "Walden Global Service",
    position: "Fullstack Developer",
    location: "Bandung, Indonesia",
    period: "Feb 2022 - Feb 2023",
    startDate: "2022-02",
    endDate: "2023-02",
    isCurrent: false,
    type: "full-time",
    description:
      "Delivered 6 commercial projects developing responsive web and desktop applications. Specialized in multi-platform integrations and location-based services.",
    responsibilities: [
      "Delivered 6 commercial projects, developing responsive web and desktop apps using ReactJS and Electron",
      "Engineered multi-platform integrations via GraphQL, REST, and SOAP APIs",
      "Designed scalable architecture patterns for cross-environment deployment",
      "Built location-based modules using Google Maps API for booking and real-time tracking",
      "Developed Point of Sale desktop application with inventory management",
      "Implemented offline-first architecture for unreliable internet connections",
      "Created receipt printing and barcode scanning features",
    ],
    technologies: [
      "React.js",
      "Electron",
      "Node.js",
      "GraphQL",
      "REST API",
      "SOAP API",
      "Google Maps API",
      "PostgreSQL",
    ],
    achievements: [
      "Successfully delivered 6 commercial projects on time",
      "Deployed POS system to 50+ retail locations",
      "Processed 100,000+ transactions through POS application",
      "99.9% uptime with offline-first architecture",
    ],
  },
  {
    id: 5,
    company: "Sopwer Teknologi Indonesia",
    position: "Fullstack Developer",
    location: "Bandung, Indonesia",
    period: "Oct 2021 - Feb 2022",
    startDate: "2021-10",
    endDate: "2022-02",
    isCurrent: false,
    type: "full-time",
    description:
      "Engineered Vue.js and NestJS web applications from prototype to deployment. Introduced CI/CD pipelines and best practices for improved development productivity.",
    responsibilities: [
      "Engineered Vue.js and NestJS web applications from prototype to deployment",
      "Introduced CI pipelines and best practices for team development",
      "Designed and deployed multi-tenant database architectures with AWS cloud integration",
      "Developed RESTful APIs with comprehensive documentation",
      "Implemented automated testing and deployment workflows",
      "Collaborated with cross-functional teams for requirement gathering",
      "Participated in code reviews and technical documentation",
    ],
    technologies: [
      "Vue.js",
      "NestJS",
      "PostgreSQL",
      "AWS",
      "Docker",
      "CI/CD",
      "REST API",
      "Prisma",
    ],
    achievements: [
      "Increased developer productivity by 25% through CI/CD implementation",
      "Successfully deployed multi-tenant architecture serving 100+ clients",
      "Completed Fullstack Bootcamp certification",
      "Established development best practices adopted by entire team",
    ],
  },
];

export const keyProjects = [
  {
    id: 1,
    name: "HRIS Tavia Digital",
    description: "Automated payroll and attendance tracking system",
    achievement: "Reduced reporting time by 70%",
    technologies: ["Vue.js", "Express.js", "PostgreSQL"],
  },
  {
    id: 2,
    name: "OBS Trading App",
    description: "Real-time trading platform with live market data",
    achievement: "Achieved under 1 second latency using Socket.IO",
    technologies: ["React.js", "Socket.IO", "Redis", "WebSocket"],
  },
  {
    id: 3,
    name: "Eroses Portal (Malaysia)",
    description: "Centralized workflow management system",
    achievement: "Improved data sync speed by 60%",
    technologies: ["Next.js", "NestJS", "PostgreSQL"],
  },
  {
    id: 4,
    name: "The Plug App",
    description: "Multi-region marketplace and delivery platform",
    achievement: "Launched in 3 countries (Indonesia, US, Brazil)",
    technologies: ["Flutter", "Next.js", "Express.js", "Xendit"],
  },
  {
    id: 5,
    name: "B ONE CRM",
    description: "Customer Relationship Management system",
    achievement: "Automated sales pipeline and marketing campaigns",
    technologies: ["Vue.js", "Express.js", "PostgreSQL", "DocuSign"],
  },
];

export const experienceSummary = {
  totalYears: 4,
  totalProjects: 20,
  currentPositions: 1,
  projectsDelivered: 20,
  clientSatisfaction: 99,
  technologies: [
    "ReactJS",
    "VueJS",
    "NestJS",
    "PostgreSQL",
    "ExpressJS",
    "Laravel",
    "Docker",
    "AWS",
    "TypeScript",
    "Socket.IO",
  ],
  industries: [
    "Enterprise Software",
    "Financial Services",
    "Healthcare",
    "Insurance",
    "E-commerce",
    "Education",
    "Retail",
  ],
};

export const skills = {
  frontend: [
    "ReactJS",
    "VueJS",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Material UI",
    "Redux",
    "HTML/CSS",
  ],
  mobile: ["React Native", "Flutter", "iOS", "Android"],
  backend: [
    "NestJS",
    "ExpressJS",
    "Node.js",
    "Laravel",
    "REST API",
    "GraphQL",
    "Socket.IO",
    "SOAP API",
  ],
  database: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "MySQL"],
  devops: ["Docker", "AWS", "Azure", "CI/CD", "Linux", "Git", "Nginx"],
  integration: [
    "PayPal",
    "Xendit",
    "WhatsApp API",
    "DocuSign",
    "Google Maps API",
  ],
  languages: ["JavaScript", "TypeScript", "GoLang"],
};

export const certifications = [
  {
    id: 1,
    name: "NodeJS Developer",
    issuer: "HackerRank",
    year: "2023",
  },
  {
    id: 2,
    name: "Fullstack Bootcamp",
    issuer: "Sopwer Teknologi Indonesia",
    year: "2021",
  },
];

export const softSkills = [
  "Agile & Scrum",
  "Team Leadership",
  "Cross-Functional Collaboration",
  "Problem Solving",
  "Client Communication",
];
