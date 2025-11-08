import { Types } from "mongoose";
import { IAppointment, PopulatedAppointment } from "../interface/IAppointment";
import { AppointmentRepository } from "../repository/AppointmentRepository";
import { PatientService } from "./PatientService";
import { IPatient } from "../interface/IPatient";

export class AppointmentService {
    private appointmentRepository: AppointmentRepository;
    private patientService: PatientService;

    constructor() {
        this.appointmentRepository = new AppointmentRepository();
        this.patientService = new PatientService();
    }

    async createAppointment(appointment: IAppointment): Promise<IAppointment | null> {
        const newAppointment = await this.appointmentRepository.create(appointment);

        if (newAppointment) {
            const appointmentDate = new Date(newAppointment.date);
            const now = new Date();

            let updateField: 'upcomingAppointments' | 'medicalRecords';

            if (appointmentDate >= now) {
                updateField = 'upcomingAppointments';
            } else {
                updateField = 'medicalRecords';
            }

            const patientIdString = (newAppointment.id);

            await this.patientService.updatePatient(patientIdString, {
                [updateField]: newAppointment._id
            } as Partial<IPatient>);
        }

        return newAppointment;
    }

    async findAppointmentById(id: string): Promise<IAppointment | null> {
        return await this.appointmentRepository.findById(id);
    }

    async findAppointmentByPatientId(patientId: string): Promise<IAppointment[]> {
        const patientIdObj = new Types.ObjectId(patientId);
        return await this.appointmentRepository.findByPatientId(patientIdObj);
    }

    async findAppointmentByDoctorId(doctorId: string): Promise<IAppointment[]> {
        const doctorIdObj = new Types.ObjectId(doctorId);
        return await this.appointmentRepository.findByDoctorId(doctorIdObj);
    }

    async getStatusOfAppointment(id: string): Promise<string | null> {
        return await this.appointmentRepository.getStatus(id);
    }

    async setStatusOfAppointment(id: string, newStatus: string): Promise<IAppointment | null> {
        return await this.appointmentRepository.setStatus(id, newStatus);
    }

    async getAllAppointments(): Promise<IAppointment[]> {
        return await this.appointmentRepository.getAll();
    }

    async deleteAppointment(id: string): Promise<void> {
        await this.appointmentRepository.delete(id);
    }
}