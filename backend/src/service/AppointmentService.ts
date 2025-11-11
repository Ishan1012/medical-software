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

    async createAppointment(patientId: string, appointment: IAppointment): Promise<IAppointment | null> {
        appointment.patientId = patientId;

        const newAppointment: IAppointment | null = await this.appointmentRepository.create(appointment);

        if (newAppointment) {
            const patient: IPatient = await this.patientService.findPatientByIdUnpopulate(newAppointment.patientId) as IPatient;
            let upcomingAppointments = patient.upcomingAppointments;
            let medicalRecords = patient.medicalRecords;

            if (newAppointment.status !== "Completed") {
                upcomingAppointments.push(newAppointment._id as Types.ObjectId);
            } else {
                medicalRecords.push(newAppointment._id as Types.ObjectId);
            }

            await this.patientService.updatePatient(newAppointment.patientId, {
                upcomingAppointments,
                medicalRecords
            });

            if(newAppointment.doctor) {
                const doctor: IDoctor = await this.doctorService.findDoctorByObjectId(newAppointment.doctor) as IDoctor;
                let upcomingAppointments = doctor.upcomingAppointments;
                let medicalRecords = patient.medicalRecords;

                if (newAppointment.status !== "Completed") {
                    upcomingAppointments.push(newAppointment._id as Types.ObjectId);
                } else {
                    medicalRecords.push(newAppointment._id as Types.ObjectId);
                }

                if (doctor) {
                    await this.doctorService.updateDoctor(doctor?.id, {
                        upcomingAppointments,
                        medicalRecords
                    });
                }
            }

            const fetchAppointment = await this.appointmentRepository.findById(newAppointment?.id);

            if (fetchAppointment) {
                await transporter.sendMail({
                    from: `WellNest <${process.env.EMAIL_ID}>`,
                    to: fetchAppointment.patientInfo.email,
                    subject: 'Appointment Confirmed',
                    html: AppointmentConfirmationEmail(fetchAppointment),
                });

                await transporter.sendMail({
                    from: `WellNest <${process.env.EMAIL_ID}>`,
                    to: fetchAppointment.doctor?.email,
                    subject: 'New Appointment',
                    html: AppointmentConfirmationEmail(fetchAppointment),
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