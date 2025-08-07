"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';
import { getPatients } from '../Services/getPatients';

export default function Header() {
  // const [user, setUser] = useState(getPatients()[0]);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 relative">
                {/* Placeholder for logo - replace with actual logo */}
                <div className="h-full w-full bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  WN
                </div>
              </div>
              <span className="ml-2 text-xl font-semibold text-emerald-800">WellNest</span>
            </Link>
          </div>

          {/* Right side container */}
          <div className="flex items-center justify-end flex-1">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 mr-4">
              <Link href="/appointment" className="text-gray-600 hover:text-emerald-600 px-2 py-1.5 text-sm font-medium transition-colors duration-200">
                Appointment
              </Link>
              <Link href="/consult" className="text-gray-600 hover:text-emerald-600 px-2 py-1.5 text-sm font-medium transition-colors duration-200">
                Smart Consult
              </Link>
              <Link href="/services" className="text-gray-600 hover:text-emerald-600 px-2 py-1.5 text-sm font-medium transition-colors duration-200">
                Services
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-emerald-600 px-2 py-1.5 text-sm font-medium transition-colors duration-200">
                Blog
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-emerald-600 px-2 py-1.5 text-sm font-medium transition-colors duration-200">
                About
              </Link>
            </nav>

            {/* Auth/Profile Buttons - Desktop */}
            {!user ? (
              <div className="hidden lg:flex items-center space-x-2">
                <Link href="/login" className="bg-emerald-800 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-emerald-900 transition-colors duration-200">
                  Login
                </Link>
                <Link href="/register" className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-emerald-200 transition-colors duration-200 border border-emerald-200">
                  Register
                </Link>
              </div>
            ) : (
              // Show profile icon only on desktop and when menu is not open
              <div className={`hidden lg:flex items-center ${isMenuOpen ? 'hidden' : ''}`}>
                <Link href={`/profile`} className="block px-2 py-2 rounded-full border border-gray-800 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600 transition-colors duration-200">
                  <UserIcon className="w-5 h-5" />
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-400 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors duration-200"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link href="/appointment" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200">
              Appointment
            </Link>
            <Link href="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200">
              Services
            </Link>
            <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200">
              Blog
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200">
              About
            </Link>
            {user ? (
              <div>
                <Link href={`/profile`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200">
                  Profile
                </Link>
              </div>
            ) : (
              <div>
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200">
                  Login
                </Link>
                <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
