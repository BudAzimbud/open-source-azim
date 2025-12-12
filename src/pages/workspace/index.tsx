import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { portfolioData } from "@/datas/portfolio";

const categories = [
  "All Projects",
  "Marketplace",
  "Education",
  "Enterprise",
  "Insurance",
  "Healthcare",
  "HR",
  "FinTech",
  "Retail",
  "Logistics",
  "PropTech",
  "Analytics",
  "E-commerce",
  "Government",
  "Fitness",
  "IoT",
  "Open Source",
];

export default function WorkspaceList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [sortBy, setSortBy] = useState("newest");

  // Filter dan sort data
  const filteredProjects = portfolioData
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All Projects" ||
        project.categoryLabel === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return +b.year - +a.year;
      if (sortBy === "oldest") return +a.year - +b.year;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "company")
        return (a.company || "").localeCompare(b.company || "");
      return 0;
    });

  // Group by company
  const groupedByCompany = filteredProjects.reduce((acc, project) => {
    const company = project.company || "Other Projects";
    if (!acc[company]) {
      acc[company] = [];
    }
    acc[company].push(project);
    return acc;
  }, {} as Record<string, typeof portfolioData>);

  const sortedCompanies = Object.keys(groupedByCompany).sort((a, b) => {
    if (a === "B ONE CONSULTING") return -1;
    if (b === "B ONE CONSULTING") return 1;
    if (a === "Personal Project") return 1;
    if (b === "Personal Project") return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Navigation */}
      <Navigation />

      {/* Header Section */}
      <div className="pt-20 pb-12 bg-gradient-to-br from-[#FACC15] via-[#FACC15]/90 to-[#FACC15]/80">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-[#0F0F0F] mb-6">
            Portfolio Collection
          </h1>
          <p className="text-xl text-[#0F0F0F]/80 max-w-3xl mx-auto">
            Explore my comprehensive portfolio of enterprise solutions, mobile
            apps, and web platforms. From healthcare to fintech, each project
            showcases innovation and technical excellence.
          </p>
        </div>
      </div>

      {/* Search dan Filter */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-[#F3F4F6]/70 mb-6">
          <Link href="/" className="hover:text-[#FACC15] transition-colors">
            Home
          </Link>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-[#F3F4F6] font-medium">Portfolio</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-[#F3F4F6]/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search projects, technologies, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0F0F0F]/50 border border-[#F3F4F6]/20 text-[#F3F4F6] rounded-lg focus:ring-2 focus:ring-[#FACC15] focus:border-transparent placeholder-[#F3F4F6]/40"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 max-w-2xl">
            {categories.slice(0, 6).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#FACC15] text-[#0F0F0F]"
                    : "bg-[#0F0F0F] border border-[#F3F4F6]/20 text-[#F3F4F6] hover:bg-[#F3F4F6]/10"
                }`}
              >
                {category}
              </button>
            ))}
            {categories.length > 6 && (
              <div className="relative group">
                <button className="px-4 py-2 rounded-lg font-medium bg-[#0F0F0F] border border-[#F3F4F6]/20 text-[#F3F4F6] hover:bg-[#F3F4F6]/10 transition-colors">
                  More...
                </button>
                <div className="absolute top-full mt-2 right-0 bg-[#0F0F0F] border border-[#F3F4F6]/20 rounded-lg shadow-xl p-2 hidden group-hover:block z-10 min-w-[180px]">
                  {categories.slice(6).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCategory === category
                          ? "bg-[#FACC15] text-[#0F0F0F]"
                          : "text-[#F3F4F6] hover:bg-[#F3F4F6]/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-[#0F0F0F] border border-[#F3F4F6]/20 text-[#F3F4F6] rounded-lg focus:ring-2 focus:ring-[#FACC15] focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="company">By Company</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <div className="flex items-center justify-between">
          <p className="text-[#F3F4F6]/70">
            Showing{" "}
            <span className="font-medium text-[#F3F4F6]">
              {filteredProjects.length}
            </span>{" "}
            projects
            {selectedCategory !== "All Projects" && (
              <>
                {" "}
                in{" "}
                <span className="font-medium text-[#F3F4F6]">
                  {selectedCategory}
                </span>
              </>
            )}
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-[#F3F4F6]/50">Sort by:</span>
            <span className="text-sm font-medium text-[#F3F4F6] capitalize">
              {sortBy.replace("-", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Portfolio Grid - Grouped by Company */}
      {sortBy === "company" ? (
        <div className="max-w-7xl mx-auto px-8 mb-12 space-y-12">
          {sortedCompanies.map((company) => (
            <div key={company}>
              {/* Company Header */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-1 w-16 bg-[#FACC15] rounded-full"></div>
                  <h3 className="text-3xl font-light text-[#F3F4F6]">
                    {company}
                  </h3>
                  <div className="h-px flex-1 bg-[#F3F4F6]/10"></div>
                  <span className="text-sm text-[#F3F4F6]/50">
                    {groupedByCompany[company].length}{" "}
                    {groupedByCompany[company].length === 1
                      ? "project"
                      : "projects"}
                  </span>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedByCompany[company].map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-8 mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <div className="w-24 h-24 bg-[#F3F4F6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-[#F3F4F6]/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-[#F3F4F6] mb-4">
            No projects found
          </h3>
          <p className="text-[#F3F4F6]/70 mb-8 max-w-md mx-auto">
            {searchQuery
              ? `No projects match "${searchQuery}". Try adjusting your search terms.`
              : `No projects found in ${selectedCategory}. Try selecting a different category.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Projects");
              }}
              className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0F0F0F] px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Clear Filters
            </button>
            <Link
              href="/"
              className="border border-[#F3F4F6]/30 hover:border-[#FACC15] text-[#F3F4F6] px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: (typeof portfolioData)[0] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = Array.isArray(project.image)
    ? project.image
    : project.image
    ? [project.image]
    : [];

  const hasMultipleImages = images.length > 1;
  const hasLink = Boolean(project.link);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Link href={`/portfolio/${project.slug}`} className="block">
      <div className="group bg-[#0F0F0F] border border-[#F3F4F6]/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#FACC15]/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
        <div className="relative overflow-hidden h-64">
          {images.length > 0 ? (
            <>
              <Image
                src={images[currentImageIndex]}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Image Navigation for Multiple Images */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      prevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#0F0F0F]/80 hover:bg-[#FACC15] text-[#F3F4F6] hover:text-[#0F0F0F] rounded-full p-2 transition-all duration-300 z-10 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                  >
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0F0F0F]/80 hover:bg-[#FACC15] text-[#F3F4F6] hover:text-[#0F0F0F] rounded-full p-2 transition-all duration-300 z-10 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                  >
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? "bg-[#FACC15] w-6"
                            : "bg-[#F3F4F6]/50 hover:bg-[#F3F4F6]"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-[#0F0F0F] text-4xl font-bold select-none text-[#FACC15]">
              {project.title
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-[#0F0F0F]/90 backdrop-blur-sm text-[#F3F4F6] px-3 py-1 rounded-full text-sm font-medium">
              {project.categoryLabel}
            </span>
          </div>

          {/* Year Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-[#FACC15] text-[#0F0F0F] px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              {project.year}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#F3F4F6] group-hover:text-[#FACC15] transition-colors line-clamp-2 mb-1">
                {project.title}
              </h3>
              <span className="text-sm text-[#F3F4F6]/50">
                {project.company}
              </span>
            </div>
          </div>

          <p className="text-[#F3F4F6]/70 mb-4 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/30 px-2 py-1 rounded hover:bg-[#FACC15]/20 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/30 px-2 py-1 rounded">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-[#F3F4F6]/50 bg-[#F3F4F6]/5 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center text-[#FACC15] hover:text-[#FACC15]/80 font-medium transition-colors duration-300 group-hover:scale-105 transform text-sm">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
