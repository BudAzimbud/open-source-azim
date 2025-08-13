import Image from "next/image";
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Portfolio data with categories
const portfolioData = [
  {
    id: 1,
    category: "Web Development",
    title: "Learning Management System",
    description: "Comprehensive LMS platform with course management, student tracking, assignments, and interactive learning tools for educational institutions.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2024",
    categoryColor: "blue",
    categoryLabel: "Education"
  },
  {
    id: 2,
    category: "Web Development", 
    title: "Customer Relationship Management",
    description: "Advanced CRM system with lead management, sales pipeline, customer analytics, and automated marketing campaigns for growing businesses.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&crop=center",
    tags: ["Vue.js", "Laravel", "MySQL"],
    year: "2023",
    categoryColor: "green",
    categoryLabel: "Enterprise"
  },
  {
    id: 3,
    category: "Web Development",
    title: "Insurance Management System", 
    description: "Complete insurance platform with policy management, claims processing, customer portal, and automated underwriting for insurance companies.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&crop=center",
    tags: ["Angular", "Spring Boot", "PostgreSQL"],
    year: "2022",
    categoryColor: "purple",
    categoryLabel: "Insurance"
  },
  {
    id: 4,
    category: "Web Development",
    title: "Regional Business Development",
    description: "Strategic business development platform with market analysis, partnership management, and growth tracking for regional expansion initiatives.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
    tags: ["React", "Django", "Redis"],
    year: "2021",
    categoryColor: "orange", 
    categoryLabel: "Business"
  },
  {
    id: 5,
    category: "Mobile Apps",
    title: "Medical Record System",
    description: "Secure electronic health records system with patient management, appointment scheduling, and medical history tracking for healthcare providers.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&crop=center",
    tags: ["Next.js", "Node.js", "MongoDB"],
    year: "2025",
    categoryColor: "pink",
    categoryLabel: "Healthcare"
  },
  {
    id: 6,
    category: "Web Development",
    title: "Human Resource Information System",
    description: "Comprehensive HRIS with employee management, payroll processing, performance tracking, and recruitment workflows for modern organizations.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&crop=center",
    tags: ["Vue.js", "PHP", "MySQL"],
    year: "2023",
    categoryColor: "indigo",
    categoryLabel: "HR"
  },
  {
    id: 7,
    category: "E-commerce",
    title: "Investment Management Platform",
    description: "Advanced investment platform with portfolio management, real-time market data, risk analysis, and automated trading strategies for investors.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&crop=center",
    tags: ["React", "Python", "PostgreSQL"],
    year: "2022",
    categoryColor: "emerald",
    categoryLabel: "FinTech"
  },
  {
    id: 8,
    category: "E-commerce",
    title: "Cryptocurrency Exchange",
    description: "Secure cryptocurrency exchange platform with spot trading, futures, staking, and wallet management with advanced security features.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop&crop=center",
    tags: ["Angular", "Node.js", "Redis"],
    year: "2021",
    categoryColor: "yellow",
    categoryLabel: "Crypto"
  },
  {
    id: 9,
    category: "Mobile Apps",
    title: "Sandbox Point of Sale",
    description: "Modern POS system with inventory management, sales analytics, customer loyalty programs, and multi-payment gateway integration for retail businesses.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    tags: ["Vue.js", "Laravel", "MySQL"],
    year: "2024",
    categoryColor: "teal",
    categoryLabel: "Retail"
  }
];

const services = [
  {
    id: 1,
    title: "Custom Software Development",
    description: "Build powerful web and mobile applications tailored to your business needs",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&crop=center",
    icon: "💻"
  },
  {
    id: 2,
    title: "E-commerce Solutions",
    description: "Create stunning online stores that convert visitors into customers",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
    icon: "🛍️"
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Design beautiful, intuitive interfaces that users love to interact with",
    image: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop&crop=center",
    icon: "🎨"
  },
  {
    id: 4,
    title: "Digital Transformation",
    description: "Modernize your business processes with cutting-edge technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&crop=center",
    icon: "🚀"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Projects");

  // Filter portfolio items based on active filter
  const filteredPortfolio = activeFilter === "All Projects" 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeFilter);

  const handleCardClick = (index: number) => {
    const newSlide = (currentSlide + index) % services.length;
    
    if (newSlide !== currentSlide) {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentSlide(newSlide);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Auto-change slides
  useState(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Images with Transition */}
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1200 ease-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
            style={{
              backgroundImage: `url('${service.image.replace('w=800&h=600', 'w=1920&h=1080')}')`
            }}
          />
        ))}
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-600 ${
          isAnimating ? 'opacity-20' : 'opacity-100'
        }`}></div>
        
        {/* Content */}
        <div className={`relative z-10 flex items-center justify-center min-h-screen p-8 transition-all duration-800 ${
          isAnimating ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'
        }`}>
          <div className="max-w-7xl w-full">
            {/* Left Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>Available for new projects</span>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-light leading-tight">
                  Hi, I'm <span className="text-blue-400 font-normal">Azim</span>
                  <br />
                  <span className="text-3xl md:text-4xl text-gray-300">
                    I build amazing things for the web
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  I'm a full-stack developer who loves turning complex problems into simple, beautiful designs. 
                  Currently helping businesses grow through thoughtful technology.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform text-lg">
                    Let's work together
                  </button>
                  <button className="border border-white/30 hover:border-white/50 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 text-lg">
                    See my work
                  </button>
                </div>
              </div>

              {/* Right Content - Interactive Service Cards */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div
                      key={service.id}
                      onClick={() => handleCardClick(index)}
                      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2 border border-white/20 ${
                        index === currentSlide ? 'ring-2 ring-blue-400 bg-white/20' : ''
                      }`}
                    >
                      <div className="text-3xl mb-3">{service.icon}</div>
                      <h3 className="text-white font-semibold mb-2 text-lg">{service.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              My Recent Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every project tells a story. Here are some of my favorites from the past year
            </p>
          </div>

          {/* Portfolio Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["All Projects", "Web Development", "Mobile Apps", "E-commerce", "Branding"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      item.categoryColor === 'blue' ? 'text-blue-600 bg-blue-50' :
                      item.categoryColor === 'green' ? 'text-green-600 bg-green-50' :
                      item.categoryColor === 'purple' ? 'text-purple-600 bg-purple-50' :
                      item.categoryColor === 'orange' ? 'text-orange-600 bg-orange-50' :
                      item.categoryColor === 'pink' ? 'text-pink-600 bg-pink-50' :
                      item.categoryColor === 'indigo' ? 'text-indigo-600 bg-indigo-50' :
                      item.categoryColor === 'emerald' ? 'text-emerald-600 bg-emerald-50' :
                      item.categoryColor === 'yellow' ? 'text-yellow-600 bg-yellow-50' :
                      'text-teal-600 bg-teal-50'
                    }`}>
                      {item.categoryLabel}
                    </span>
                    <span className="text-sm text-gray-500">{item.year}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-300 hover:scale-105 transform">
              Load More Projects
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
