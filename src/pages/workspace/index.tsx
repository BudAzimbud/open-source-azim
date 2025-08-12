import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from "@/components/Footer";

// Sample data - ini akan berisi data workspace yang tersedia
const workspaceData = [
  {
    id: 'azim-setup',
    title: 'Azim\'s Gaming Setup',
    description: 'Complete gaming and productivity workspace with RGB lighting, dual monitors, and premium peripherals.',
    image: '/workspace_azim.webp',
    category: 'Gaming',
    tags: ['Gaming', 'RGB', 'Dual Monitor', 'Productivity'],
    itemCount: 12,
    featured: true,
    lastUpdated: '2024-12-20'
  },
  {
    id: 'minimal-setup',
    title: 'Minimal Productivity Station',
    description: 'Clean and minimal setup focused on productivity with essential tools and ergonomic design.',
    image: '/workspace_minimal.webp',
    category: 'Productivity',
    tags: ['Minimal', 'Productivity', 'Ergonomic', 'Clean'],
    itemCount: 8,
    featured: false,
    lastUpdated: '2024-12-18'
  },
  {
    id: 'streaming-setup',
    title: 'Professional Streaming Studio',
    description: 'Professional streaming setup with high-end camera, lighting, and audio equipment.',
    image: '/workspace_streaming.webp',
    category: 'Streaming',
    tags: ['Streaming', 'Professional', 'Camera', 'Lighting'],
    itemCount: 15,
    featured: true,
    lastUpdated: '2024-12-19'
  },
  {
    id: 'coding-setup',
    title: 'Developer\'s Coding Cave',
    description: 'Ultimate coding setup with multiple monitors, mechanical keyboard, and developer tools.',
    image: '/workspace_coding.webp',
    category: 'Development',
    tags: ['Coding', 'Multiple Monitors', 'Mechanical', 'Developer'],
    itemCount: 10,
    featured: false,
    lastUpdated: '2024-12-17'
  },
  {
    id: 'creative-setup',
    title: 'Creative Design Workspace',
    description: 'Creative workspace for designers with drawing tablet, color-accurate monitor, and design tools.',
    image: '/workspace_creative.webp',
    category: 'Design',
    tags: ['Design', 'Creative', 'Drawing Tablet', 'Color Accurate'],
    itemCount: 11,
    featured: false,
    lastUpdated: '2024-12-16'
  },
  {
    id: 'mobile-setup',
    title: 'Mobile Content Creation',
    description: 'Portable setup for mobile content creators with ring lights, tripods, and mobile accessories.',
    image: '/workspace_mobile.webp',
    category: 'Mobile',
    tags: ['Mobile', 'Content Creation', 'Portable', 'Ring Light'],
    itemCount: 7,
    featured: false,
    lastUpdated: '2024-12-15'
  }
];

const categories = ['All', 'Gaming', 'Productivity', 'Streaming', 'Development', 'Design', 'Mobile'];

export default function WorkspaceList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Filter dan sort data
  const filteredWorkspaces = workspaceData
    .filter(workspace => {
      const matchesSearch = workspace.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           workspace.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           workspace.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || workspace.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
      if (sortBy === 'newest') return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      if (sortBy === 'items') return b.itemCount - a.itemCount;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Workspace Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore amazing workspace setups from creators around the world. Get inspired and discover the tools behind each setup.
            </p>
          </div>

          {/* Search dan Filter */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search workspaces, tools, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
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
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest First</option>
              <option value="items">Most Items</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <p className="text-gray-600">
          Showing {filteredWorkspaces.length} workspace{filteredWorkspaces.length !== 1 ? 's' : ''}
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Workspace Grid */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        {filteredWorkspaces.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0M12 3v3m0 12v3" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No workspaces found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkspaces.map(workspace => (
              <Link key={workspace.id} href={`/workspace/${workspace.id}`}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
                  {/* Featured Badge */}
                  {workspace.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={workspace.image}
                      alt={workspace.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{
                        background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23f3f4f6"/><text x="200" y="100" text-anchor="middle" fill="%236b7280" font-size="16" font-family="Arial">Workspace Image</text></svg>') center/cover`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {workspace.title}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        {workspace.category}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {workspace.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {workspace.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {workspace.tags.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          +{workspace.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        {workspace.itemCount} items
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(workspace.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}