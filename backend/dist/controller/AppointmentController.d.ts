import { Request, Response } from "express";
export declare const createAppointment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findAppointmentById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findAppointmentByPatientId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findAppointmentByDoctorId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getStatusOfAppointment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const setStatusOfAppointment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllAppointments: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteAppointment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=AppointmentController.d.ts.map