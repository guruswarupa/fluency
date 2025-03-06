"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status when the component mounts
  useEffect(() => {
    const authStatus = Cookies.get("isAuthenticated") === "true"; // assuming the cookie name is "isAuthenticated"
    setIsAuthenticated(authStatus);
  }, []);

  // Handle sign out
  const handleSignOut = () => {
    Cookies.remove("isAuthenticated"); // Remove the authentication cookie
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-blue-600 text-xl font-semibold tracking-wide">
            🤖 Fluency
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-5 ml-auto">
          <NavLink href="/" label="Home" />
          <NavLink href="/learn" label="Learn" />
          <NavLink href="/exercises" label="Exercises" />
          <NavLink href="/chat-ai" label="AI Assistant" />
          <NavLink href="/about" label="About" />
          <NavLink href="/contact" label="Contact" />
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-3 items-center">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-base"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-base"
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-base"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center space-y-5 py-5 md:hidden">
          <NavLink href="/" label="Home" />
          <NavLink href="/learn" label="Learn" />
          <NavLink href="/exercises" label="Exercises" />
          <NavLink href="/chat-ai" label="AI Assistant" />
          <NavLink href="/about" label="About" />
          <NavLink href="/contact" label="Contact" />
          <div className="flex space-x-3 w-full justify-center">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition w-24 text-center text-base"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-base"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-base w-24 text-center"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Reusable NavLink Component
function NavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="text-gray-800 text-base hover:bg-gray-100 px-4 py-2 rounded-md transition"
    >
      {label}
    </Link>
  );
}
