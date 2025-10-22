import { Types } from "mongoose";
import { IConsult } from "../interface/IConsult";
import Consult from "../model/Consult";

export class ConsultRepository {
    async create(consult: Partial<IConsult>): Promise<IConsult | null> {
        const newConsult = new Consult(consult);
        return await newConsult.save();
    }

    async findById(id: string): Promise<IConsult | null> {
        return await Consult.findOne({ id }).exec();
    }

    async findByPatientId(patientId: Types.ObjectId): Promise<IConsult | null> {
        return await Consult.findOne({ patientId }).exec();
    }

    async getAll(): Promise<IConsult[]> {
        return await Consult.find().exec();
    }

    async delete(id: string): Promise<void> {
        await Consult.findOneAndDelete({ id });
    }
}