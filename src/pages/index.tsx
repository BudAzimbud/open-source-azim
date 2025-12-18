import Image from "next/image";
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ExperienceSection from "@/components/Experience";
import PortfolioSection from "@/components/PortfolioSection";
import { skills, certifications } from "@/datas/experience";

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
    title: "API & Automation Systems",
    description:
      "Designing robust APIs, real-time synchronization, and automation for SaaS, fintech, and enterprise apps.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&crop=center",
    icon: "🔗",
  },
  {
    id: 2,
    title: "Fullstack Web & Mobile Apps",
    description:
      "Building scalable web/mobile solutions with React, Vue, NestJS, PostgreSQL, and Docker.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
    icon: "💻",
  },
  {
    id: 3,
    title: "Third-Party Integrations",
    description:
      "Integrating PayPal, Xendit, WhatsApp API, DocuSign, Google Maps, and more for business automation.",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=600&fit=crop&crop=center",
    icon: "🔌",
  },
  {
    id: 4,
    title: "Cloud & DevOps",
    description:
      "Optimizing deployments, CI/CD, and cloud infrastructure (AWS, Docker, Linux) for high uptime.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=center",
    icon: "☁️",
  },
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
      <div className="relative bg-[#0F0F0F] min-h-screen overflow-hidden">
        {/* Background Images with Transition */}
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1200 ease-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
          />
        ))}

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-[#0F0F0F]/60 transition-opacity duration-600 ${
            isAnimating ? "opacity-20" : "opacity-100"
          }`}
        ></div>

        {/* Content */}
        <div
          className={`relative z-10 flex items-center justify-center min-h-screen p-8 transition-all duration-800 ${
            isAnimating
              ? "opacity-50 transform scale-95"
              : "opacity-100 transform scale-100"
          }`}
        >
          <div className="max-w-7xl w-full">
            {/* Left Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 bg-[#F3F4F6]/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                    <span className="w-2 h-2 bg-[#FACC15] rounded-full animate-pulse"></span>
                    <span className="text-[#F3F4F6]">
                      Available for new projects
                    </span>
                  </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-light leading-tight text-[#F3F4F6]">
                  AZIM{" "}
                  <span className="font-normal text-[#FACC15]">
                    — Fullstack Developer
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-[#F3F4F6]/80 leading-relaxed max-w-2xl">
                  Fullstack Developer with hands-on experience building and
                  maintaining production-grade web and mobile applications
                  across fintech, HRIS, fitness, and healthcare industries.
                  Proficient in TypeScript, NestJS, REST APIs, PostgreSQL, and
                  MongoDB, with proven experience integrating third-party
                  services, payment gateways, and cloud infrastructure. Strong
                  in translating business requirements into scalable,
                  maintainable solutions and collaborating with cross-functional
                  teams to deliver high-impact products.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <a
                    href="#footer"
                    className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0F0F0F] px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform text-lg block text-center"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    Contact Me
                  </a>
                  <a
                    href="#footer"
                    className="border border-[#F3F4F6]/30 hover:border-[#FACC15] hover:bg-[#FACC15]/10 text-[#F3F4F6] px-8 py-4 rounded-xl font-medium transition-all duration-300 text-lg block text-center"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    Download CV
                  </a>
                </div>
              </div>

              {/* Right Content - Interactive Service Cards */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div
                      key={service.id}
                      onClick={() => handleCardClick(index)}
                      className={`bg-[#F3F4F6]/10 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:bg-[#FACC15]/20 hover:scale-105 hover:-translate-y-2 border border-[#F3F4F6]/20 ${
                        index === currentSlide
                          ? "ring-2 ring-[#FACC15] bg-[#FACC15]/20"
                          : ""
                      }`}
                    >
                      <div className="text-3xl mb-3">{service.icon}</div>
                      <h3 className="text-[#F3F4F6] font-semibold mb-2 text-lg">
                        {service.title}
                      </h3>
                      <p className="text-[#F3F4F6]/70 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#FACC15]/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#FACC15]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PortfolioSection />

      {/* Skills Section */}
      <section className="bg-[#0F0F0F] py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-[#FACC15]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FACC15 0%, #FACC15 50%, #FACC15 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="bg-[#0F0F0F] border border-[#FACC15]/30 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-3 capitalize text-[#FACC15]">
                  {category}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((skill: string) => (
                    <li
                      key={skill}
                      className="bg-[#FACC15]/10 text-green border border-[#FACC15]/30 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExperienceSection />

      {/* Certification Section */}
      <section className="py-20 bg-[#0F0F0F] text-[#F3F4F6]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#FACC15]">
            Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#0F0F0F] border border-[#FACC15]/30 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-[#FACC15] mb-2">
                  {cert.name}
                </h3>
                <div className="text-[#F3F4F6]/80 text-sm mb-1">
                  {cert.issuer}
                </div>
                <div className="text-[#F3F4F6]/50 text-xs">{cert.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
