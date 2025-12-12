export interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  categoryColor: string;
  year: string;
  image?: string | string[];
  tags: string[];
  link?: string;
  technologies: string[];
  company?: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 0,
    slug: "the-plug-app",
    company: "B ONE CONSULTING",
    title: "The Plug App - Multi-Region Deals & Delivery Platform",
    description:
      "Cross-platform mobile application offering deals and discounts in Bali, food/goods delivery in Miami and Broward (US), and gym membership management in Brazil. Integrated payment gateway and real-time order tracking.",
    category: "marketplace",
    categoryLabel: "Marketplace",
    categoryColor: "orange",
    year: "2025",
    image: "/project/theplugapp.png",
    tags: ["E-commerce", "Delivery", "Mobile App", "Multi-Region"],
    link: "https://theplugapp.com",
    technologies: ["Flutter", "Next.js", "Express.js", "Xendit"],
  },
  {
    id: 1,
    slug: "natalielejeune-lms",
    company: "B ONE CONSULTING",
    title: "Natalielejeune Osteopathy - Learning Management System",
    description:
      "Comprehensive LMS platform with course management, student tracking, assignments, and interactive learning tools for educational institutions.",
    category: "education",
    categoryLabel: "Education",
    categoryColor: "pink",
    year: "2025",
    image: "/project/natalie.png",
    tags: ["LMS", "Education", "E-Learning"],
    technologies: ["ReactJS", "Node.js", "PostgreSQL", "PayPal"],
    link: "https://www.natalielejeuneosteopathy.com/",
  },

  {
    id: 2,
    slug: "bone-crm",
    company: "B ONE CONSULTING",
    title: "B ONE - Customer Relationship Management",
    description:
      "Advanced CRM system with lead management, sales pipeline, customer analytics, and automated marketing campaigns for growing businesses.",
    category: "enterprise",
    categoryLabel: "Enterprise",
    categoryColor: "green",
    year: "2024",
    image: [
      "/project/bonecrm.png",
      "/project/bonecrm2.png",
      "/project/bonecrm3.png",
      "/project/bonecrm4.png",
      "/project/bonecrm5.png",
      "/project/bonecrm6.png",
    ],
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
    company: "IFG LIFE (Jiwasraya)",
    title: "Life Id - Insurance Management System",
    description:
      "Complete insurance platform with policy management, claims processing, customer portal, and automated underwriting for insurance companies.",
    category: "insurance",
    categoryLabel: "Insurance",
    categoryColor: "purple",
    year: "2023",
    image: "/project/lifeid.png",
    tags: ["Insurance", "FinTech", "Claims"],
    link: "https://www.life.id",
    technologies: ["React Native", "NextJS", "Tailwind CSS", "Redux Saga"],
  },
  {
    id: 4,
    slug: "dimedika-medical-record",
    company: "Freelance",
    title: "Dimedika - Medical Record System",
    description:
      "Secure electronic health records system with patient management, appointment scheduling, and medical history tracking for healthcare providers.",
    category: "healthcare",
    categoryLabel: "Healthcare",
    categoryColor: "red",
    year: "2024",
    image: "/project/dimedika.png",
    tags: ["Healthcare", "EHR", "Medical"],
    link: "https://dimedika.id",
    technologies: ["Next.js", "Node.js", "MongoDB", "SHADCN UI"],
  },
  {
    id: 5,
    slug: "bone-hris",
    company: "B ONE CONSULTING",
    title: "B ONE - Human Resource Information System",
    description:
      "Comprehensive HRIS with employee management, payroll processing, performance tracking, and recruitment workflows for modern organizations.",
    category: "hr",
    categoryLabel: "HR",
    categoryColor: "indigo",
    year: "2025",
    image: [
      "/project/bonehris.png",
      "/project/bonehris2.png",
      "/project/bonehris4.png",
      "/project/bonehris5.png",
      "/project/bonehris6.png",
      "/project/bonehris7.png",
      "/project/bonehris9.png",
    ],
    tags: ["HRIS", "HR", "Payroll"],
    technologies: [
      "Vue.js",
      "ExpressJS",
      "PostgreSQL",
      "CronJob",
      "PlopJS",
      "AWS",
    ],
  },
  {
    id: 6,
    slug: "obs-investment",
    company: "Freelance",
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
    company: "Walden Global Service",
    title: "Sandbox Point of Sale",
    image: "/project/sandboxpos.jpeg",
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
    company: "Personal Project",
    title: "msteams-azim — Microsoft Teams API Wrapper (NPM)",
    description:
      "Open-source Node.js package for seamless integration with Microsoft Teams APIs, enabling bots, messaging, and automation for business workflows.",
    category: "opensource",
    categoryLabel: "Open Source",
    categoryColor: "pink",
    image: "/project/npm.png",
    year: "2025",
    tags: ["NPM", "Microsoft Teams", "API", "Open Source"],
    link: "https://www.npmjs.com/package/msteams-azim",
    technologies: ["Node.js", "TypeScript", "Microsoft Teams API"],
  },
  {
    id: 9,
    slug: "docusign-azim",
    company: "Personal Project",
    title: "docusign-azim — DocuSign API Wrapper (NPM)",
    description:
      "Node.js package for DocuSign API integration, simplifying e-signature workflows and document automation for web and enterprise apps.",
    category: "opensource",
    categoryLabel: "Open Source",
    categoryColor: "black",
    year: "2025",
    image: "/project/npm.png",
    tags: ["NPM", "DocuSign", "API", "Open Source"],
    link: "https://www.npmjs.com/package/docusign-azim",
    technologies: ["Node.js", "TypeScript", "DocuSign API"],
  },
  {
    id: 10,
    slug: "tweakmove-pos",
    company: "Walden Global Service",
    title: "TweakMove Desktop - Point of Sale System",
    image: "/project/tweakmove.jpeg",
    description:
      "Desktop POS application built with Electron for cross-platform compatibility. Features real-time inventory tracking, sales reporting, customer management, and offline-first architecture for uninterrupted retail operations.",
    category: "retail",
    categoryLabel: "Retail",
    categoryColor: "red",
    year: "2022",
    tags: ["POS", "Desktop App", "Inventory", "Offline-First"],
    technologies: ["ReactJS", "Electron", "NodeJS"],
  },
  {
    id: 11,
    slug: "fishlog-wms",
    company: "Walden Global Service",
    title: "Fishlog WMS - Warehouse Management System",
    image: "/project/fishlogwms.jpeg",
    description:
      "Comprehensive warehouse management system for seafood distribution. Handles inventory tracking, order fulfillment, cold storage monitoring, shipment logistics, and real-time stock level alerts for efficient warehouse operations.",
    category: "logistics",
    categoryLabel: "Logistics",
    categoryColor: "black",
    year: "2022",
    tags: ["WMS", "Warehouse", "Logistics", "Inventory"],
    technologies: ["ReactJS", "Bootstrap", "NodeJS", "PostgreSQL"],
  },
  {
    id: 12,
    slug: "myspace-web",
    company: "PT Sopwer Teknologi Indonesia",
    title: "Keep My Space - Property & Tenant Management",
    image: "/project/myspace.jpeg",
    description:
      "Comprehensive property management platform for managing rental properties, tenant information, lease agreements, payment tracking, and maintenance requests. Streamlines communication between property owners and tenants.",
    category: "proptech",
    categoryLabel: "PropTech",
    categoryColor: "cyan",
    year: "2021",
    tags: ["Property Management", "Tenant", "Real Estate", "Web App"],
    technologies: ["ReactJS", "Node.js", "MongoDB", "Nest.js"],
  },
  {
    id: 13,
    slug: "sherpa",
    company: "PT Sopwer Teknologi Indonesia",
    title: "Sherpa - Product Demand Forecasting System",
    image: "/project/sherpa.jpeg",
    description:
      "Advanced forecasting system using machine learning to predict product demand, optimize inventory levels, and improve supply chain efficiency. Analyzes historical data, market trends, and seasonal patterns for accurate predictions.",
    category: "analytics",
    categoryLabel: "Analytics",
    categoryColor: "purple",
    year: "2022",
    tags: ["Forecasting", "Machine Learning", "Analytics", "Supply Chain"],
    technologies: ["ReactJS", "Python", "TensorFlow", "Node.js", "PostgreSQL"],
  },
  {
    id: 14,
    slug: "sakeena",
    company: "PT Sopwer Teknologi Indonesia",
    title: "Shakeena - Online Kids Book Store",
    image: "/project/sakeena.png",
    description:
      "E-commerce platform specializing in children's books and educational materials. Features age-appropriate book recommendations, curated collections, secure payment gateway, and user-friendly interface for parents to discover quality reading materials for kids.",
    link: "https://shop.sakeenafamily.com/",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    categoryColor: "orange",
    year: "2023",
    tags: ["E-commerce", "Kids", "Books", "Education"],
    technologies: ["ReactJS", "Node.js", "React Native", "Frappe"],
  },
  {
    id: 15,
    slug: "eroses",
    company: "Freelance",
    title: "Eroses",
    image: "/project/eroses.png",
    description:
      "EROSES is an electronic system for the registration and affairs of associations in Malaysia managed by the Registrar of Societies Malaysia (JPPM), and it is undergoing a temporary shutdown for data synchronization work ahead of the end of 2025",
    link: "https://www.eroses.gov.my/login/",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    categoryColor: "orange",
    year: "2024",
    tags: ["E-commerce", "Kids", "Books", "Education"],
    technologies: ["RefineJS", "ReactJS", "Material UI"],
  },
  {
    id: 16,
    slug: "hygearfit",
    company: "Freelance",
    title: "Hygearfit",
    image: "/project/hygearfit.png",
    description:
      "App for recommendation engine leverages real-time performance data and feedback to deliver insights and personalized workout routines. Offering a variety of training modes and over 10 parameters for tailored activities, our tech ensures users can track progress in calories, weight, power, speed, and more, creating a science-backed, results-driven fitness journey",
    link: "https://hygearfit.com/",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    categoryColor: "orange",
    year: "2023",
    tags: ["E-commerce", "Kids", "Books", "Education"],
    technologies: ["ExpressJS", "Mongoose", "MongoDB", "Big Query", "Redis"],
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
