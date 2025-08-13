import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

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
      {/* Navigation */}
      <Navigation />
      
      {/* Header Section */}
      <div className="pt-20 pb-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6">
            Workspace Collection
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover amazing workspace setups from around the world. Get inspired by gaming rigs, 
            productivity stations, streaming studios, and more.
          </p>
        </div>
      </div>

      {/* Search dan Filter */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">Workspaces</span>
        </nav>

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

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-medium text-gray-900">{filteredWorkspaces.length}</span> workspaces
            {selectedCategory !== 'All' && (
              <> in <span className="font-medium text-gray-900">{selectedCategory}</span></>
            )}
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Sort by:</span>
            <span className="text-sm font-medium text-gray-900 capitalize">{sortBy.replace('-', ' ')}</span>
          </div>
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkspaces.map((workspace) => (
            <div key={workspace.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
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
                      className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-gray-900 hover:bg-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Featured Badge */}
                {workspace.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {workspace.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {workspace.title}
                  </h3>
                  <span className="text-sm text-gray-500">{workspace.itemCount} items</span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {workspace.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {workspace.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {workspace.tags.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      +{workspace.tags.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Updated {new Date(workspace.lastUpdated).toLocaleDateString()}
                  </span>
                  <Link 
                    href={`/workspace/${workspace.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 group-hover:scale-105 transform"
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
          className="group flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">No workspaces found</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {searchQuery 
              ? `No workspaces match "${searchQuery}". Try adjusting your search terms.`
              : `No workspaces found in ${selectedCategory}. Try selecting a different category.`
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Clear Filters
            </button>
            <Link 
              href="/workspace"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
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