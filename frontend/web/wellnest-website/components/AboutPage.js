"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  HeartIcon, 
  SparklesIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { testimonials } from '../Services/getTestimonials';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-700"></div>
  </div>
);

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission logic here
    console.log('Feedback submitted:', { name, feedback });
    setFeedback('');
    setName('');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">We Value Your Feedback</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-in-out"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-in-out"
            placeholder="Share your thoughts..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingSpinner />;
  }

  const values = [
    {
      id: 1,
      title: "Excellence in Care",
      description: "Committed to providing the highest standard of medical care and patient service.",
      icon: StarIcon
    },
    {
      id: 2,
      title: "Innovation",
      description: "Continuously adopting the latest medical technologies and treatment methods.",
      icon: SparklesIcon
    },
    {
      id: 3,
      title: "Patient-Centered",
      description: "Putting patients first with personalized care and attention to individual needs.",
      icon: HeartIcon
    },
    {
      id: 4,
      title: "Trust & Safety",
      description: "Maintaining the highest standards of medical ethics and patient safety.",
      icon: ShieldCheckIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30 pt-15">
      {/* Hero Section */}
      <div className="relative bg-emerald-600 text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About WellNest</h1>
            <p className="text-xl text-emerald-50">
              Providing exceptional healthcare with compassion, innovation, and excellence since 2009.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/images/hero-image2.png"
              alt="WellNest Mission"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
            <p className="text-gray-600 mb-6">
              At WellNest, our mission is to provide exceptional healthcare services that improve the quality of life for our patients. 
              We combine cutting-edge medical technology with compassionate care to ensure the best possible outcomes.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-emerald-600 mt-1" />
                <p className="text-gray-600">Patient-centered care approach</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-emerald-600 mt-1" />
                <p className="text-gray-600">Continuous medical innovation</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-emerald-600 mt-1" />
                <p className="text-gray-600">Community health improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values && values.length > 0 && values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Icon className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Testimonials Section */}
      <section className="min-h-screen py-24 bg-white relative flex items-center mb-[5vh]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.25),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            What Our Patients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {testimonials.slice(0, 4).map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="h-15 w-15 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.status}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {testimonial.testimonial}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Feedback Form Section */}
      <FeedbackForm />

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Medical Family</h2>
          <p className="text-emerald-50 mb-8 max-w-2xl mx-auto">
            Experience healthcare excellence with our team of dedicated professionals. 
            We&apos;re here to provide you with the best medical care and support.
          </p>
          <Link href="/appointment" passHref>
            <button className="px-8 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300 cursor-pointer">
              Book an Appointment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
