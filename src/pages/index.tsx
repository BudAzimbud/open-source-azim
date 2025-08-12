import Image from "next/image";
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";

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
    name: "Virtual Assistant",
    category: "AI Services",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center",
    description: "I help entrepreneurs like you reclaim their time. Let me handle the routine stuff while you focus on growing your business and living your life.",
  },
  {
    id: 2,
    name: "Quality Assurance",
    category: "Testing Services",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&crop=center",
    description: "I've broken countless apps (on purpose!) so yours won't break when it matters. Your users will thank you later.",
  },
  {
    id: 3,
    name: "Web Development",
    category: "Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=center",
    description: "I build websites that actually work and look amazing. No cookie-cutter templates here - just custom solutions that fit you perfectly.",
  },
  {
    id: 4,
    name: "Digital Marketing",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    description: "I help you get noticed online without being annoying. Real strategies that bring real customers, not just vanity metrics.",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = (index: number) => {
    const newSlide = (currentSlide + index) % services.length;
    
    if (newSlide !== currentSlide) {
      setIsAnimating(true);
      
      // Start animation immediately
      setCurrentSlide(newSlide);
      
      // Reset animation state after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 1200);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const getVisibleServices = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentSlide + i) % services.length;
      visible.push(services[index]);
    }
    return visible;
  };

  const currentService = services[currentSlide];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
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
                <h1 className="text-6xl md:text-7xl font-light tracking-wide transition-all duration-500">
                  {currentService.name}
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-md transition-all duration-500">
                  {currentService.description}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-8 py-3 rounded-lg text-white font-medium">
                  Get Started
                </button>
              </div>

              {/* Slider Section */}
              <div className="relative">
                {/* Cards Container */}
                <div className="flex gap-4 overflow-hidden">
                  {getVisibleServices().map((service, index) => {
                    const isMainCard = index === 0;
                    const isAnimatingCard = isAnimating && isMainCard;
                    
                    return (
                      <div
                        key={`${service.id}-${index}`}
                        onClick={() => handleCardClick(index)}
                        className={`
                          relative rounded-2xl overflow-hidden cursor-pointer group
                          ${isMainCard 
                            ? 'w-80 h-96 opacity-100 ring-white/30' 
                            : 'w-48 h-64 opacity-70 hover:opacity-90'
                          }
                          ${isAnimatingCard
                            ? 'transition-all duration-1200 ease-out transform  z-50'
                            : 'transition-all duration-700 transform hover:scale-105'
                          }
                        `}
                      >
                        {/* Card Image */}
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className={`
                            object-cover
                            ${isAnimatingCard
                              ? 'transition-transform duration-1200 ease-out scale-110'
                              : 'transition-transform duration-700 group-hover:scale-110'
                            }
                          `}
                        />
                        
                        {/* Animation Overlay */}
                        {isAnimatingCard && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                        )}
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* Card Content */}
                        <div className={`
                          absolute bottom-4 left-4 text-white transition-all duration-500
                          ${isAnimatingCard 
                            ? 'opacity-0 transform translate-y-4' 
                            : 'opacity-100 transform translate-y-0'
                          }
                        `}>
                          <h3 className={`
                            font-semibold transition-all duration-300
                            ${isMainCard ? 'text-xl' : 'text-lg'}
                          `}>
                            {service.name}
                          </h3>
                          <p className={`
                            text-white/80 transition-all duration-300
                            ${isMainCard ? 'text-sm' : 'text-xs'}
                          `}>
                            {service.category}
                          </p>
                        </div>
                        
                        {/* Active Indicator */}
                        {isMainCard && !isAnimating && (
                          <div className="absolute top-4 right-4">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                          </div>
                        )}
                        
                        {/* Hover Zoom Indicator */}
                        {!isMainCard && !isAnimating && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Arrows */}
                <div className={`flex gap-3 mt-6 justify-center lg:justify-start transition-all duration-500 ${
                  isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}>
                  <button
                    onClick={prevSlide}
                    disabled={isAnimating}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={isAnimating}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Slide Indicators */}
                <div className={`flex gap-2 mt-4 justify-center lg:justify-start transition-all duration-500 ${
                  isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}>
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      disabled={isAnimating}
                      className={`rounded-full transition-all duration-300 hover:scale-125 disabled:opacity-50 ${
                        index === currentSlide 
                          ? 'bg-white w-8 h-2' 
                          : 'bg-white/40 w-2 h-2 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why I Do What I Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              After 8 years in corporate tech, I started this journey to help real people solve real problems. Here's what makes working with me different
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <svg className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Actually Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                I reply to emails within 2 hours (often much faster). When I say a project takes 2 weeks, it gets done in 2 weeks. No corporate delays or endless meetings.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <svg className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Obsessed with Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                I lose sleep over bugs and poor user experiences. Your project gets the same attention I'd give my own business (because your success is my success).
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                <svg className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Just Me (For Now)</h3>
              <p className="text-gray-600 leading-relaxed">
                You work directly with me, not a junior developer or account manager. I know every line of code in your project and can explain any decision I made.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                <svg className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Always Here</h3>
              <p className="text-gray-600 leading-relaxed">
                Coffee at 6 AM or late-night emergency? I'm probably awake anyway. Your project won't sit in a queue waiting for "business hours."
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                <svg className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Honest & Transparent</h3>
              <p className="text-gray-600 leading-relaxed">
                I'll tell you when something won't work, even if it costs me money. Your trust is worth more than any project fee.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                <svg className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Future-Proof Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                I build things to last and grow with you. No proprietary lock-in or vendor dependencies - you own everything I create for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-light mb-2">127</div>
              <div className="text-blue-100 text-lg">Happy Clients</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-light mb-2">3</div>
              <div className="text-blue-100 text-lg">Years Freelancing</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-light mb-2">∞</div>
              <div className="text-blue-100 text-lg">Coffee Cups</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-light mb-2">0</div>
              <div className="text-blue-100 text-lg">Missed Deadlines</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              What My Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from real people who trusted me with their projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "I was drowning in emails and admin work. Alex built me a virtual assistant system that handles 80% of my routine tasks. Now I actually have time to focus on my clients again!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Sarah Martinez</div>
                  <div className="text-gray-600 text-sm">Marketing Consultant, Austin TX</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "My previous developer disappeared mid-project. Alex not only finished what they started but found and fixed 12 critical bugs. My app actually works now!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  MK
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Mike Kim</div>
                  <div className="text-gray-600 text-sm">Startup Founder, Seattle</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Alex doesn't just build websites - he actually listens. He understood my vision better than I did and delivered something beyond my expectations. Plus, he's genuinely fun to work with!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  LC
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Lisa Chen</div>
                  <div className="text-gray-600 text-sm">Small Business Owner, Portland</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            I'm currently accepting new projects for Q4 2025. Let's grab a coffee (virtual or real) and see if we're a good fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors">
              Let's Chat (It's Free)
            </button>
            <button className="border border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-lg font-medium transition-colors">
              See My Work First
            </button>
          </div>
        </div>
      </section>

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
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
              All Projects
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Web Development
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Mobile Apps
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
              E-commerce
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Branding
            </button>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Portfolio Item 1 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center"
                  alt="E-commerce Platform"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">E-commerce</span>
                  <span className="text-sm text-gray-500">2024</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah's Jewelry Store</h3>
                <p className="text-gray-600 mb-4">Sarah wanted to sell handmade jewelry online but was overwhelmed by e-commerce platforms. I built her a simple, beautiful store that doubled her sales in 3 months.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">React</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Node.js</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MongoDB</span>
                </div>
              </div>
            </div>

            {/* Portfolio Item 2 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&h=400&fit=crop&crop=center"
                  alt="Mobile Banking App"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Mobile App</span>
                  <span className="text-sm text-gray-500">2024</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Budget Tracking App</h3>
                <p className="text-gray-600 mb-4">A friend complained about complicated budgeting apps, so I built her a simple one. It worked so well, she convinced me to turn it into a real product.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">React Native</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Firebase</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Stripe</span>
                </div>
              </div>
            </div>

            {/* Portfolio Item 3 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=center"
                  alt="Corporate Website"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
                  <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Web Design</span>
                  <span className="text-sm text-gray-500">2024</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Corporate Website Redesign</h3>
                <p className="text-gray-600 mb-4">Complete redesign of a corporate website with modern UI/UX principles and enhanced user experience.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Next.js</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Tailwind</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Figma</span>
                </div>
              </div>
            </div>

            {/* Portfolio Item 4 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center"
                  alt="SaaS Dashboard"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
                  <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">SaaS</span>
                  <span className="text-sm text-gray-500">2023</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600 mb-4">Comprehensive analytics dashboard with real-time data visualization and advanced reporting features.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Vue.js</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">D3.js</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Python</span>
                </div>
              </div>
            </div>

            {/* Portfolio Item 5 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center"
                  alt="Brand Identity"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
                  <span className="text-sm font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full">Branding</span>
                  <span className="text-sm text-gray-500">2023</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Brand Identity</h3>
                <p className="text-gray-600 mb-4">Full brand identity design including logo, color palette, typography, and brand guidelines.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Illustrator</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Photoshop</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">InDesign</span>
                </div>
              </div>
            </div>

            {/* Portfolio Item 6 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&crop=center"
                  alt="CRM System"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Enterprise</span>
                  <span className="text-sm text-gray-500">2023</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom CRM System</h3>
                <p className="text-gray-600 mb-4">Enterprise-level CRM system with advanced lead management, analytics, and automation features.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Angular</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Java</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-300 hover:scale-105 transform">
              Load More Projects
            </button>
          </div>

          {/* Portfolio Stats */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-light mb-2">150+</div>
                <div className="text-blue-100">Projects Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">95%</div>
                <div className="text-blue-100">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">25+</div>
                <div className="text-blue-100">Industries Served</div>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">5+</div>
                <div className="text-blue-100">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles/Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Things I Think About
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Random thoughts on tech, business, and life. Sometimes useful, always honest.
            </p>
          </div>

          {/* Featured Article */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=center"
                    alt="Future of AI in Business"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Featured</span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">Technology</span>
                    <span className="text-sm text-gray-500">5 min read</span>
                    <span className="text-sm text-gray-500">August 10, 2025</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                    Why I Ditched Corporate Life (And You Might Too)
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Three years ago, I had a corner office and a six-figure salary. Today, I work from coffee shops and make more money. Here's what changed and why I'm never going back.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                        A
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Alex (Me)</div>
                        <div className="text-gray-600 text-sm">Drinking Coffee in Portland</div>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-300 hover:scale-105 transform">
                      Read Article →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Article 1 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=center"
                  alt="Web Development Best Practices"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">Development</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                  <span>3 min read</span>
                  <span>•</span>
                  <span>August 8, 2025</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  5 Things I Wish I Knew Before Going Freelance
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Spoiler: It's not all coffee shops and flexible schedules. The real truth about freelancing that no one talks about.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                      A
                    </div>
                    <span className="text-sm text-gray-700">Alex</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </article>

            {/* Article 2 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center"
                  alt="Digital Marketing Strategies"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">Marketing</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                  <span>4 min read</span>
                  <span>•</span>
                  <span>August 6, 2025</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Digital Marketing Strategies That Actually Work
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Discover proven digital marketing tactics that drive real results and maximize your ROI.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                      MJ
                    </div>
                    <span className="text-sm text-gray-700">Michael Johnson</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </article>

            {/* Article 3 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center"
                  alt="Quality Assurance"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">QA</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                  <span>6 min read</span>
                  <span>•</span>
                  <span>August 4, 2025</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Quality Assurance in Agile Development
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Best practices for implementing effective QA processes in agile development environments.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                      AL
                    </div>
                    <span className="text-sm text-gray-700">Alex Lee</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </article>

            {/* Article 4 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&h=400&fit=crop&crop=center"
                  alt="Mobile App Security"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">Security</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                  <span>5 min read</span>
                  <span>•</span>
                  <span>August 2, 2025</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Mobile App Security: Essential Guidelines
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Protect your mobile applications with these crucial security measures and best practices.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                      KW
                    </div>
                    <span className="text-sm text-gray-700">Katie Wilson</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </article>

            {/* Article 5 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center"
                  alt="Data Analytics"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">Analytics</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                  <span>7 min read</span>
                  <span>•</span>
                  <span>July 30, 2025</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Data-Driven Decision Making for Startups
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  How early-stage companies can leverage data analytics to make informed business decisions.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                      RG
                    </div>
                    <span className="text-sm text-gray-700">Ryan Garcia</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </article>

            {/* Article 6 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&crop=center"
                  alt="Remote Team Management"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium">Management</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                  <span>4 min read</span>
                  <span>•</span>
                  <span>July 28, 2025</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Building Effective Remote Teams
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Strategies for managing and motivating remote teams in the modern workplace.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                      LB
                    </div>
                    <span className="text-sm text-gray-700">Lisa Brown</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Newsletter Subscription */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-light mb-4">
                Want My Honest Thoughts?
              </h3>
              <p className="text-blue-100 text-lg mb-8">
                I send one email per month with lessons learned, project updates, and the occasional rant about bad UX design. No spam, no sales pitches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                  Count Me In
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-4">
                Join 847 people who apparently enjoy my random thoughts. Unsubscribe anytime (I won't be offended).
              </p>
            </div>
          </div>

          {/* View All Articles */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform">
              Read All My Thoughts →
            </button>
          </div>
        </div>
      </section>

      {/* Buy Me Coffee Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="mb-12">
            <div className="text-6xl mb-6">☕</div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Fuel My Coding Sessions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              If my articles helped you solve a problem, or you just want to support my work, 
              consider buying me a coffee. It literally keeps me coding through those late-night bug hunts!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Coffee Options */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-amber-200">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Single Coffee</h3>
              <div className="text-3xl font-light text-amber-600 mb-4">$5</div>
              <p className="text-gray-600 mb-6">
                A regular coffee to keep me going through the next article or code review.
              </p>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300">
                Buy One Coffee
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium">Popular</span>
              </div>
              <div className="text-4xl mb-4">☕☕☕</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Coffee Boost</h3>
              <div className="text-3xl font-light text-amber-600 mb-4">$15</div>
              <p className="text-gray-600 mb-6">
                Enough coffee for a solid coding session. Perfect for when my content saves you hours of work!
              </p>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300">
                Boost My Energy
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-amber-200">
              <div className="text-4xl mb-4">☕🍰</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Coffee + Snack</h3>
              <div className="text-3xl font-light text-amber-600 mb-4">$25</div>
              <p className="text-gray-600 mb-6">
                Coffee plus a snack for those marathon debugging sessions. You're basically funding my productivity!
              </p>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300">
                Fuel the Mission
              </button>
            </div>
          </div>

          {/* Custom Amount */}
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-md mx-auto mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Own Amount</h3>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                placeholder="10"
                min="1"
                className="flex-1 text-gray-900 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center text-xl"
              />
              <span className="text-2xl">☕</span>
            </div>
            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300">
              Custom Support
            </button>
          </div>

          {/* Coffee Stats */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-8 text-white mb-12">
            <h3 className="text-2xl font-semibold mb-6">Coffee-Powered Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-light mb-2">342</div>
                <div className="text-amber-100 text-sm">Coffees Consumed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light mb-2">47</div>
                <div className="text-amber-100 text-sm">All-Nighters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light mb-2">1,284</div>
                <div className="text-amber-100 text-sm">Bugs Fixed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light mb-2">23</div>
                <div className="text-amber-100 text-sm">Coffee Shops Visited</div>
              </div>
            </div>
          </div>

          {/* Recent Supporters */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Coffee Supporters</h3>
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold border-2 border-white">
                  MK
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold border-2 border-white">
                  SL
                </div>
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold border-2 border-white">
                  JD
                </div>
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold border-2 border-white">
                  AR
                </div>
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold border-2 border-white">
                  LC
                </div>
              </div>
              <span className="text-gray-600 text-sm">+12 others this month</span>
            </div>
            <p className="text-gray-600 italic">
              "Thanks for the tutorial on React hooks! Saved me 3 hours of debugging 🙏" - Sarah L.
            </p>
          </div>

          {/* Alternative Support */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Other Ways to Support</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="text-3xl mb-3">🐦</div>
                <h4 className="font-medium text-gray-900 mb-2">Share My Work</h4>
                <p className="text-gray-600 text-sm">Tweet about an article that helped you</p>
              </div>
              <div className="text-center p-6">
                <div className="text-3xl mb-3">💼</div>
                <h4 className="font-medium text-gray-900 mb-2">Hire Me</h4>
                <p className="text-gray-600 text-sm">The best way to support is working together</p>
              </div>
              <div className="text-center p-6">
                <div className="text-3xl mb-3">✍️</div>
                <h4 className="font-medium text-gray-900 mb-2">Give Feedback</h4>
                <p className="text-gray-600 text-sm">Tell me what content you'd like to see</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Let's Talk
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I love meeting new people and hearing about interesting projects. Even if we don't work together, I'm always happy to chat.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Coffee & Conversation</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  I'm based in Portland, but work with people everywhere. Prefer a quick call? Love a long email? Want to meet for actual coffee? I'm flexible.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Text Me</h4>
                    <p className="text-gray-600">+1 (503) 555-ALEX</p>
                    <p className="text-sm text-gray-500">Fastest way to reach me</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Me</h4>
                    <p className="text-gray-600">hello@alexbuilds.dev</p>
                    <p className="text-sm text-gray-500">I usually reply within 2 hours</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Meet Me</h4>
                    <p className="text-gray-600">Portland, Oregon<br/>Or anywhere with good WiFi</p>
                  </div>
                </div>

                {/* Live Chat */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Quick Chat</h4>
                    <p className="text-gray-600">15-minute calls available</p>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Book a time →</button>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center text-white hover:bg-blue-900 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.752-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-600"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-600"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-600"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-600"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900"
                  >
                    <option value="">Select a service</option>
                    <option value="virtual-assistant">Virtual Assistant</option>
                    <option value="quality-assurance">Quality Assurance</option>
                    <option value="web-development">Web Development</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-4 py-3 border text-gray-900 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="over-50k">Over $50,000</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none placeholder-gray-600"
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agree"
                      name="agree"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agree" className="text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-colors duration-200 transform hover:scale-105"
                >
                  Send Message
                </button>

                <p className="text-center text-sm text-gray-500">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-20">
            <div className="bg-gray-200 rounded-3xl overflow-hidden h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Office Location</h3>
                  <p className="text-gray-600">123 Business Street, Suite 100, New York, NY 10001</p>
                  <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
