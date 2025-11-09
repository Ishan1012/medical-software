import { Types } from "mongoose";
import { IAppointment, PopulatedAppointment } from "../interface/IAppointment";
import { AppointmentRepository } from "../repository/AppointmentRepository";
import { PatientService } from "./PatientService";
import { AppointmentConfirmationEmail } from "../utils/Appointment";
import transporter from "../config/NodeMailer";
import { IPatient } from "../interface/IPatient";
import { UpdateAppointment } from "../interface/UpdateAppointment";

export class AppointmentService {
    private appointmentRepository: AppointmentRepository;
    private patientService: PatientService;

    constructor() {
        this.appointmentRepository = new AppointmentRepository();
        this.patientService = new PatientService();
    }

    async createAppointment(patientId: string, appointment: IAppointment): Promise<IAppointment | null> {
        appointment.patientId = patientId;

        const newAppointment = await this.appointmentRepository.create(appointment);

        if (newAppointment) {
            let updateField: 'upcomingAppointments' | 'medicalRecords';

            await this.patientService.updatePatient(newAppointment.id, {
                $push: {
                    upcomingAppointments: newAppointment._id as Types.ObjectId
                }
            });

            const appointment = await this.appointmentRepository.findById(newAppointment?.id);

            if (appointment) {
                await transporter.sendMail({
                    from: `WellNest <${process.env.EMAIL_ID}>`,
                    to: appointment.patientInfo.email,
                    subject: 'Appointment Confirmed',
                    html: AppointmentConfirmationEmail(appointment),
                });

                await transporter.sendMail({
                    from: `WellNest <${process.env.EMAIL_ID}>`,
                    to: appointment.doctor?.email,
                    subject: 'Appointment Confirmed',
                    html: AppointmentConfirmationEmail(appointment),
                });
            }
        }

        return newAppointment;
    }

    async findAppointmentById(id: string): Promise<PopulatedAppointment | null> {
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