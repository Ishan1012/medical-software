const doctors = [
    {
        id: 1,
        name: 'Dr. S. Ranjan',
        specialty: 'Consultant Physician (OPD)',
        qualification: 'MBBS, MD (Medicine)',
        image: '/images/doctor-default.png',
        availability: ['Monday', 'Wednesday', 'Friday'],
        rating: 4.9,
        experience: '15+ years',
        description: 'Dr. S. Ranjan is a consultant physician with a strong focus on internal medicine. He has a wealth of experience in diagnosing and treating various medical conditions.',
        links: {
            whatsapp: 'https://wa.me/919831000000',
            facebook: 'https://www.facebook.com/sranjan',
            instagram: 'https://www.instagram.com/sranjan',
            x: 'https://www.twitter.com/sranjan',
        }
    },
    {
        id: 2,
        name: 'Dr. MD Tausiful Haque',
        specialty: 'Consultant ENT, Head & Neck Surgeon (OPD / Surgery)',
        image: '/images/doctor-default.png',
        availability: ['Tuesday', 'Thursday', 'Saturday'],
        rating: 4.8,
        experience: '12+ years',
        description: 'Dr. MD Tausiful Haque is a consultant ENT, Head & Neck Surgeon with a focus on ENT disorders. He has a strong background in diagnosing and treating ENT disorders, including hearing loss.',
        links: {
            whatsapp: 'https://wa.me/919831000000',
            facebook: 'https://www.facebook.com/mdtausifulhaque',
            instagram: 'https://www.instagram.com/mdtausifulhaque',
            x: 'https://www.twitter.com/mdtausifulhaque',
        }
    },
];

export default function getDoctors() {
    return doctors;
}