"use client"
import React, { useState, useEffect, JSX } from 'react'
import { getPatients } from '../context/PatientContext'
import LoadingSpinner from './LoadingPage';
import { Patient } from '@/types/type';

const ProfilePage = (): JSX.Element => {
  const [user, setUser] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getPatients(); 
      setUser(data[0]);
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
          src={user?.profile} 
          alt="Profile" 
          className='w-32 h-32 rounded-full object-cover border-4 border-emerald-300 shadow-lg' 
        />
        <h1 className='text-3xl font-bold text-emerald-800 mt-3'>{user?.name}</h1>
        <p className='text-lg text-gray-600'>{user?.email}</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-5 w-full max-w-md'>
        <h2 className='text-xl font-semibold text-emerald-800 mb-2'>Contact Information</h2>
        <p className='text-gray-700'>Phone: {user?.phone}</p>
        <p className='text-gray-700'>Address: {user?.address}</p>
        <p className='text-gray-700'>{user?.city}, {user?.state}, {user?.country}</p>
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

export default ProfilePage;