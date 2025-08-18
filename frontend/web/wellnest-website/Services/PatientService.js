const patients = [
    {
        id: 1234567890,
        name: 'John Doe',
        email: 'john.doe@example.com',
        profilePicture: '/images/patient2.jpg',
        phone: '+1234567890',
        address: '123 Main St, Anytown, USA',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA',
    },
    {
        id: 1234567891,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        profilePicture: '/images/patient2.jpg',
        phone: '+1234567890',
        address: '123 Main St, Anytown, USA',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA',
    },
    {
        id: 1234567892,
        name: 'John Smith',
        email: 'john.smith@example.com',
        profilePicture: '/images/patient2.jpg',
        phone: '+1234567890',
        address: '123 Main St, Anytown, USA',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA',
    }
];

export const getPatients = () => {
    return patients;
} 
