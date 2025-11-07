import { IAppointment } from "../interface/IAppointment";
export declare class AppointmentService {
    private appointmentRepository;
    constructor();
    createAppointment(appointment: IAppointment): Promise<IAppointment | null>;
    findAppointmentById(id: string): Promise<IAppointment | null>;
    findAppointmentByPatientId(patientId: string): Promise<IAppointment[]>;
    findAppointmentByDoctorId(doctorId: string): Promise<IAppointment[]>;
    getStatusOfAppointment(id: string): Promise<string | null>;
    setStatusOfAppointment(id: string, newStatus: string): Promise<IAppointment | null>;
    getAllAppointments(): Promise<IAppointment[]>;
    deleteAppointment(id: string): Promise<void>;
}
//# sourceMappingURL=AppointmentService.d.ts.map