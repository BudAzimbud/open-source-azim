import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Star, Quote, Award, Users, TrendingUp, Code } from 'lucide-react';

const experienceData = [
  {
    id: 1,
    company: "B ONE CONSULTING",
    position: "Fullstack Developer",
    duration: "Current",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    description: "Leading full-stack development initiatives, building comprehensive web solutions and managing end-to-end project delivery. Responsible for both frontend and backend development with modern tech stack.",
    achievements: [
      "Built scalable web applications",
      "Implemented modern development practices",
      "Optimized application performance",
      "Collaborated with cross-functional teams"
    ],
    technologies: ["React", "Node.js", "JavaScript", "TypeScript", "MongoDB"],
    testimonial: {
      name: "Budi Santoso",
      role: "Project Manager at B ONE CONSULTING",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Azim has been instrumental in our development projects. His full-stack expertise and problem-solving skills consistently deliver high-quality solutions that exceed client expectations.",
      rating: 5,
      workDuration: "Current"
    },
    stats: {
      projects: 8,
      teamSize: 4,
      growth: "+50%"
    },
    color: "blue",
    bgGradient: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    company: "Hanel Asia",
    position: "React Developer",
    duration: "Nov 2024 - Jan 2025",
    location: "Remote",
    type: "Contract",
    description: "Specialized in React development for modern web applications. Focused on creating responsive, user-friendly interfaces and implementing complex frontend features with optimal performance.",
    achievements: [
      "Developed responsive React components",
      "Improved UI/UX performance by 35%",
      "Implemented modern React patterns",
      "Delivered project within tight deadline"
    ],
    technologies: ["React", "JavaScript", "CSS3", "Redux", "Material-UI"],
    testimonial: {
      name: "Sarah Kim",
      role: "Technical Lead at Hanel Asia",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Working with Azim for 3 months was fantastic. His React expertise and attention to detail helped us deliver a polished product that our users love.",
      rating: 5,
      workDuration: "3 months"
    },
    stats: {
      projects: 3,
      teamSize: 5,
      growth: "+35%"
    },
    color: "purple",
    bgGradient: "from-purple-500 to-pink-600"
  },
  {
    id: 3,
    company: "WaterHub",
    position: "Flutter Developer",
    duration: "Agu 2024 - Des 2024",
    location: "Remote",
    type: "Contract",
    description: "Developed mobile applications using Flutter framework. Built cross-platform mobile solutions with focus on water management systems and IoT integration.",
    achievements: [
      "Built cross-platform mobile app",
      "Integrated IoT water sensors",
      "Implemented real-time data monitoring",
      "Achieved 99% app stability"
    ],
    technologies: ["Flutter", "Dart", "Firebase", "API Integration", "SQLite"],
    testimonial: {
      name: "Ahmad Rahman",
      role: "CTO at WaterHub",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "During our 5-month collaboration, Azim delivered an exceptional Flutter app that revolutionized how we monitor water systems. His mobile development skills are top-notch.",
      rating: 5,
      workDuration: "5 months"
    },
    stats: {
      projects: 2,
      teamSize: 3,
      growth: "+60%"
    },
    color: "green",
    bgGradient: "from-green-500 to-teal-600"
  },
  {
    id: 4,
    company: "OBS Financial Solutions Pte Ltd",
    position: "React Developer",
    duration: "Mei 2024 - Agu 2024",
    location: "Remote",
    type: "Contract",
    description: "Developed financial technology solutions using React. Built user interfaces for financial applications with emphasis on security, performance, and user experience in the fintech sector.",
    achievements: [
      "Built secure financial interfaces",
      "Implemented real-time trading features",
      "Optimized performance for large datasets",
      "Ensured regulatory compliance"
    ],
    technologies: ["React", "TypeScript", "Redux", "Chart.js", "REST API"],
    testimonial: {
      name: "Michael Tan",
      role: "Product Manager at OBS Financial",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Azim's 4-month contribution to our fintech platform was outstanding. His React skills and understanding of financial systems helped us deliver a robust trading interface.",
      rating: 5,
      workDuration: "4 months"
    },
    stats: {
      projects: 2,
      teamSize: 6,
      growth: "+40%"
    },
    color: "orange",
    bgGradient: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    company: "PT. Tavia Digital Solusi",
    position: "Back End Developer",
    duration: "Feb 2024 - Jun 2024",
    location: "Remote",
    type: "Contract",
    description: "Focused on backend development and API design. Built robust server-side solutions, database architecture, and API integrations for various digital solutions.",
    achievements: [
      "Developed scalable API architecture",
      "Optimized database performance",
      "Implemented security best practices",
      "Reduced server response time by 45%"
    ],
    technologies: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "JWT"],
    testimonial: {
      name: "Rina Sari",
      role: "Tech Lead at Tavia Digital",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "In our 5-month partnership, Azim demonstrated exceptional backend development skills. His API designs were clean, efficient, and perfectly documented.",
      rating: 5,
      workDuration: "5 months"
    },
    stats: {
      projects: 3,
      teamSize: 4,
      growth: "+45%"
    },
    color: "indigo",
    bgGradient: "from-indigo-500 to-blue-600"
  },
  {
    id: 6,
    company: "IFG Life",
    position: "Lead Frontend",
    duration: "Feb 2023 - Feb 2024",
    location: "Remote",
    type: "Contract",
    description: "Led frontend development team for insurance technology solutions. Managed complex user interfaces for life insurance products and customer management systems.",
    achievements: [
      "Led frontend development team",
      "Improved user conversion by 50%",
      "Built responsive insurance portal",
      "Mentored junior developers"
    ],
    technologies: ["Vue.js", "Nuxt.js", "TypeScript", "Vuex", "SCSS"],
    testimonial: {
      name: "Diana Putri",
      role: "Head of Technology at IFG Life",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Azim's leadership during our 1-year collaboration was exceptional. His frontend expertise and team management skills helped us deliver a world-class insurance platform.",
      rating: 5,
      workDuration: "1 year 1 month"
    },
    stats: {
      projects: 4,
      teamSize: 6,
      growth: "+50%"
    },
    color: "teal",
    bgGradient: "from-teal-500 to-cyan-600"
  },
  {
    id: 7,
    company: "FishLog",
    position: "Fullstack Developer",
    duration: "Sep 2023 - Des 2023",
    location: "Remote",
    type: "Contract",
    description: "Developed comprehensive fishery management system. Built both mobile and web applications for fish farm monitoring, inventory management, and analytics dashboard.",
    achievements: [
      "Built end-to-end fishery system",
      "Integrated IoT sensors for monitoring",
      "Created real-time analytics dashboard",
      "Achieved 95% system reliability"
    ],
    technologies: ["React", "React Native", "Node.js", "PostgreSQL", "Socket.io"],
    testimonial: {
      name: "Pak Joko",
      role: "Operations Manager at FishLog",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "During our 4-month project, Azim built a comprehensive system that transformed our fishery operations. His full-stack skills and understanding of our industry were remarkable.",
      rating: 5,
      workDuration: "4 months"
    },
    stats: {
      projects: 1,
      teamSize: 2,
      growth: "+70%"
    },
    color: "emerald",
    bgGradient: "from-emerald-500 to-green-600"
  },
  {
    id: 8,
    company: "Kara Digital",
    position: "Senior Backend",
    duration: "Sep 2023 - Des 2023",
    location: "Remote",
    type: "Contract",
    description: "Architected and developed backend infrastructure for digital marketing solutions. Built scalable APIs and microservices architecture for high-traffic applications.",
    achievements: [
      "Designed microservices architecture",
      "Handled 100K+ concurrent users",
      "Reduced API response time by 60%",
      "Implemented advanced caching strategies"
    ],
    technologies: ["Python", "Django", "Redis", "PostgreSQL", "Docker"],
    testimonial: {
      name: "Kevin Wijaya",
      role: "CTO at Kara Digital",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Azim's backend expertise during our 4-month engagement was outstanding. His architectural decisions and optimization skills significantly improved our platform performance.",
      rating: 5,
      workDuration: "4 months"
    },
    stats: {
      projects: 2,
      teamSize: 5,
      growth: "+60%"
    },
    color: "violet",
    bgGradient: "from-violet-500 to-purple-600"
  },
  {
    id: 9,
    company: "BRI Corporate University",
    position: "Mentor Frontend",
    duration: "Mar 2023 - Apr 2023",
    location: "Jakarta, Indonesia",
    type: "Part-time",
    description: "Mentored aspiring frontend developers in modern web development technologies. Conducted workshops, code reviews, and provided guidance on best practices in frontend development.",
    achievements: [
      "Mentored 20+ developers",
      "Conducted technical workshops",
      "Improved student project quality by 40%",
      "Created learning curriculum"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "Git"],
    testimonial: {
      name: "Dr. Sari Indah",
      role: "Director at BRI Corporate University",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Azim's mentorship during our 2-month program was invaluable. His teaching skills and patience helped our students grasp complex frontend concepts effectively.",
      rating: 5,
      workDuration: "2 months"
    },
    stats: {
      projects: 1,
      teamSize: 20,
      growth: "+40%"
    },
    color: "blue",
    bgGradient: "from-blue-600 to-indigo-600"
  },
  {
    id: 10,
    company: "PT WGS",
    position: "Support Fullstack Developer",
    duration: "Feb 2022 - Feb 2023",
    location: "Remote",
    type: "Contract",
    description: "Provided technical support and development for existing applications. Maintained legacy systems while implementing new features and optimizing performance.",
    achievements: [
      "Maintained 5+ production systems",
      "Fixed critical bugs and vulnerabilities",
      "Improved system uptime to 99.8%",
      "Implemented monitoring solutions"
    ],
    technologies: ["PHP", "Laravel", "MySQL", "jQuery", "Bootstrap"],
    testimonial: {
      name: "Agus Setiawan",
      role: "Technical Manager at PT WGS",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Throughout our 1-year partnership, Azim was reliable and skilled in maintaining our complex systems. His support and development work kept our operations running smoothly.",
      rating: 5,
      workDuration: "1 year 1 month"
    },
    stats: {
      projects: 5,
      teamSize: 3,
      growth: "+25%"
    },
    color: "gray",
    bgGradient: "from-gray-500 to-slate-600"
  },
  {
    id: 11,
    company: "PT. SOPWER TEKNOLOGI INDONESIA",
    position: "Back End Developer",
    duration: "Sep 2021 - Jan 2022",
    location: "Remote",
    type: "Contract",
    description: "Developed backend solutions for enterprise software applications. Built RESTful APIs, database schemas, and integrated third-party services for business automation.",
    achievements: [
      "Built enterprise-grade APIs",
      "Integrated payment gateways",
      "Optimized database queries",
      "Implemented automated testing"
    ],
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Maven"],
    testimonial: {
      name: "Ibu Ratna",
      role: "Development Manager at SOPWER",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Azim's backend development skills during our 5-month project were impressive. His clean code and systematic approach helped us deliver a robust enterprise solution.",
      rating: 5,
      workDuration: "5 months"
    },
    stats: {
      projects: 2,
      teamSize: 4,
      growth: "+35%"
    },
    color: "cyan",
    bgGradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 12,
    company: "Clodeo",
    position: "Data Entry Specialist",
    duration: "Mei 2020 - Jul 2020",
    location: "Remote",
    type: "Part-time",
    description: "Specialized in data processing and database management. Handled large datasets, data validation, and created automated scripts for data processing efficiency.",
    achievements: [
      "Processed 50K+ data entries",
      "Improved data accuracy to 99.9%",
      "Created automation scripts",
      "Reduced processing time by 70%"
    ],
    technologies: ["Excel", "Python", "Pandas", "SQL", "CSV Processing"],
    testimonial: {
      name: "Lisa Chen",
      role: "Data Manager at Clodeo",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "During our 3-month collaboration, Azim transformed our data processing workflow. His attention to detail and automation skills significantly improved our data quality.",
      rating: 4,
      workDuration: "3 months"
    },
    stats: {
      projects: 3,
      teamSize: 2,
      growth: "+70%"
    },
    color: "pink",
    bgGradient: "from-pink-500 to-rose-600"
  }
];

export default function ExperienceSection() {
  const [activeExperience, setActiveExperience] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const currentExp = experienceData[activeExperience];

  const nextExperience = () => {
    setActiveExperience((prev) => (prev + 1) % experienceData.length);
  };

  const prevExperience = () => {
    setActiveExperience((prev) => (prev - 1 + experienceData.length) % experienceData.length);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Section Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Professional Journey</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-normal">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Over 6+ years of building exceptional digital experiences and leading teams to success
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Timeline Navigation */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Career Timeline</h3>
              
              {/* Scroll Container */}
              <div className="relative">
                <div 
                  className="overflow-y-auto scrollbar-hide space-y-6 pr-2"
                  style={{ 
                    maxHeight: '900px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {experienceData.map((exp, index) => (
                    <div
                      key={exp.id}
                      onClick={() => setActiveExperience(index)}
                      className={`relative cursor-pointer transition-all duration-500 ${
                        index === activeExperience ? 'scale-105' : 'hover:scale-102'
                      }`}
                    >
                      {/* Timeline Line */}
                      <div className={`absolute left-6 top-12 w-0.5 h-16 ${
                        index === experienceData.length - 1 ? 'hidden' : 'block'
                      } ${index <= activeExperience ? 'bg-gradient-to-b from-blue-500 to-purple-500' : 'bg-gray-200'}`}></div>
                      
                      {/* Timeline Dot */}
                      <div className={`absolute left-4 top-4 w-4 h-4 rounded-full border-4 transition-all duration-500 ${
                        index === activeExperience 
                          ? 'bg-blue-500 border-blue-200 scale-125 shadow-lg' 
                          : index < activeExperience 
                          ? 'bg-blue-400 border-blue-100' 
                          : 'bg-gray-200 border-gray-100'
                      }`}></div>

                      {/* Content Card */}
                      <div className={`ml-12 p-6 rounded-2xl transition-all duration-500 ${
                        index === activeExperience 
                          ? 'bg-white shadow-2xl border-2 border-blue-100' 
                          : 'bg-white/70 shadow-md hover:shadow-lg border border-gray-100'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            exp.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            exp.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                            exp.color === 'green' ? 'bg-green-100 text-green-700' :
                            exp.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                            exp.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' :
                            exp.color === 'teal' ? 'bg-teal-100 text-teal-700' :
                            exp.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                            exp.color === 'violet' ? 'bg-violet-100 text-violet-700' :
                            exp.color === 'cyan' ? 'bg-cyan-100 text-cyan-700' :
                            exp.color === 'gray' ? 'bg-gray-100 text-gray-700' :
                            'bg-pink-100 text-pink-700'
                          }`}>
                            {exp.type}
                          </span>
                          <span className="text-sm text-gray-500">{exp.duration}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{exp.position}</h4>
                        <p className="text-blue-600 font-medium mb-2 line-clamp-1">{exp.company}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="line-clamp-1">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fade gradients for scroll indication */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
                
                {/* Scroll Indicator */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-1 h-20 bg-gray-200 rounded-full">
                    <div 
                      className="w-1 bg-blue-500 rounded-full transition-all duration-300"
                      style={{ height: `${((activeExperience + 1) / experienceData.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Experience Counter */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    {activeExperience + 1} of {experienceData.length} experiences
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Details */}
          <div className="lg:col-span-8">
            <div className={`transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              {/* Main Experience Card */}
              <div className={`relative bg-gradient-to-br ${currentExp.bgGradient} rounded-3xl p-1 mb-8 shadow-2xl`}>
                <div className="bg-white rounded-3xl p-8">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{currentExp.position}</h3>
                      <p className="text-xl text-blue-600 font-semibold mb-2">{currentExp.company}</p>
                      <div className="flex items-center space-x-4 text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {currentExp.duration}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {currentExp.location}
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                      <button
                        onClick={prevExperience}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="mx-4 text-sm text-gray-500">
                        {activeExperience + 1} / {experienceData.length}
                      </span>
                      <button
                        onClick={nextExperience}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">{currentExp.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-2xl">
                      <Code className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{currentExp.stats.projects}</div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-2xl">
                      <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">{currentExp.stats.teamSize}</div>
                      <div className="text-sm text-gray-600">Team Size</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-2xl">
                      <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{currentExp.stats.growth}</div>
                      <div className="text-sm text-gray-600">Growth</div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Achievements</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentExp.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-3">
                      {currentExp.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start space-x-4">
                  <Quote className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                      "{currentExp.testimonial.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={currentExp.testimonial.avatar}
                          alt={currentExp.testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{currentExp.testimonial.name}</p>
                          <p className="text-sm text-gray-600">{currentExp.testimonial.role}</p>
                          <p className="text-xs text-blue-600 font-medium mt-1">
                            Worked together for {currentExp.testimonial.workDuration}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(currentExp.testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}