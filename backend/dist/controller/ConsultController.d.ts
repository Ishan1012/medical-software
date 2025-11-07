import { Request, Response } from "express";
export declare const saveConsult: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findConsultById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findConsultPatientById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllConsents: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteConsult: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=ConsultController.d.ts.map