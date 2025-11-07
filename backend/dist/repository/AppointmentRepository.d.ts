import { Types } from "mongoose";
import { IAppointment } from "../interface/IAppointment";
export declare class AppointmentRepository {
    create(record: IAppointment): Promise<IAppointment | null>;
    findById(id: string): Promise<IAppointment | null>;
    findByPatientId(patientId: Types.ObjectId): Promise<IAppointment[]>;
    findByDoctorId(doctorId: Types.ObjectId): Promise<IAppointment[]>;
    getStatus(id: string): Promise<string | null>;
    setStatus(id: string, newStatus: string): Promise<IAppointment | null>;
    getAll(): Promise<IAppointment[]>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=AppointmentRepository.d.ts.map