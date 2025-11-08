import bcrypt from "bcrypt";
import crypto from "crypto";
import { IPatient } from "../interface/IPatient";
import { DoctorService } from "./DoctorService";
import { JwtService } from "./JwtService";
import { PatientService } from "./PatientService";
import { IDoctor } from "../interface/IDoctor";
import { AuthRequest } from "../middleware/auth";
import { AuthResponse } from "../interface/AuthResponse";
import { SignUpRequest, VerifyRequest } from "../interface/RoleRequests";
import { oauth2Client } from "../config/GoogleAuthconfig";
import axios from "axios";
import { VerificationResponse } from "../interface/VerificationResponse";
import { JwtPayload, verify } from "jsonwebtoken";

export class AuthService {
    private patientService: PatientService;
    private doctorService: DoctorService;
    private jwtService: JwtService;

    constructor() {
        this.patientService = new PatientService();
        this.doctorService = new DoctorService();
        this.jwtService = new JwtService();
    }

    async signUp(signUpRequest: SignUpRequest): Promise<VerificationResponse | null> {

        if (!signUpRequest.role || !signUpRequest.email || !signUpRequest.password || !signUpRequest.name) {
            throw new Error(`Missing required fields: \n role: ${!!signUpRequest.role}, name: ${!!signUpRequest.name}, email: ${!!signUpRequest.email}, or password: ${!!signUpRequest.password}`);
        }

        const doctor = await this.doctorService.findDoctorByEmail(signUpRequest.email);
        const patient = await this.patientService.findPatientByEmail(signUpRequest.email);

        if (doctor || patient) {
            return null;
        }

        const hashedPassword = await bcrypt.hash(signUpRequest.password as string, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        if (signUpRequest.role === "Patient") {

            const createdPatient = await this.patientService.savePatient({
                name: signUpRequest.name,
                email: signUpRequest.email,
                password: hashedPassword,
                verificationToken
            });

            if (!createdPatient) {
                throw new Error("Unable to create new Patient!");
            }

            const token = this.jwtService.generateToken(createdPatient?.email, "Patient", createdPatient?.id);
            return { token: token, email: createdPatient.email, name: createdPatient.name, verificationToken };
        } else if (signUpRequest.role === "Doctor") {

            const createdDoctor = await this.doctorService.saveDoctor({
                name: signUpRequest.name,
                email: signUpRequest.email,
                password: hashedPassword,
                verificationToken,
                experience: signUpRequest.experience
            });

            if (!createdDoctor) {
                throw new Error("Unable to create new Patient!");
            }

            const token = this.jwtService.generateToken(createdDoctor?.email, "Doctor", createdDoctor?.id);
            return { token: token, email: createdDoctor.email, name: createdDoctor.name, verificationToken };
        } else {
            throw new Error("Invalid user type");
        }
    }

    async signIn(signInRequest: AuthRequest): Promise<AuthResponse | null> {
        const { email, password } = signInRequest.body;

        if (!email || !password) {
            throw new Error(`Following details not defined!\n Please provide following to proceed:\n email: ${!!email}, password: ${!!password}`);
        }

        const patient = await this.patientService.findPatientByEmail(email);
        const doctor = await this.doctorService.findDoctorByEmail(email);

        if (!patient && !doctor) {
            return null;
        }

        if (patient) {
            const isPasswordValid = await bcrypt.compare(password, patient.password as string);

            if (isPasswordValid) {
                const token = this.jwtService.generateToken(patient.email, "Patient", patient.id);
                return { token: token, email: patient.email, name: patient.name };
            }

            return null;
        } else if (doctor) {
            const isPasswordValid = await bcrypt.compare(password, doctor.password as string);

            if (isPasswordValid) {
                const token = this.jwtService.generateToken(doctor.email, "Doctor", doctor.id);
                return { token: token, email: doctor.email, name: doctor.name };
            }

            return null;
        } else {
            throw new Error('Invalid user type');
        }
    }

    async getPatientById(patientId: string): Promise<Partial<IPatient> | null> {
        const patient = await this.patientService.findPatientById(patientId);

        if (!patient) {
            return null;
        }

        const patientObj = patient.toObject();
        return patientObj;
    }

    async getDoctorById(doctorId: string): Promise<Partial<IDoctor> | null> {
        const doctor = await this.doctorService.findDoctorById(doctorId);

        if (!doctor) {
            return null;
        }

        const doctorObj = doctor.toObject();
        const { _id, password, ...rest } = doctorObj;
        return rest;
    }

    async signInByGoogle(code: string, role: string): Promise<AuthResponse | null> {
        const googleResponse = await oauth2Client.getToken(code);
        const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);

        const { email, name, verified_email, picture } = userResponse.data;

        let userInfo;
        if (role === "Patient") {
            userInfo = await this.doctorService.findDoctorByEmail(email);
            if (!!userInfo) {
                role = "Doctor";
            }
            if (!userInfo) {
                userInfo = await this.patientService.findPatientByEmail(email);
            }
            if (!userInfo) {
                userInfo = await this.patientService.savePatient({
                    name,
                    email,
                    password: '',
                    isVerified: verified_email,
                    profileUrl: picture,
                    isOAuth: true
                });
            }
        } else if (role === "Doctor") {
            userInfo = await this.patientService.findPatientByEmail(email);
            if (!!userInfo) {
                role = "Patient";
            }
            if (!userInfo) {
                userInfo = await this.doctorService.findDoctorByEmail(email);
            }
            if (!userInfo) {
                userInfo = await this.doctorService.saveDoctor({
                    name,
                    email,
                    password: '',
                    isVerified: verified_email,
                    profileUrl: picture,
                    isOAuth: true
                });
            }
        } else {
            throw new Error('Invalid user role');
        }

        if (!userInfo || !userInfo.id) {
            throw new Error('Unable to save user in the database');
        }

        const token = this.jwtService.generateToken(email, role, userInfo.id);
        return { token, email, name, profile: userInfo.profileUrl || '' };
    }

    async verifyToken(token: string): Promise<boolean | null> {
        const doctor: IDoctor | null = await this.doctorService.getDoctorByVerificationToken(token);

        if (!doctor) {
            const patient: IPatient | null = await this.patientService.getPatientByVerificationToken(token);

            if (!patient) {
                return false;
            }

            patient.isVerified = true;
            patient.verificationToken = undefined;
            await patient.save();

            return true;
        } else {
            doctor.isVerified = true;
            doctor.verificationToken = undefined;
            await doctor.save();

            return true;
        }
    }
}