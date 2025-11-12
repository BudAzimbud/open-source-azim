import Image from "next/image";
import { useState } from "react";
import {
  portfolioData,
  portfolioCategories,
  portfolioStats,
  techStack,
  PortfolioItem,
} from "@/datas/portfolio";

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filteredPortfolio = portfolioData.filter((project) => {
    if (activeFilter === "All Projects") return true;
    return project.categoryLabel === activeFilter;
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Enterprise Solutions I've Built
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Full-stack applications that solve real business problems for
            companies across various industries
          </p>
        </div>


        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPortfolio.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>


      </div>
    </section>
  );
}

// Portfolio Card Component
function PortfolioCard({ project }: { project: PortfolioItem }) {
  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative overflow-hidden h-48 sm:h-64">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-3 sm:space-x-4">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 text-gray-900 hover:bg-white transition-colors"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </a>
            ) : (
              <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 text-gray-900 hover:bg-white transition-colors">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-${project.categoryColor}-50 text-${project.categoryColor}-600`}
          >
            {project.categoryLabel}
          </span>
          <span className="text-xs sm:text-sm text-gray-500">
            {project.year}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {project.title}
        </h3>

        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}



// Portfolio Stats Component
function PortfolioStats() {
  return (
    <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
      <div className="grid md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl font-light mb-2">
            {portfolioStats.projectsDelivered}+
          </div>
          <div className="text-blue-100">Projects Delivered</div>
        </div>
        <div>
          <div className="text-4xl font-light mb-2">
            {portfolioStats.clientSatisfaction}%
          </div>
          <div className="text-blue-100">Client Satisfaction</div>
        </div>
        <div>
          <div className="text-4xl font-light mb-2">
            {portfolioStats.industriesServed}+
          </div>
          <div className="text-blue-100">Industries Served</div>
        </div>
        <div>
          <div className="text-4xl font-light mb-2">
            {portfolioStats.yearsExperience}+
          </div>
          <div className="text-blue-100">Years Experience</div>
        </div>
      </div>
    </div>
  );
}

// Case Study CTA Component
function CaseStudyCTA() {
  return (
    <div className="mt-12 sm:mt-16 text-center bg-gray-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12">
      <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
        Want to See Detailed Case Studies?
      </h3>
      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
        Explore in-depth breakdowns of how I approached complex business
        problems, the technical solutions implemented, and the measurable
        results achieved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform text-sm sm:text-base">
          View Case Studies →
        </button>
        <button className="border border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-700 px-6 sm:px-8 py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base">
          Download Portfolio PDF
        </button>
      </div>
    </div>
  );
}