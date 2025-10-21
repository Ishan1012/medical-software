'use client';
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, User, MessageSquare, Stethoscope, AlertTriangle, Clock, CheckCircle, Camera } from 'lucide-react';
import generateConsultation from '@/service/SmartConsultService';
import { getPatients } from '@/service/PatientService';

export default function ConsultPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [patient, setPatient] = useState(getPatients()[0]);
  const [formData, setFormData] = useState({
    patientid: patient.id,
    personalInfo: {
      name: '',
      age: '',
      gender: ''
    },
    symptoms: {
      primarySymptom: '',
      duration: '',
      severity: '',
      additionalSymptoms: '',
      image: null
    }
  });
  const [consultation, setConsultation] = useState(null);

  const steps = [
    { id: 'personal', title: 'Personal Information', icon: User },
    { id: 'symptoms', title: 'Symptoms & Concerns', icon: MessageSquare },
    { id: 'results', title: 'AI Consultation Results', icon: Stethoscope }
  ];

  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleConsultation = () => {
    try {
      let recommendation = generateConsultation(formData);
      setConsultation(recommendation);
    } catch (err) {
      console.log(err);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      handleConsultation();
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const isStepComplete = (stepIndex) => {
    if (stepIndex === 0) {
      return formData.personalInfo.name && formData.personalInfo.age && formData.personalInfo.gender;
    }
    if (stepIndex === 1) {
      return formData.symptoms.primarySymptom && formData.symptoms.duration && formData.symptoms.severity;
    }
    return true;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData('symptoms', 'image', file);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-emerald-600 bg-emerald-50';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'urgent': return AlertTriangle;
      case 'moderate': return Clock;
      default: return CheckCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-500/50 mt-12">

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-6 py-15">
        <div className="hidden md:flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep || (index === currentStep && isStepComplete(index));
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  isActive 
                    ? 'border-emerald-500 bg-emerald-500 text-white' 
                    : isCompleted 
                      ? 'border-emerald-500 bg-emerald-100 text-emerald-700'
                      : 'border-gray-300 bg-gray-100 text-gray-500'
                }`}>
                  <Icon size={20} />
                </div>
                <div className="ml-3">
                  <p className={`text-lg font-medium ${isActive ? 'text-emerald-700' : 'text-gray-500'}`}>
                    Step {index + 1}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="mx-4 text-emerald-600" size={16} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 overflow-hidden">
          {/* Step 1: Personal Information */}
          {currentStep === 0 && (
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Tell us about yourself</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.personalInfo.name}
                    onChange={(e) => updateFormData('personalInfo', 'name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      value={formData.personalInfo.age}
                      onChange={(e) => updateFormData('personalInfo', 'age', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter your age"
                      min="0"
                      max="120"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={formData.personalInfo.gender}
                      onChange={(e) => updateFormData('personalInfo', 'gender', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Symptoms */}
          {currentStep === 1 && (
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Describe your symptoms</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Primary Symptom or Concern</label>
                  <textarea
                    value={formData.symptoms.primarySymptom}
                    onChange={(e) => updateFormData('symptoms', 'primarySymptom', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    rows="3"
                    placeholder="Describe your main symptom or health concern..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Duration</label>
                    <select
                      value={formData.symptoms.duration}
                      onChange={(e) => updateFormData('symptoms', 'duration', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    >
                      <option value="">Select duration</option>
                      <option value="less-than-day">Less than a day</option>
                      <option value="1-3-days">1-3 days</option>
                      <option value="1-week">About a week</option>
                      <option value="1-month">About a month</option>
                      <option value="more-than-month">More than a month</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Severity</label>
                    <select
                      value={formData.symptoms.severity}
                      onChange={(e) => updateFormData('symptoms', 'severity', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    >
                      <option value="">Select severity</option>
                      <option value="mild">Mild - Doesn&apos;t interfere with daily activities</option>
                      <option value="moderate">Moderate - Some interference with activities</option>
                      <option value="severe">Severe - Significantly impacts daily life</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Additional Symptoms (Optional)</label>
                  <textarea
                    value={formData.symptoms.additionalSymptoms}
                    onChange={(e) => updateFormData('symptoms', 'additionalSymptoms', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    rows="2"
                    placeholder="Any other symptoms you're experiencing..."
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Upload Image (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-lg text-gray-600">Click to upload an image of your symptom</p>
                      {formData.symptoms.image && (
                        <p className="text-emerald-600 text-lg mt-2">Image uploaded: {formData.symptoms.image.name}</p>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {currentStep === 2 && consultation && (
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your AI Consultation Results</h2>
              
              {/* Urgency Badge */}
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium mb-6 ${getUrgencyColor(consultation.urgency)}`}>
                {React.createElement(getUrgencyIcon(consultation.urgency), { size: 16, className: 'mr-2' })}
                {consultation.urgency === 'urgent' ? 'Urgent - Seek immediate care' : 
                 consultation.urgency === 'moderate' ? 'Moderate priority' : 'Non-urgent'}
              </div>

              <div className="space-y-6">
                {/* Recommended Doctor */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-emerald-800 mb-2">Recommended Consultation</h3>
                  <p className="text-emerald-700 font-medium">{consultation.doctor}</p>
                  <p className="text-emerald-600 text-lg mt-2">{consultation.reasoning}</p>
                </div>

                {/* Health Tips */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">General Health Tips</h3>
                  <ul className="space-y-2">
                    {consultation.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-lg">
                    <strong>Disclaimer:</strong> This AI consultation is for informational purposes only and does not replace professional medical advice. Please consult with a qualified healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="bg-gray-50 px-8 py-4 flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                disabled={!isStepComplete(currentStep)}
                className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                  isStepComplete(currentStep)
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === 1 ? 'Get Consultation' : 'Next'}
                <ChevronRight size={16} className="ml-1" />
              </button>
            ) : (
              <button
                onClick={() => window.location.reload()}
                className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Start New Consultation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};