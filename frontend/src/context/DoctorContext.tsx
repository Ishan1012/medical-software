import { Doctor } from "@/types/type";

const doctors: Doctor[] = [
    {
        id: "1",
        name: 'Dr. Alan Mercer',
        email: 'abc"gmail.com',
        speciality: 'Consultant Physician (OPD)',
        qualification: 'MBBS, MD (Medicine)',
        profileUrl: '/images/male-doctor-default.png',
        availability: ['Monday', 'Wednesday', 'Friday'],
        timeSlots: [
            '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
        ],
        rating: 4.9,
        ratingCount: 5,
        experience: '15+ years',
        description: 'Dr. Alan Mercer is a consultant physician with a strong focus on internal medicine. He has a wealth of experience in diagnosing and treating various medical conditions.',
        whatsapp: 'https://wa.me/919831000000',
        facebook: 'https://www.facebook.com/alec',
        instagram: 'https://www.instagram.com/alec',
        x: 'https://www.twitter.com/alec',
    },
    {
        id: "2",
        name: 'Dr. Sophia Grant',
        email: 'abc"gmail.com',
        speciality: 'Consultant ENT, Head & Neck Surgeon (OPD)',
        profileUrl: '/images/female-doctor-default.png',
        availability: ['Tuesday', 'Thursday', 'Saturday'],
        timeSlots: [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'
        ],
        rating: 4.8,
        ratingCount: 5,
        experience: '12+ years',
        description: 'Dr. Sophia Grant is a consultant ENT, Head & Neck Surgeon with a focus on ENT disorders. He has a strong background in diagnosing and treating ENT disorders, including hearing loss.',
        whatsapp: 'https://wa.me/919831000000',
        facebook: 'https://www.facebook.com/sophia',
        instagram: 'https://www.instagram.com/sophia',
        x: 'https://www.twitter.com/sophia',
    },
];

export default async function getDoctors(): Promise<Doctor[]> {
    return doctors;
}