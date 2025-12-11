export interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  categoryColor: string;
  year: string;
  image?: string;
  tags: string[];
  link?: string;
  technologies: string[];
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 0,
    slug: "the-plug-app",
    title: "The Plug App - Multi-Region Deals & Delivery Platform",
    description:
      "Cross-platform mobile application offering deals and discounts in Bali, food/goods delivery in Miami and Broward (US), and gym membership management in Brazil. Integrated payment gateway and real-time order tracking.",
    category: "marketplace",
    categoryLabel: "Marketplace",
    categoryColor: "orange",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=600&h=400&fit=crop&crop=center",
    tags: ["E-commerce", "Delivery", "Mobile App", "Multi-Region"],
    link: "https://theplugapp.com",
    technologies: ["Flutter", "Next.js", "Express.js", "Xendit"],
  },
  {
    id: 1,
    slug: "natalielejeune-lms",
    title: "Natalielejeune Osteopathy - Learning Management System",
    description:
      "Comprehensive LMS platform with course management, student tracking, assignments, and interactive learning tools for educational institutions.",
    category: "education",
    categoryLabel: "Education",
    categoryColor: "blue",
    year: "2025",
    tags: ["LMS", "Education", "E-Learning"],
    technologies: ["ReactJS", "Node.js", "PostgreSQL", "PayPal"],
    link: "https://www.natalielejeuneosteopathy.com/",
  },

  {
    id: 2,
    slug: "bone-crm",
    title: "B ONE - Customer Relationship Management",
    description:
      "Advanced CRM system with lead management, sales pipeline, customer analytics, and automated marketing campaigns for growing businesses.",
    category: "enterprise",
    categoryLabel: "Enterprise",
    categoryColor: "green",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&crop=center",
    tags: ["CRM", "Sales", "Enterprise"],
    technologies: [
      "Vue.js",
      "ExpressJS",
      "PostgreSQL",
      "DocuSign",
      "Microsoft Calendar",
    ],
  },
  {
    id: 3,
    slug: "life-id-insurance",
    title: "Life Id - Insurance Management System",
    description:
      "Complete insurance platform with policy management, claims processing, customer portal, and automated underwriting for insurance companies.",
    category: "insurance",
    categoryLabel: "Insurance",
    categoryColor: "purple",
    year: "2024",
    tags: ["Insurance", "FinTech", "Claims"],
    link: "https://www.life.id",
    technologies: ["React Native", "NextJS", "Tailwind CSS"],
  },
  {
    id: 4,
    slug: "dimedika-medical-record",
    title: "Dimedika - Medical Record System",
    description:
      "Secure electronic health records system with patient management, appointment scheduling, and medical history tracking for healthcare providers.",
    category: "healthcare",
    categoryLabel: "Healthcare",
    categoryColor: "blue",
    year: "2024",
    tags: ["Healthcare", "EHR", "Medical"],
    link: "https://dimedika.id",
    technologies: ["Next.js", "Node.js", "MongoDB"],
  },
  {
    id: 5,
    slug: "bone-hris",
    title: "B ONE - Human Resource Information System",
    description:
      "Comprehensive HRIS with employee management, payroll processing, performance tracking, and recruitment workflows for modern organizations.",
    category: "hr",
    categoryLabel: "HR",
    categoryColor: "indigo",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&crop=center",
    tags: ["HRIS", "HR", "Payroll"],
    technologies: ["Vue.js", "ExpressJS", "PostgreSQL"],
  },
  {
    id: 6,
    slug: "obs-investment",
    title: "OBS - Investment Management Platform",
    description:
      "Advanced investment platform with portfolio management, real-time market data, risk analysis, and automated trading strategies for investors.",
    category: "fintech",
    categoryLabel: "FinTech",
    categoryColor: "green",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&crop=center",
    tags: ["Investment", "Trading", "Finance"],
    technologies: ["ReactJS", "PlopJS", "Material UI", "Micro frontend"],
  },
  {
    id: 7,
    slug: "sandbox-pos",
    title: "Sandbox Point of Sale",
    description:
      "Modern POS system with inventory management, sales analytics, customer loyalty programs, and multi-payment gateway integration for retail businesses.",
    category: "retail",
    categoryLabel: "Retail",
    categoryColor: "red",
    year: "2022",
    tags: ["POS", "Retail", "Inventory"],
    technologies: ["ReactJS", "Electron", "NodeJS"],
  },
  {
    id: 8,
    slug: "msteams-azim",
    title: "msteams-azim — Microsoft Teams API Wrapper (NPM)",
    description:
      "Open-source Node.js package for seamless integration with Microsoft Teams APIs, enabling bots, messaging, and automation for business workflows.",
    category: "opensource",
    categoryLabel: "Open Source",
    categoryColor: "blue",
    year: "2025",
    tags: ["NPM", "Microsoft Teams", "API", "Open Source"],
    link: "https://www.npmjs.com/package/msteams-azim",
    technologies: ["Node.js", "TypeScript", "Microsoft Teams API"],
  },
  {
    id: 9,
    slug: "docusign-azim",
    title: "docusign-azim — DocuSign API Wrapper (NPM)",
    description:
      "Node.js package for DocuSign API integration, simplifying e-signature workflows and document automation for web and enterprise apps.",
    category: "opensource",
    categoryLabel: "Open Source",
    categoryColor: "blue",
    year: "2025",
    tags: ["NPM", "DocuSign", "API", "Open Source"],
    link: "https://www.npmjs.com/package/docusign-azim",
    technologies: ["Node.js", "TypeScript", "DocuSign API"],
  },
];

export const portfolioCategories = [
  { id: "all", name: "All Projects", color: "gray" },
  { id: "web", name: "Web Development", color: "blue" },
  { id: "mobile", name: "Mobile Apps", color: "green" },
  { id: "ecommerce", name: "E-commerce", color: "purple" },
  { id: "enterprise", name: "Enterprise", color: "indigo" },
];

export const portfolioStats = {
  projectsDelivered: 150,
  clientSatisfaction: 95,
  industriesServed: 25,
  yearsExperience: 5,
};

export const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Vue.js", icon: "💚" },
  { name: "Angular", icon: "🅰️" },
  { name: "Node.js", icon: "📗" },
  { name: "Laravel", icon: "🔴" },
  { name: "Django", icon: "🐍" },
];
