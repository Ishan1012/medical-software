import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
export declare const signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const signin: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const signInByGoogle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const me: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=AuthController.d.ts.map