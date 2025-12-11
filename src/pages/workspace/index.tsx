import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { workspaceList } from "@/datas/workspace";

// Sample data - ini akan berisi data workspace yang tersedia
const workspaceData = workspaceList;

const categories = [
  "All",
  "Gaming",
  "Productivity",
  "Streaming",
  "Development",
  "Design",
  "Mobile",
];

export default function WorkspaceList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // Filter dan sort data
  const filteredWorkspaces = workspaceData
    .filter((workspace) => {
      const matchesSearch =
        workspace.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workspace.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        workspace.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All" || workspace.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
      }
      if (sortBy === "newest")
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
      if (sortBy === "items") return b.itemCount - a.itemCount;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Navigation */}
      <Navigation />

      {/* Header Section */}
      <div className="pt-20 pb-12 bg-gradient-to-br from-[#FACC15] via-[#FACC15]/90 to-[#FACC15]/80">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-[#0F0F0F] mb-6">
            Workspace Collection
          </h1>
          <p className="text-xl text-[#0F0F0F]/80 max-w-3xl mx-auto">
            Discover amazing workspace setups from around the world. Get
            inspired by gaming rigs, productivity stations, streaming studios,
            and more.
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
          <span className="text-[#F3F4F6] font-medium">Workspaces</span>
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
                placeholder="Search workspaces, tools, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0F0F0F]/50 border border-[#F3F4F6]/20 text-[#F3F4F6] rounded-lg focus:ring-2 focus:ring-[#FACC15] focus:border-transparent placeholder-[#F3F4F6]/40"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
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
          </div>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-[#0F0F0F] border border-[#F3F4F6]/20 text-[#F3F4F6] rounded-lg focus:ring-2 focus:ring-[#FACC15] focus:border-transparent"
          >
            <option value="featured">Featured First</option>
            <option value="newest">Newest First</option>
            <option value="items">Most Items</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <div className="flex items-center justify-between">
          <p className="text-[#F3F4F6]/70">
            Showing{" "}
            <span className="font-medium text-[#F3F4F6]">
              {filteredWorkspaces.length}
            </span>{" "}
            workspaces
            {selectedCategory !== "All" && (
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

      {/* Workspace Grid */}
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="group bg-[#0F0F0F] border border-[#F3F4F6]/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#FACC15]/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={workspace.image}
                  alt={workspace.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <Link
                      href={`/workspace/${workspace.id}`}
                      className="bg-[#FACC15]/90 backdrop-blur-sm rounded-full p-3 text-[#0F0F0F] hover:bg-[#FACC15] transition-colors"
                    >
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Link>
                    <button className="bg-[#FACC15]/90 backdrop-blur-sm rounded-full p-3 text-[#0F0F0F] hover:bg-[#FACC15] transition-colors">
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Featured Badge */}
                {workspace.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FACC15] text-[#0F0F0F] px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      Featured
                    </span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-[#0F0F0F]/90 backdrop-blur-sm text-[#F3F4F6] px-3 py-1 rounded-full text-sm font-medium">
                    {workspace.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-[#F3F4F6] group-hover:text-[#FACC15] transition-colors">
                    {workspace.title}
                  </h3>
                  <span className="text-sm text-[#F3F4F6]/50">
                    {workspace.itemCount} items
                  </span>
                </div>

                <p className="text-[#F3F4F6]/70 mb-4 leading-relaxed">
                  {workspace.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {workspace.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/30 px-2 py-1 rounded-full hover:bg-[#FACC15]/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {workspace.tags.length > 3 && (
                    <span className="text-xs bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/30 px-2 py-1 rounded-full">
                      +{workspace.tags.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#F3F4F6]/50">
                    Updated{" "}
                    {new Date(workspace.lastUpdated).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/workspace/${workspace.id}`}
                    className="inline-flex items-center text-[#FACC15] hover:text-[#FACC15]/80 font-medium transition-colors duration-300 group-hover:scale-105 transform"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/submit-workspace"
          className="group flex items-center space-x-3 bg-gradient-to-r from-[#FACC15] to-[#FACC15]/90 text-[#0F0F0F] rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 bg-[#0F0F0F]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-5 h-5 text-[#0F0F0F]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">Submit Your</div>
            <div className="text-sm font-medium">Workspace</div>
          </div>
        </Link>
      </div>

      {/* Empty State */}
      {filteredWorkspaces.length === 0 && (
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
            No workspaces found
          </h3>
          <p className="text-[#F3F4F6]/70 mb-8 max-w-md mx-auto">
            {searchQuery
              ? `No workspaces match "${searchQuery}". Try adjusting your search terms.`
              : `No workspaces found in ${selectedCategory}. Try selecting a different category.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0F0F0F] px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Clear Filters
            </button>
            <Link
              href="/workspace"
              className="border border-[#F3F4F6]/30 hover:border-[#FACC15] text-[#F3F4F6] px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Browse All
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
