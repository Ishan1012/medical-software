import { Types } from "mongoose";
import { IConsult } from "../interface/IConsult";
import { ConsultRepository } from "../repository/ConsultRepository";

export class ConsultService {
    private consultRepository: ConsultRepository;

    constructor() {
        this.consultRepository = new ConsultRepository();
    }

    async saveConsult(consult: IConsult): Promise<IConsult | null> {
        return await this.consultRepository.create(consult);
    }

    async findConsultById(id: string): Promise<IConsult | null> {
        return await this.consultRepository.findById(id);
    }

    async findConsultByPatientId(patientId: string): Promise<IConsult[]> {
        const patientIdObj = new Types.ObjectId(patientId);
        return await this.consultRepository.findByPatientId(patientIdObj);
    }

    async getAllConsents(): Promise<IConsult[]> {
        return await this.consultRepository.getAll();
    }

    async deleteConsult(id: string): Promise<void> {
        await this.consultRepository.delete(id);
    } 
}