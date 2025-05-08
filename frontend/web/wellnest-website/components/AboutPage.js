"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  HeartIcon, 
  UserGroupIcon, 
  SparklesIcon,
  ShieldCheckIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  TrophyIcon,
  AcademicCapIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-700"></div>
  </div>
);

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingSpinner />;
  }

  const stats = [
    { id: 1, number: "15+", label: "Years of Excellence", icon: ClockIcon },
    { id: 2, number: "50+", label: "Expert Doctors", icon: UserGroupIcon },
    { id: 3, number: "10k+", label: "Happy Patients", icon: HeartIcon },
    { id: 4, number: "25+", label: "Medical Awards", icon: TrophyIcon }
  ];

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

  const team = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "/images/doctor1.jpg",
      expertise: "Cardiology"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Head of Neurology",
      image: "/images/doctor2.jpg",
      expertise: "Neurology"
    },
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

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
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
          {values.map((value) => {
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

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {team.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-104">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-emerald-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.expertise}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Medical Family</h2>
          <p className="text-emerald-50 mb-8 max-w-2xl mx-auto">
            Experience healthcare excellence with our team of dedicated professionals. 
            We're here to provide you with the best medical care and support.
          </p>
          <button className="px-8 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300">
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
