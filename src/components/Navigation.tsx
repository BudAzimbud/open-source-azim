import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      {/* Floating Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-gradient-to-r from-gray-500 to-gray-50 " : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <span
                className={`font-bold text-xl transition-colors duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white drop-shadow-lg"
                }`}
              >
                Azim
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`transition-all duration-300 hover:scale-105 font-medium ${
                  isActive("/")
                    ? "text-white font-semibold"
                    : "text-black drop-shadow-md hover:text-blue-200"
                }`}
              >
                Home
              </Link>
              <Link
                href="/article"
                className={`transition-all duration-300 hover:scale-105 font-medium ${
                  isActive("/article")
                    ? "text-white-600 font-semibold"
                    : "text-black drop-shadow-md hover:text-blue-200"
                }`}
              >
                Articles
              </Link>

              <Link
                href="/workspace"
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isScrolled
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl"
                    : "bg-blue-600/90 text-white border border-blue-500/50 hover:bg-blue-700 hover:border-blue-400 hover:shadow-xl"
                }`}
              >
                Explore Workspaces →
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/20 drop-shadow-md"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-lg border-t border-gray-200/70 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              <Link
                href="/"
                className={`block py-3 px-2 rounded-lg transition-all duration-300 ${
                  isActive("/")
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/article"
                className={`block py-3 px-2 rounded-lg transition-all duration-300 ${
                  isActive("/article")
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/portfolio"
                className="block py-3 px-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="#contact"
                className="block py-3 px-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Workspace CTA */}
              <Link
                href="/workspace"
                className="block mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-center transition-all duration-300 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore Workspaces →
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Floating Workspace Quick Access */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/workspace"
          className="group flex items-center space-x-3 bg-white/95 backdrop-blur-lg border border-gray-200/70 rounded-2xl px-4 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900">
              Workspaces
            </div>
            <div className="text-xs text-gray-600">Explore setups</div>
          </div>
        </Link>
      </div>
    </>
  );
}
