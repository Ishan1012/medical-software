import React from 'react'

export default function generateConsultation(formData) {
    // Simple AI simulation based on symptoms
    const { primarySymptom, severity, duration } = formData.symptoms;

    let recommendation = {
        urgency: 'non-urgent',
        doctor: 'General Practitioner',
        tips: [],
        reasoning: ''
    };

    const symptomLower = primarySymptom.toLowerCase();

    if (symptomLower.includes('chest pain') || symptomLower.includes('heart') || symptomLower.includes('breathing')) {
        recommendation.urgency = severity === 'severe' ? 'urgent' : 'moderate';
        recommendation.doctor = 'Cardiologist or Emergency Care';
        recommendation.tips = [
            'Avoid strenuous activities',
            'Monitor your breathing',
            'Seek immediate care if symptoms worsen'
        ];
        recommendation.reasoning = 'Chest-related symptoms require prompt evaluation to rule out serious conditions.';
    } else if (symptomLower.includes('headache') || symptomLower.includes('migraine')) {
        recommendation.doctor = 'General Practitioner or Neurologist';
        recommendation.tips = [
            'Stay hydrated',
            'Rest in a dark, quiet room',
            'Apply cold or warm compress',
            'Keep a headache diary'
        ];
        recommendation.reasoning = 'Headaches can have various causes and may benefit from lifestyle modifications.';
    } else if (symptomLower.includes('fever') || symptomLower.includes('cold') || symptomLower.includes('flu')) {
        recommendation.doctor = 'General Practitioner';
        recommendation.tips = [
            'Get plenty of rest',
            'Stay hydrated with fluids',
            'Use over-the-counter pain relievers as needed',
            'Isolate if contagious'
        ];
        recommendation.reasoning = 'Common viral symptoms usually resolve with supportive care.';
    } else if (symptomLower.includes('stomach') || symptomLower.includes('nausea') || symptomLower.includes('digestive')) {
        recommendation.doctor = 'General Practitioner or Gastroenterologist';
        recommendation.tips = [
            'Eat bland, easy-to-digest foods',
            'Stay hydrated',
            'Avoid dairy and fatty foods temporarily',
            'Consider probiotics'
        ];
        recommendation.reasoning = 'Digestive issues often improve with dietary modifications and rest.';
    } else {
        recommendation.tips = [
            'Monitor your symptoms',
            'Get adequate rest',
            'Stay hydrated',
            'Maintain a healthy diet'
        ];
        recommendation.reasoning = 'General symptoms benefit from supportive care and medical evaluation.';
    }

    if (severity === 'severe' && recommendation.urgency === 'non-urgent') {
        recommendation.urgency = 'moderate';
    }
    return recommendation;
}