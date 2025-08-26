const records = [
    {
        id: 1,
        type: 'General Checkup',
        date: '2024-01-01',
        time: '10:00 AM',
        doctorId: '1234567890',
        status: 'Completed',
        patientId: '1234567890',
        patientAge: 30,
        patientGender: 'Male',
    }
]

export const getRecord = () => {
    return records;
}
