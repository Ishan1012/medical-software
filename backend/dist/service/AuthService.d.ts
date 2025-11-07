import { IPatient } from "../interface/IPatient";
import { IDoctor } from "../interface/IDoctor";
import { AuthRequest } from "../middleware/auth";
import { AuthResponse } from "../interface/AuthResponse";
import { SignUpRequest } from "../interface/SignUpRequest";
export declare class AuthService {
    private patientService;
    private doctorService;
    private jwtService;
    constructor();
    signUp(signUpRequest: SignUpRequest): Promise<AuthResponse | null>;
    signIn(signInRequest: AuthRequest): Promise<AuthResponse | null>;
    getPatientById(patientId: string): Promise<Partial<IPatient> | null>;
    getDoctorById(doctorId: string): Promise<Partial<IDoctor> | null>;
    signInByGoogle(code: string, role: string): Promise<AuthResponse | null>;
}
//# sourceMappingURL=AuthService.d.ts.map