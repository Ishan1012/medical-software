"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  HeartIcon, 
  UserGroupIcon, 
  ClockIcon,
  ShareIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-700"></div>
  </div>
);

const BlogPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingSpinner />;
  }

  const categories = [
    { id: 1, name: "General Health", icon: HeartIcon },
    { id: 2, name: "Mental Health", icon: UserGroupIcon },
    { id: 3, name: "Medical Research", icon: BookmarkIcon },
    { id: 4, name: "Patient Stories", icon: ChatBubbleLeftIcon }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "Understanding Heart Health: A Comprehensive Guide",
      excerpt: "Learn about maintaining a healthy heart and preventing cardiovascular diseases with expert insights from our cardiology team.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3",
      category: "General Health",
      author: {
        name: "Dr. Sarah Johnson",
        role: "Cardiologist",
        image: "/images/doctor1.jpg"
      },
      date: "March 15, 2024",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "The Impact of Mental Health on Physical Well-being",
      excerpt: "Exploring the crucial connection between mental and physical health, and strategies for maintaining overall wellness.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3",
      category: "Mental Health",
      author: {
        name: "Dr. Michael Chen",
        role: "Psychiatrist",
        image: "/images/doctor2.jpg"
      },
      date: "March 14, 2024",
      readTime: "6 min read"
    }
  ];

  const recentArticles = [
    {
      id: 3,
      title: "Breakthrough in Medical Research: New Treatment Options",
      excerpt: "Latest developments in medical research that could revolutionize treatment approaches for various conditions.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3",
      category: "Medical Research",
      author: {
        name: "Dr. Emily Davis",
        role: "Research Director",
        image: "/images/doctor3.jpg"
      },
      date: "March 13, 2024",
      readTime: "10 min read"
    },
    // Add more articles as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30 pt-15">
      {/* Hero Section */}
      <div className="relative bg-emerald-600 text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-5xl font-bold mb-6 text-center">WellNest Blog</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Stay informed with the latest medical insights, research updates, and health tips from our expert team.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="w-6 h-6 text-emerald-600" />
                <span className="font-medium text-gray-700">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Articles Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={article.author.image}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{article.author.name}</p>
                      <p className="text-sm text-gray-600">{article.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <ClockIcon className="w-5 h-5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Articles Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={article.author.image}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{article.author.name}</p>
                      <p className="text-xs text-gray-600">{article.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-sm">{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-emerald-50 mb-8">
              Stay updated with the latest medical insights, health tips, and WellNest news.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl border-2 border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-colors duration-300"
              />
              <button className="px-8 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300 border-2 border-emerald-200 hover:border-emerald-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Sharing Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Share This Article</h2>
          <div className="flex gap-4">
            <button className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300">
              <FaFacebook className="w-6 h-6" />
            </button>
            <button className="p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors duration-300">
              <FaTwitter className="w-6 h-6" />
            </button>
            <button className="p-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors duration-300">
              <FaLinkedin className="w-6 h-6" />
            </button>
            <button className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-300">
              <FaWhatsapp className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
