"use client";
import React from 'react';
import Header from './Header';
import Image from 'next/image';
import { 
  HeartIcon, 
  UserGroupIcon, 
  PhoneIcon, 
  ClockIcon,
  BeakerIcon,
  MicroscopeIcon,
  HeartPulseIcon,
  EyeIcon,
  SparklesIcon,
  ShieldCheckIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Footer from './Footer';
const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Cardiology",
      icon: HeartIcon,
      description: "Comprehensive heart care services including diagnostics, treatment, and preventive care.",
      features: ["ECG & Stress Tests", "Echocardiography", "Cardiac Rehabilitation", "Heart Disease Prevention"]
    },
    {
      id: 2,
      title: "Neurology",
      icon: SparklesIcon,
      description: "Expert neurological care for conditions affecting the brain, spine, and nervous system.",
      features: ["Brain Mapping", "Nerve Conduction Studies", "Stroke Care", "Neurological Rehabilitation"]
    },
    {
      id: 3,
      title: "Ophthalmology",
      icon: EyeIcon,
      description: "Complete eye care services from routine check-ups to advanced surgical procedures.",
      features: ["Vision Screening", "Glaucoma Treatment", "Cataract Surgery", "Retinal Care"]
    },
    {
      id: 4,
      title: "Dental Care",
      icon: ShieldCheckIcon,
      description: "Comprehensive dental services for all ages with modern technology and techniques.",
      features: ["Preventive Care", "Cosmetic Dentistry", "Orthodontics", "Emergency Dental Care"]
    },
    {
      id: 5,
      title: "Laboratory Services",
      icon: BeakerIcon,
      description: "State-of-the-art diagnostic laboratory services with quick and accurate results.",
      features: ["Blood Tests", "Pathology", "Microbiology", "Genetic Testing"]
    },
    {
      id: 6,
      title: "Pediatrics",
      icon: UserGroupIcon,
      description: "Specialized care for children from birth through adolescence.",
      features: ["Well-child Visits", "Vaccinations", "Growth Monitoring", "Developmental Assessment"]
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Patient",
      image: "/images/patient1.jpg",
      text: "The cardiology department provided exceptional care. The staff was professional and the facilities are world-class.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Patient",
      image: "/images/patient2.jpg",
      text: "The pediatric care team was amazing with my children. They made the whole experience comfortable and stress-free.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Patient",
      image: "/images/patient3.jpg",
      text: "The dental care service exceeded my expectations. The team was thorough and made me feel at ease throughout.",
      rating: 5
    }
  ];

  const healthTips = [
    {
      id: 1,
      title: "Regular Check-ups",
      description: "Schedule annual health check-ups to maintain your well-being and catch potential issues early.",
      icon: ClockIcon
    },
    {
      id: 2,
      title: "Healthy Lifestyle",
      description: "Maintain a balanced diet and regular exercise routine for optimal health.",
      icon: HeartIcon
    },
    {
      id: 3,
      title: "Preventive Care",
      description: "Stay up-to-date with vaccinations and preventive screenings.",
      icon: BeakerIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-emerald-100/30">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        {/* Hero Section with Background Pattern */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-500 mb-20">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
          <div className="relative px-8 py-16 text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <Image
                src="/images/mascot.png"
                alt="Medical Services"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">Our Medical Services</h1>
            <p className="text-xl text-emerald-50 max-w-3xl mx-auto">
              Comprehensive healthcare services delivered with expertise, compassion, and cutting-edge technology.
            </p>
          </div>
        </div>

        {/* Services Grid with Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-4 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors duration-300">
                      {Icon && <Icon className="w-10 h-10 text-emerald-600" />}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 ml-4">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <button className="w-full py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center group">
                    <span>Learn More</span>
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Process Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 max-w-7xl mx-auto">
          <div className="relative h-64 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3"
              alt="Medical Process"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-emerald-500/80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Our Service Process</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Book Appointment</h3>
              <p className="text-sm text-gray-600">Schedule your visit through our easy booking system</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Initial Consultation</h3>
              <p className="text-sm text-gray-600">Meet with our specialists for assessment</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Treatment Plan</h3>
              <p className="text-sm text-gray-600">Receive personalized care recommendations</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Follow-up Care</h3>
              <p className="text-sm text-gray-600">Ongoing support and monitoring</p>
            </div>
          </div>
        </div>

        {/* Health Tips Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 max-w-7xl mx-auto">
          <div className="relative h-64 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3"
              alt="Health Tips"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-emerald-500/80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Health Tips & Guidelines</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.id} className="p-6 bg-emerald-50 rounded-xl">
                  <Icon className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 max-w-7xl mx-auto">
          <div className="relative h-64 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3"
              alt="Patient Testimonials"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-emerald-500/80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">What Our Patients Say</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Services Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 max-w-7xl mx-auto">
          <div className="relative h-64 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3"
              alt="Additional Services"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-emerald-500/80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Additional Services</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
              <PhoneIcon className="w-6 h-6 text-emerald-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Telemedicine</h3>
                <p className="text-sm text-gray-600">Virtual consultations from the comfort of your home</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
              <ClockIcon className="w-6 h-6 text-emerald-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Extended Hours</h3>
                <p className="text-sm text-gray-600">Flexible appointment scheduling for your convenience</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-emerald-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Health Packages</h3>
                <p className="text-sm text-gray-600">Comprehensive health check-up packages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="relative h-96 w-full mb-8 rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3"
              alt="Contact Us"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-emerald-500/90"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h2 className="text-4xl font-bold mb-4">Need Help Choosing a Service?</h2>
              <p className="text-xl mb-8 max-w-2xl">
                Our medical professionals are here to guide you to the right service for your needs.
              </p>
              <button className="px-8 py-3 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-300 font-semibold">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
