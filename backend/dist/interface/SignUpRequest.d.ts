import { IDoctor } from "./IDoctor";
import { IPatient } from "./IPatient";
export interface SignUpRequest extends IPatient, IDoctor {
    role: string;
}
//# sourceMappingURL=SignUpRequest.d.ts.map