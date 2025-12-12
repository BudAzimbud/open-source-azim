import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import Image from "next/image";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { portfolioData } from "@/datas/portfolio";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ProjectDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const project = portfolioData.find((p) => p.slug === slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#F3F4F6] mb-4">
            Project Not Found
          </h1>
          <Link href="/workspace" className="text-[#FACC15] hover:underline">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const images = Array.isArray(project.image)
    ? project.image
    : project.image
    ? [project.image]
    : [];

  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0F0F0F]">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#FACC15] via-[#FACC15]/90 to-[#FACC15]/80 pt-20">
          <div className="max-w-7xl mx-auto px-8 py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-[#0F0F0F]/70 mb-6">
              <Link href="/" className="hover:text-[#0F0F0F] transition-colors">
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
              <Link
                href="/workspace"
                className="hover:text-[#0F0F0F] transition-colors"
              >
                Portfolio
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
              <span className="text-[#0F0F0F] font-medium">
                {project.title}
              </span>
            </nav>

            {/* Project Title */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#0F0F0F] text-[#FACC15] px-4 py-2 rounded-full text-sm font-medium">
                    {project.year}
                  </span>
                  <span className="bg-[#0F0F0F]/10 text-[#0F0F0F] px-4 py-2 rounded-full text-sm font-medium">
                    {project.categoryLabel}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-light text-[#0F0F0F] mb-4">
                  {project.title}
                </h1>
                {project.company && (
                  <p className="text-xl text-[#0F0F0F]/80 mb-4">
                    {project.company}
                  </p>
                )}
                <p className="text-lg text-[#0F0F0F]/70 leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0F0F0F] hover:bg-[#0F0F0F]/90 text-[#FACC15] px-6 py-3 rounded-xl font-medium transition-colors inline-flex items-center gap-2"
                >
                  Visit Site
                  <svg
                    className="w-5 h-5"
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
              )}
            </div>
          </div>
        </div>

        {/* Project Images */}
        {images.length > 0 && (
          <div className="max-w-7xl mx-auto px-8 -mt-12">
            <div className="bg-[#F3F4F6]/5 backdrop-blur-sm border border-[#F3F4F6]/10 rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative h-[600px] group">
                <Image
                  src={images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />

                {hasMultipleImages && (
                  <>
                    {/* Navigation Buttons */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0F0F0F]/80 hover:bg-[#FACC15] text-[#F3F4F6] hover:text-[#0F0F0F] rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
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
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0F0F0F]/80 hover:bg-[#FACC15] text-[#F3F4F6] hover:text-[#0F0F0F] rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
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
                    <div className="absolute bottom-4 right-4 bg-[#0F0F0F]/80 text-[#F3F4F6] px-4 py-2 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>

                    {/* Dot Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-[#FACC15] w-8"
                              : "bg-[#F3F4F6]/50 hover:bg-[#F3F4F6]"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {hasMultipleImages && (
                <div className="bg-[#0F0F0F]/50 p-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? "border-[#FACC15] scale-105"
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
                </div>
              )}
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              {/* Responsibilities */}
              {project.responsibilities &&
                project.responsibilities.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-light text-[#F3F4F6] mb-6 flex items-center gap-3">
                      <div className="h-1 w-12 bg-[#FACC15] rounded-full"></div>
                      My Responsibilities
                    </h2>
                    <ul className="space-y-4">
                      {project.responsibilities.map((responsibility, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-4 text-[#F3F4F6]/80 leading-relaxed"
                        >
                          <div className="mt-2 w-2 h-2 bg-[#FACC15] rounded-full flex-shrink-0"></div>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Project Overview */}
              <div>
                <h2 className="text-3xl font-light text-[#F3F4F6] mb-6 flex items-center gap-3">
                  <div className="h-1 w-12 bg-[#FACC15] rounded-full"></div>
                  Project Overview
                </h2>
                <p className="text-[#F3F4F6]/80 leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <div className="bg-[#F3F4F6]/5 border border-[#F3F4F6]/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-[#F3F4F6] mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/30 px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#FACC15]/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="bg-[#F3F4F6]/5 border border-[#F3F4F6]/10 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-[#F3F4F6] mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#F3F4F6]/5 text-[#F3F4F6]/70 px-3 py-2 rounded-lg text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className="bg-[#F3F4F6]/5 border border-[#F3F4F6]/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#F3F4F6] mb-4">
                  Project Info
                </h3>

                {project.company && (
                  <div>
                    <p className="text-[#F3F4F6]/50 text-sm mb-1">Company</p>
                    <p className="text-[#F3F4F6] font-medium">
                      {project.company}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-[#F3F4F6]/50 text-sm mb-1">Year</p>
                  <p className="text-[#F3F4F6] font-medium">{project.year}</p>
                </div>

                <div>
                  <p className="text-[#F3F4F6]/50 text-sm mb-1">Category</p>
                  <p className="text-[#F3F4F6] font-medium">
                    {project.categoryLabel}
                  </p>
                </div>

                {project.link && (
                  <div className="pt-4 border-t border-[#F3F4F6]/10">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0F0F0F] px-4 py-3 rounded-xl font-medium transition-colors w-full"
                    >
                      Visit Live Site
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

              {/* Back Button */}
              <Link
                href="/workspace"
                className="flex items-center justify-center gap-2 bg-[#F3F4F6]/5 hover:bg-[#F3F4F6]/10 border border-[#F3F4F6]/20 text-[#F3F4F6] px-4 py-3 rounded-xl font-medium transition-colors w-full"
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
                Back to Portfolio
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
