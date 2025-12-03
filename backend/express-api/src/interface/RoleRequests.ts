import { IDoctor } from "./IDoctor";
import { IPatient } from "./IPatient";

export interface SignUpRequest extends IPatient, IDoctor {
    role: string;
}

export interface VerifyRequest extends SignUpRequest {
    verificationToken: string;
}