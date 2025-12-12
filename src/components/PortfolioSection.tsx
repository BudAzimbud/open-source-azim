import Image from "next/image";
import { useState, useEffect } from "react";
import {
  portfolioData,
  portfolioCategories,
  portfolioStats,
  techStack,
  PortfolioItem,
} from "@/datas/portfolio";

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filteredPortfolio = portfolioData
    .sort((a, b) => +b.year - +a.year)
    .filter((project) => {
      if (activeFilter === "All Projects") return true;
      return project.categoryLabel === activeFilter;
    });

  // Group projects by company
  const groupedByCompany = filteredPortfolio.reduce((acc, project) => {
    const company = project.company || "Other Projects";
    if (!acc[company]) {
      acc[company] = [];
    }
    acc[company].push(project);
    return acc;
  }, {} as Record<string, PortfolioItem[]>);

  // Sort companies to show B ONE CONSULTING first, then alphabetically
  const sortedCompanies = Object.keys(groupedByCompany).sort((a, b) => {
    if (a === "B ONE CONSULTING") return -1;
    if (b === "B ONE CONSULTING") return 1;
    if (a === "Personal Project") return 1;
    if (b === "Personal Project") return -1;
    return a.localeCompare(b);
  });

  return (
    <section className="py-20 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F3F4F6] mb-6">
            Enterprise Solutions I've Built
          </h2>
          <p className="text-lg sm:text-xl text-[#F3F4F6]/70 max-w-3xl mx-auto">
            Full-stack applications that solve real business problems for
            companies across various industries
          </p>
        </div>

        {/* Grouped Portfolio by Company */}
        <div className="space-y-12 sm:space-y-16">
          {sortedCompanies.map((company) => (
            <div key={company}>
              {/* Company Header */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-1 w-12 sm:w-16 bg-[#FACC15] rounded-full"></div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#F3F4F6]">
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

              {/* Portfolio Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {groupedByCompany[company].map((project) => (
                  <PortfolioCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Portfolio Card Component
function PortfolioCard({ project }: { project: PortfolioItem }) {
  const [showImageModal, setShowImageModal] = useState(false);
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

  const handleImageClick = () => {
    if (!hasLink && images.length > 0) {
      setShowImageModal(true);
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showImageModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showImageModal]);

  return (
    <>
      <div className="group bg-[#0F0F0F] border border-[#F3F4F6]/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#FACC15]/50 transition-all duration-500 hover:-translate-y-2">
        <div className="relative overflow-hidden h-48 sm:h-64">
          {images.length > 0 ? (
            <>
              <Image
                src={images[currentImageIndex]}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Image Navigation for Multiple Images */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#0F0F0F]/80 hover:bg-[#FACC15] text-[#F3F4F6] hover:text-[#0F0F0F] rounded-full p-2 transition-all duration-300 z-10 backdrop-blur-sm"
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
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0F0F0F]/80 hover:bg-[#FACC15] text-[#F3F4F6] hover:text-[#0F0F0F] rounded-full p-2 transition-all duration-300 z-10 backdrop-blur-sm"
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
            <div
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #FACC15 0%, #FACC15 50%, #FACC15 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="flex items-center justify-center h-full w-full bg-[#0F0F0F] text-4xl font-bold select-none"
            >
              {project.title
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 1)
                .toUpperCase()}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-3 sm:space-x-4">
              {hasLink ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FACC15]/90 backdrop-blur-sm rounded-full p-2 sm:p-3 text-[#0F0F0F] hover:bg-[#FACC15] transition-colors"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ) : images.length > 0 ? (
                <button
                  onClick={handleImageClick}
                  className="bg-[#FACC15]/90 backdrop-blur-sm rounded-full p-2 sm:p-3 text-[#0F0F0F] hover:bg-[#FACC15] transition-colors"
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
                </button>
              ) : null}
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
            <span className="text-xs sm:text-sm text-[#F3F4F6]/50">
              {project.year}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-[#F3F4F6] mb-2 line-clamp-2">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-[#F3F4F6]/70 mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/30 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Full Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-screen p-4 sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-[#0F0F0F]/80 hover:bg-[#FACC15] text-[#F3F4F6] hover:text-[#0F0F0F] rounded-full p-3 transition-all duration-300 z-50 backdrop-blur-sm"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Navigation for Multiple Images in Modal */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-[#0F0F0F]/80 hover:bg-[#FACC15] text-[#F3F4F6] hover:text-[#0F0F0F] rounded-full p-3 sm:p-4 transition-all duration-300 backdrop-blur-sm"
                >
                  <svg
                    className="w-6 h-6"
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
                    nextImage();
                  }}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-[#0F0F0F]/80 hover:bg-[#FACC15] text-[#F3F4F6] hover:text-[#0F0F0F] rounded-full p-3 sm:p-4 transition-all duration-300 backdrop-blur-sm"
                >
                  <svg
                    className="w-6 h-6"
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

                {/* Image Counter */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 bg-[#0F0F0F]/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-[#F3F4F6] text-sm font-medium">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                </div>

                {/* Thumbnail Navigation */}
                <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4 pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex
                          ? "border-[#FACC15] scale-110"
                          : "border-[#F3F4F6]/20 hover:border-[#F3F4F6]/50"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Project Info */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-[#0F0F0F]/80 backdrop-blur-sm rounded-xl p-4 max-w-md">
              <h3 className="text-lg sm:text-xl font-semibold text-[#F3F4F6] mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-[#F3F4F6]/70">
                {project.company} • {project.year}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Portfolio Stats Component
function PortfolioStats() {
  return (
    <div className="mt-20 bg-gradient-to-r from-[#FACC15] to-[#FACC15]/80 rounded-3xl p-12 text-[#0F0F0F]">
      <div className="grid md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl font-light mb-2">
            {portfolioStats.projectsDelivered}+
          </div>
          <div className="text-[#0F0F0F]/70">Projects Delivered</div>
        </div>
        <div>
          <div className="text-4xl font-light mb-2">
            {portfolioStats.clientSatisfaction}%
          </div>
          <div className="text-[#0F0F0F]/70">Client Satisfaction</div>
        </div>
        <div>
          <div className="text-4xl font-light mb-2">
            {portfolioStats.industriesServed}+
          </div>
          <div className="text-[#0F0F0F]/70">Industries Served</div>
        </div>
        <div>
          <div className="text-4xl font-light mb-2">
            {portfolioStats.yearsExperience}+
          </div>
          <div className="text-[#0F0F0F]/70">Years Experience</div>
        </div>
      </div>
    </div>
  );
}

// Case Study CTA Component
function CaseStudyCTA() {
  return (
    <div className="mt-12 sm:mt-16 text-center bg-[#0F0F0F]/50 border border-[#F3F4F6]/10 rounded-2xl sm:rounded-3xl p-8 sm:p-12">
      <h3 className="text-2xl sm:text-3xl font-light text-[#F3F4F6] mb-4">
        Want to See Detailed Case Studies?
      </h3>
      <p className="text-base sm:text-lg text-[#F3F4F6]/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
        Explore in-depth breakdowns of how I approached complex business
        problems, the technical solutions implemented, and the measurable
        results achieved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0F0F0F] px-6 sm:px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform text-sm sm:text-base">
          View Case Studies →
        </button>
        <button className="border border-[#F3F4F6]/30 hover:border-[#FACC15] hover:bg-[#F3F4F6]/5 text-[#F3F4F6] px-6 sm:px-8 py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base">
          Download Portfolio PDF
        </button>
      </div>
    </div>
  );
}
