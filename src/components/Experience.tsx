import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Star,
  Quote,
  Award,
  Users,
  TrendingUp,
  Code,
} from "lucide-react";
import { experienceData } from "@/datas/experience";

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
    setActiveExperience(
      (prev) => (prev - 1 + experienceData.length) % experienceData.length
    );
  };

  // Helper function untuk warna badge
  const getColorClasses = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700",
      "bg-green-100 text-green-700",
      "bg-orange-100 text-orange-700",
      "bg-indigo-100 text-indigo-700",
    ];
    return colors[index % colors.length];
  };

  const getGradient = (index: number) => {
    const gradients = [
      "from-blue-500 to-purple-600",
      "from-purple-500 to-pink-600",
      "from-green-500 to-teal-600",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-blue-600",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#0F0F0F] via-[#1a1a1a] to-[#0F0F0F] overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FACC15]/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#FACC15]/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#FACC15]/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center space-x-2 bg-[#FACC15]/20 rounded-full px-6 py-2 mb-6">
            <Award className="w-5 h-5 text-[#FACC15]" />
            <span className="text-[#FACC15] font-medium">
              Professional Journey
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-[#F3F4F6] mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-[#FACC15] to-[#FACC15]/70 bg-clip-text text-transparent font-normal">
              Experience
            </span>
          </h2>
          <p className="text-xl text-[#F3F4F6]/70 max-w-3xl mx-auto leading-relaxed">
            Over 4+ years of building exceptional digital experiences across
            enterprise, fintech, and startup environments
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Timeline Navigation */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <h3 className="text-2xl font-semibold text-[#F3F4F6] mb-8">
                Career Timeline
              </h3>

              {/* Scroll Container */}
              <div className="relative">
                <div className=" scrollbar-hide space-y-6 pr-2">
                  {experienceData.map((exp, index) => (
                    <div
                      key={exp.id}
                      onClick={() => setActiveExperience(index)}
                      className={`relative cursor-pointer transition-all duration-500 ${
                        index === activeExperience
                          ? "scale-105"
                          : "hover:scale-102"
                      }`}
                    >
                      {/* Timeline Line */}
                      <div
                        className={`absolute left-6 top-12 w-0.5 h-16 ${
                          index === experienceData.length - 1
                            ? "hidden"
                            : "block"
                        } ${
                          index <= activeExperience
                            ? "bg-gradient-to-b from-[#FACC15] to-[#FACC15]/50"
                            : "bg-[#F3F4F6]/20"
                        }`}
                      ></div>

                      {/* Timeline Dot */}
                      <div
                        className={`absolute left-4 top-4 w-4 h-4 rounded-full border-4 transition-all duration-500 ${
                          index === activeExperience
                            ? "bg-[#FACC15] border-[#FACC15]/30 scale-125 shadow-lg"
                            : index < activeExperience
                            ? "bg-[#FACC15]/70 border-[#FACC15]/20"
                            : "bg-[#F3F4F6]/20 border-[#F3F4F6]/10"
                        }`}
                      ></div>

                      {/* Content Card */}
                      <div
                        className={`ml-12 p-6 rounded-2xl transition-all duration-500 ${
                          index === activeExperience
                            ? "bg-[#0F0F0F] shadow-2xl border-2 border-[#FACC15]"
                            : "bg-[#0F0F0F]/70 shadow-md hover:shadow-lg border border-[#F3F4F6]/10"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(
                              index
                            )}`}
                          >
                            {exp.type}
                          </span>
                          <span className="text-sm text-[#F3F4F6]/50">
                            {exp.period}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-[#F3F4F6] mb-1 line-clamp-1">
                          {exp.position}
                        </h4>
                        <p className="text-[#FACC15] font-medium mb-2 line-clamp-1">
                          {exp.company}
                        </p>
                        <div className="flex items-center text-sm text-[#F3F4F6]/50">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="line-clamp-1">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Counter */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-[#0F0F0F] border border-[#FACC15]/30 rounded-full px-4 py-2 shadow-md">
                  <div className="w-2 h-2 bg-[#FACC15] rounded-full"></div>
                  <span className="text-sm text-[#F3F4F6]/70">
                    {activeExperience + 1} of {experienceData.length}{" "}
                    experiences
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Details */}
          <div className="lg:col-span-8">
            <div
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              {/* Main Experience Card */}
              <div
                className={`relative bg-gradient-to-br ${getGradient(
                  activeExperience
                )} rounded-3xl p-1 mb-8 shadow-2xl`}
              >
                <div className="bg-[#0F0F0F] rounded-3xl p-8">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                      <h3 className="text-3xl font-bold text-[#F3F4F6] mb-2">
                        {currentExp.position}
                      </h3>
                      <p className="text-xl text-[#FACC15] font-semibold mb-2">
                        {currentExp.company}
                      </p>
                      <div className="flex items-center space-x-4 text-[#F3F4F6]/70">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {currentExp.period}
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
                        className="p-2 bg-[#F3F4F6]/10 hover:bg-[#FACC15]/20 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="mx-4 text-sm text-[#F3F4F6]/50">
                        {activeExperience + 1} / {experienceData.length}
                      </span>
                      <button
                        onClick={nextExperience}
                        className="p-2 bg-[#F3F4F6]/10 hover:bg-[#FACC15]/20 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-white mb-8 leading-relaxed">
                    {currentExp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      Key Achievements
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentExp.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 rounded-xl"
                        >
                          <div className="w-2 h-2 bg-[#FACC15] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-white">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      Key Responsibilities
                    </h4>
                    <div className="space-y-3">
                      {currentExp.responsibilities
                        .slice(0, 4)
                        .map((responsibility, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-3 rounded-xl"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-white">{responsibility}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {currentExp.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium hover:scale-105 transition-transform"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Link if available */}
              {currentExp.companyUrl && (
                <div className="text-center mb-8">
                  <a
                    href={currentExp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0F0F0F] px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
                  >
                    <span>Visit Company Website</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
