import { Types } from "mongoose";
import { IAppointment, PopulatedAppointment } from "../interface/IAppointment";
import { AppointmentRepository } from "../repository/AppointmentRepository";
import { PatientService } from "./PatientService";
import { AppointmentConfirmationEmail } from "../utils/Appointment";
import transporter from "../config/NodeMailer";
import { IPatient } from "../interface/IPatient";
import { DoctorService } from "./DoctorService";
import { IDoctor, PopulatedDoctor } from "../interface/IDoctor";

export class AppointmentService {
    private appointmentRepository: AppointmentRepository;
    private patientService: PatientService;
    private doctorService: DoctorService;

    constructor() {
        this.appointmentRepository = new AppointmentRepository();
        this.patientService = new PatientService();
        this.doctorService = new DoctorService();
    }

    async createAppointment(userId: string, appointment: IAppointment): Promise<IAppointment | null> {
        appointment.userId = userId;

        const newAppointment: IAppointment | null = await this.appointmentRepository.create(appointment);

        if (newAppointment) {
            try {
                const fetchAppointment = await this.appointmentRepository.findById(newAppointment?.id);

                if (fetchAppointment) {
                    const emailTasks = [];

                    emailTasks.push(
                        transporter.sendMail({
                            from: `WellNest <${process.env.EMAIL_ID}>`,
                            to: fetchAppointment.patientInfo.email,
                            subject: 'Appointment Confirmed',
                            html: AppointmentConfirmationEmail(fetchAppointment),
                        })
                    );

                    if (fetchAppointment.doctor?.email) {
                        emailTasks.push(
                            transporter.sendMail({
                                from: `WellNest <${process.env.EMAIL_ID}>`,
                                to: fetchAppointment.doctor.email,
                                subject: 'New Appointment',
                                html: AppointmentConfirmationEmail(fetchAppointment),
                            })
                        );
                    }

                    Promise.allSettled(emailTasks).catch(console.error);
                }
            } catch (error) {
                throw error;
            }
        }

        return newAppointment;
    }

    async findAppointmentById(id: string): Promise<PopulatedAppointment | null> {
        return await this.appointmentRepository.findById(id);
    }

    async findAppointmentByUserId(userId: string): Promise<IAppointment[]> {
        const userIdObj = new Types.ObjectId(userId);
        return await this.appointmentRepository.findByUserId(userIdObj);
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