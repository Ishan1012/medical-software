import { Request, Response } from "express";
export declare const createFeedback: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findFeedbackById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findFeedbackByPatientId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllFeedbacks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteFeedback: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=FeedbackController.d.ts.map