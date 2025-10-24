import { Types } from "mongoose";
import { IAppointment } from "../interface/IAppointment";
import { AppointmentRepository } from "../repository/AppointmentRepository";

export class AppointmentService {
    private appointmentRepository: AppointmentRepository;

    constructor() {
        this.appointmentRepository = new AppointmentRepository();
    }

    async createAppointment(appointment: IAppointment): Promise<IAppointment | null> {
        return await this.appointmentRepository.create(appointment);
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
        return await this.appointmentRepository.findByPatientId(doctorIdObj);
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