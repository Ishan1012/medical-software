import { Doctor } from '@/types/type';
import Image from 'next/image';
import React, { ChangeEvent, ChangeEventHandler, FC, FormEvent, JSX, useState } from 'react';

type DoctorFormData = Omit<Doctor, 'id' | 'email' | 'password' | 'profileUrl'> & {
    profileUrl: string | File | null;
};

const DoctorRegistrationPage = (): JSX.Element => {
    const [formData, setFormData] = useState<DoctorFormData>({
        name: '',
        specialty: '',
        qualifications: '',
        address: '',
        phone: '',
        experience: '',
        profileUrl: null,
        availability: [],
        timeSlots: [],
        lat: 0,
        lng: 0,
        notifications: {
            appointmentReminders: true,
            healthTips: false,
            promotionalUpdates: false,
        },
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

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
        const target = e.target as HTMLInputElement;

        if (type === 'checkbox') {
            const checked = target.checked;

            if (name.startsWith('notifications.')) {
                const notificationKey = name.split('.')[1] as keyof typeof formData.notifications;
                setFormData(prev => ({
                    ...prev,
                    notifications: {
                        ...prev.notifications,
                        [notificationKey]: checked
                    }
                }));
            } else if (name === 'timeSlots') {
                setFormData(prev => ({
                    ...prev,
                    timeSlots: checked
                        ? [...prev.timeSlots, value]
                        : prev.timeSlots.filter(item => item !== value)
                }));
            } else if (name === 'availability') {
                setFormData(prev => ({
                    ...prev,
                    availability: checked
                        ? [...prev.availability, value]
                        : prev.availability.filter(item => item !== value)
                }));
            }
        } else if (name === 'lat' || name === 'lng' || name === 'experience') {
            setFormData(prev => ({
                ...prev,
                [name]: parseFloat(value) || 0
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
            setProfileImageFile(file);
            
            const reader = new FileReader();
            reader.onload = (event) => setImagePreview(event.target?.result as string);
            reader.readAsDataURL(file);
        } else {
            setProfileImageFile(null);
            setImagePreview(null);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const dataForSubmission = {
            ...formData,
            profileUrl: profileImageFile ? `[FILE_UPLOADED_AS_${profileImageFile.name}]` : '',
        };

        console.log('Form Data for Submission:', dataForSubmission);
        console.log('Registration submitted successfully!');
    };

    const InputField: FC<{ name: keyof DoctorFormData, label: string, type?: string, value: string | number, placeholder: string }> = ({ name, label, type = 'text', value, placeholder }) => (
        <div>
            <label className="block text-sm font-semibold text-emerald-900 mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={typeof value === 'number' && name !== 'phone' ? value.toString() : value}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 bg-gray-50 
                    focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                placeholder={placeholder}
                required
            />
        </div>
    );

    return (
        <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-white to-green-50 pt-20 pb-20">
            <div className="max-w-4xl mx-auto animate-[fadeInUp_0.8s_ease-out]">

                <div className="text-center mb-8">
                    <div className="w-26 h-26 mx-auto mb-6 rounded-3xl flex items-center justify-center shadow-lg bg-transparent">
                        <div className="h-auto w-15 relative">
                            <Image src={'/images/mascot.png'} height={500} width={500} alt='hero' className='h-auto w-15' />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-emerald-900 mb-3 tracking-tight">Doctor Registration</h1>
                    <p className="text-emerald-800/80 text-lg">Join our healthcare platform and connect with patients</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-emerald-500/10 border border-emerald-100"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        <div className="space-y-6">

                            <InputField name="name" label="Full Name *" value={formData.name} placeholder="Dr. Alan Mercer" />

                            <div>
                                <label className="block text-sm font-semibold text-emerald-900 mb-2">Medical Specialty *</label>
                                <select
                                    name="specialty"
                                    value={formData.specialty}
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

                            <InputField name="qualifications" label="Qualifications (e.g., MBBS, MD) *" value={formData.qualifications} placeholder="MBBS, MD (Medicine)" />
                            <InputField name="experience" label="Years of Experience *" type="number" value={formData.experience} placeholder="15" />

                            <InputField name="phone" label="Contact Phone Number *" type="tel" value={formData.phone} placeholder="+1 555 123 4567" />
                        </div>

                        <div className="space-y-6">

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

                            <InputField name="address" label="Clinic/Practice Address *" value={formData.address} placeholder="123 Health Blvd, City, Country" />

                            <div className="grid grid-cols-2 gap-4">
                                <InputField name="lat" label="Latitude (Map Location) *" type="number" value={formData.lat} placeholder="34.0522" />
                                <InputField name="lng" label="Longitude (Map Location) *" type="number" value={formData.lng} placeholder="-118.2437" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-8">
                        <div>
                            <label className="block text-sm font-semibold text-emerald-900 mb-3">Days of Availability *</label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                                {daysOfWeek.map(day => (
                                    <label key={day} className={`flex items-center justify-center space-x-2 cursor-pointer p-2 rounded-lg border transition-colors ${formData.availability.includes(day) ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-green-50'}`}>
                                        <input
                                            type="checkbox"
                                            name="availability"
                                            value={day}
                                            checked={formData.availability.includes(day)}
                                            onChange={handleInputChange}
                                            className="hidden"
                                        />
                                        <span className="text-xs font-medium">{day}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-emerald-900 mb-3">Available Time Slots *</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                {timeSlotsAvailable.map(timeSlot => (
                                    <label key={timeSlot} className={`flex items-center justify-center space-x-2 cursor-pointer p-2 rounded-lg border transition-colors ${formData.timeSlots.includes(timeSlot) ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-green-50'}`}>
                                        <input
                                            type="checkbox"
                                            name="timeSlots"
                                            value={timeSlot}
                                            checked={formData.timeSlots.includes(timeSlot)}
                                            onChange={handleInputChange}
                                            className="hidden"
                                        />
                                        <span className="text-xs font-medium">{timeSlot}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

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

export default DoctorRegistrationPage;