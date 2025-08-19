import { UserGroupIcon, HeartIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export const appointmentTypes = [
    { id: 'general', name: 'General Checkup', icon: UserGroupIcon, description: 'Regular health checkup and consultation' },
    { id: 'specialist', name: 'Specialist Consultation', icon: HeartIcon, description: 'Specialized medical consultation' },
    { id: 'followup', name: 'Follow-up', icon: CheckCircleIcon, description: 'Follow-up appointment for existing patients' }
];
