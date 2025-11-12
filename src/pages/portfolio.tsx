import Image from "next/image";
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ExperienceSection from "@/components/Experience";
import PortfolioSection from "@/components/PortfolioSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



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

      <PortfolioSection />

      <ExperienceSection />

      <Footer />
    </div>
  );
}
