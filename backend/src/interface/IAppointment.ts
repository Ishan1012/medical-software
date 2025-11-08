import { Document, Types } from "mongoose";
import { IDoctor } from "./IDoctor";

export interface IAppointment extends Document {
	patientId: string;
	type: string;
	status: string;
	doctor: Types.ObjectId | null;
	date: string;
	time: string;
	patientInfo: PatientInfo;
	reportUrl?: string;
	createdAt: Date;
}

export interface PopulatedAppointment extends Document {
	patientId: string;
	type: string;
	status: string;
	doctor: IDoctor | null;
	date: string;
	time: string;
	patientInfo: PatientInfo;
	createdAt: Date;
}

export interface PatientInfo {
	name: string;
	age: string;
	gender: string;
	address: string;
	phone: string;
	email: string;
	concern: string;
}