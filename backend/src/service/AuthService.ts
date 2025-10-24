import bcrypt from "bcrypt";
import crypto from "crypto";
import { IPatient } from "../interface/IPatient";
import { DoctorService } from "./DoctorService";
import { JwtService } from "./JwtService";
import { PatientService } from "./PatientService";
import { IDoctor } from "../interface/IDoctor";

export class AuthService {
    private patientService: PatientService;
    private doctorService: DoctorService;
    private jwtService: JwtService;

    constructor() {
        this.patientService = new PatientService();
        this.doctorService = new DoctorService();
        this.jwtService = new JwtService();
    }

    async signUpPatient(signUpRequest: IPatient): Promise<string | null> {
        const patient = await this.patientService.findPatientByEmail(signUpRequest.email);

        if(patient) {
            return null;
        }

        const hashedPassword = await bcrypt.hash(signUpRequest.password as string, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const createdPatient = await this.patientService.savePatient({
            name: signUpRequest.name,
            email: signUpRequest.email,
            password: hashedPassword,
            verificationToken
        });

        if(!createdPatient) {
            throw new Error("Unable to create new Patient!");
        }

        return this.jwtService.generateToken(createdPatient?.email, "Patient", createdPatient?.id);
    }

    async signUpDoctor(signUpRequest: IDoctor): Promise<string | null> {
        const doctor = await this.doctorService.findDoctorByEmail(signUpRequest.email);

        if(doctor) {
            return null;
        }

        const hashedPassword = await bcrypt.hash(signUpRequest.password as string, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const createdDoctor = await this.doctorService.saveDoctor({
            name: signUpRequest.name,
            email: signUpRequest.email,
            password: hashedPassword,
            verificationToken,
            experience: signUpRequest.experience
        });

        if(!createdDoctor) {
            throw new Error("Unable to create new Patient!");
        }

        return this.jwtService.generateToken(createdDoctor?.email, "Doctor", createdDoctor?.id);
    }

    async signInPatient(signInRequest: Partial<IPatient>): Promise<string | null> {
        if(!signInRequest.email) {
            throw new Error('Email not defined! Please provide email to proceed.');
        }
        const patient = await this.patientService.findPatientByEmail(signInRequest.email);

        if(!patient) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(signInRequest.password as string, patient.password as string);

        if(isPasswordValid) {
            return this.jwtService.generateToken(patient.email, "Patient", patient.id);
        }

        return null;
    }

    async signInDoctor(signInRequest: Partial<IPatient>): Promise<string | null> {
        if(!signInRequest.email) {
            throw new Error('Email not defined! Please provide email to proceed.');
        }
        const doctor = await this.doctorService.findDoctorByEmail(signInRequest.email);

        if(!doctor) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(signInRequest.password as string, doctor.password as string);

        if(isPasswordValid) {
            return this.jwtService.generateToken(doctor.email, "Doctor", doctor.id);
        }

        return null;
    }

    async getPatientById(patientId: string): Promise<Partial<IPatient> | null> {
        const patient = await this.patientService.findPatientById(patientId);
        
        if (!patient) {
            return null;
        }
        
        const patientObj = patient.toObject();
        const { _id, password, ...rest } = patientObj;
        return rest;
    }

    async getDoctorById(doctorId: string): Promise<Partial<IPatient> | null> {
        const doctor = await this.doctorService.findDoctorById(doctorId);
        
        if (!doctor) {
            return null;
        }
        
        const doctorObj = doctor.toObject();
        const { _id, password, ...rest } = doctorObj;
        return rest;
    }
}