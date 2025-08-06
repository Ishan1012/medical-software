"use client"
import React, { useState, useEffect } from 'react'
import { getPatients } from '../Services/getPatients'

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-700"></div>
  </div>
);

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      // In a real application, you would fetch this data from an API
      const user = getPatients[0]; // For demonstration, using the first patient
      setUser(user);
    };

    fetchUser();
    setLoading(false);
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='flex flex-row items-center justify-center h-screen p-5 bg-emerald-50 gap-10'>
      <div className='flex flex-col items-center mb-5'>
        <img 
          src={user.profilePicture} 
          alt="Profile" 
          className='w-32 h-32 rounded-full object-cover border-4 border-emerald-300 shadow-lg' 
        />
        <h1 className='text-3xl font-bold text-emerald-800 mt-3'>{user.name}</h1>
        <p className='text-lg text-gray-600'>{user.email}</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-5 w-full max-w-md'>
        <h2 className='text-xl font-semibold text-emerald-800 mb-2'>Contact Information</h2>
        <p className='text-gray-700'>Phone: {user.phone}</p>
        <p className='text-gray-700'>Address: {user.address}</p>
        <p className='text-gray-700'>{user.city}, {user.state} {user.zip}, {user.country}</p>
        <div className='mt-5 flex space-x-4'>
          <button 
            className='bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600 transition duration-200' 
            onClick={() => { /* Handle view records */ }}
          >
            View Medical Records
          </button>
        </div>
      </div>
    </div>
  )
}
