'use client';
import { Doctor } from '@/types/type';
import React, { ChangeEvent, ChangeEventHandler, FormEvent, JSX, useState } from 'react';

const DoctorRegistration = (): JSX.Element => {
    const [formData, setFormData] = useState<Omit<Doctor, 'id' | 'email'>>({
        name: '',
        speciality: '',
        qualification: '',
        profileUrl: null,
        availability: [],
        timeSlots: [],
        rating: 0,
        ratingCount: 0,
        experience: '',
        description: '',
        whatsapp: '',
        facebook: '',
        instagram: '',
        x: ''
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const specialties: string[] = [
        'Consultant Physician (OPD)',
        'Cardiologist',
        'Dermatologist',
        'Neurologist',
        'Orthopedist',
        'Pediatrician',
        'Psychiatrist',
        'Gynecologist',
        'ENT Specialist',
        'Ophthalmologist',
        'Other'
    ];

    const daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlotsAvailable: string[] = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];

    const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (e) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox' && (name === 'availability' || name === 'timeSlots')) {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter(item => item !== value)
            }));
        } else if (name === 'rating') {
            setFormData(prev => ({
                ...prev,
                rating: parseFloat(value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onload = (event) => setImagePreview(event.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        alert('Registration submitted successfully!');
    };

    return (
        <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-white to-green-50 pt-20 pb-20">
            <div className="max-w-4xl mx-auto animate-[fadeInUp_0.8s_ease-out]">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                        <div className="h-full w-full flex items-center justify-center text-white font-bold text-lg">
                            WN
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-emerald-900 mb-3 tracking-tight">Doctor Registration</h1>
                    <p className="text-emerald-800/80 text-lg">Join our healthcare platform and connect with patients</p>
                </div>

                {/* Form Container */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-emerald-500/10 border border-emerald-100"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Left Column */}
                        <div className="space-y-6">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-emerald-900 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 bg-gray-50 
                    focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                                    placeholder="Dr. Alan Mercer"
                                    required
                                />
                            </div>

                            {/* Specialty */}
                            <div>
                                <label className="block text-sm font-semibold text-emerald-900 mb-2">Medical Specialty *</label>
                                <select
                                    name="specialty"
                                    value={formData.speciality}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 bg-gray-50 
                    focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                                    required
                                >
                                    <option value="">Select your specialty</option>
                                    {specialties.map(specialty => (
                                        <option key={specialty} value={specialty}>{specialty}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Qualification */}
                            <div>
                                <label className="block text-sm font-semibold text-emerald-900 mb-2">Qualifications *</label>
                                <input
                                    type="text"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 bg-gray-50 
                    focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                                    placeholder="MBBS, MD (Medicine)"
                                    required
                                />
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="block text-sm font-semibold text-emerald-900 mb-2">Years of Experience *</label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 bg-gray-50 
                    focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                                    placeholder="15"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">

                            {/* Profile Image */}
                            <div>
                                <label className="block text-sm font-semibold text-emerald-900 mb-2">Profile Image</label>
                                <div
                                    className="border-2 border-dashed border-emerald-500 rounded-xl p-8 text-center cursor-pointer bg-green-50 hover:bg-green-100"
                                    onClick={() => {
                                        const input = document.getElementById('image-input');
                                        if (input) input.click();
                                    }}
                                >
                                    <input
                                        id="image-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500 mx-auto"
                                        />
                                    ) : (
                                        <div className="py-4">
                                            <div className="text-4xl mb-4">📷</div>
                                            <p className="text-emerald-800 font-medium">Click to upload profile image</p>
                                            <p className="text-sm text-emerald-600 mt-2">PNG, JPG up to 5MB</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Availability */}
                            <div>
                                <label className="block text-sm font-semibold text-emerald-900 mb-3">Available Days *</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {daysOfWeek.map(day => (
                                        <label key={day} className="flex items-center space-x-3 cursor-pointer hover:bg-green-50 p-2 rounded-lg">
                                            <input
                                                type="checkbox"
                                                name="availability"
                                                value={day}
                                                checked={formData.availability.includes(day)}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-emerald-600 border-2 border-gray-300 rounded focus:ring-emerald-500"
                                            />
                                            <span className="text-sm text-emerald-800 font-medium">{day}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Available Time Slots */}
                            <div>
                                <label className="block text-sm font-semibold text-emerald-900 mb-3">Available Time Slots *</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {timeSlotsAvailable.map(day => (
                                        <label key={day} className="flex items-center space-x-3 cursor-pointer hover:bg-green-50 p-2 rounded-lg">
                                            <input
                                                type="checkbox"
                                                name="availability"
                                                value={day}
                                                checked={formData.availability.includes(day)}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-emerald-600 border-2 border-gray-300 rounded focus:ring-emerald-500"
                                            />
                                            <span className="text-sm text-emerald-800 font-medium">{day}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Full Width Sections */}
                    <div className="mt-8 space-y-6">

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-emerald-900 mb-2">Professional Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 bg-gray-50 
                  focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 resize-none"
                                rows={4}
                                placeholder="Describe your experience, specializations, and approach to patient care..."
                                required
                            />
                        </div>

                        {/* Social Links */}
                        <div>
                            <label className="block text-sm font-semibold text-emerald-900 mb-3">Social Media & Contact Links (Optional)</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="url"
                                    name="links.whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 bg-gray-50 
                    focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                                    placeholder="WhatsApp: +91 98310 00000"
                                />
                                <input
                                    type="url"
                                    name="links.facebook"
                                    value={formData.facebook}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 bg-gray-50 
                    focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                                    placeholder="Facebook: username"
                                />
                                <input
                                    type="url"
                                    name="links.instagram"
                                    value={formData.instagram}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 bg-gray-50 
                    focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                                    placeholder="Instagram: username"
                                />
                                <input
                                    type="url"
                                    name="links.x"
                                    value={formData.x}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 bg-gray-50 
                    focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                                    placeholder="X (Twitter): username"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-10">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 
                text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 
                hover:shadow-xl hover:shadow-emerald-500/25 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 cursor-pointer"
                        >
                            Complete Registration
                        </button>
                        <p className="text-sm text-emerald-600/70 mt-4">
                            By registering, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorRegistration;
