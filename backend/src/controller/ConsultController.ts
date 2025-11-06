import { Request, Response } from "express";
import { ConsultService } from "../service/ConsultService";

const consultService: ConsultService = new ConsultService();

export const saveConsult = async (req: Request, res: Response) => {
    try {
        const consult = await consultService.saveConsult(req.body);

        if(!consult) {
            return res.status(400).json({ success: false, message: "Unable to save the consult!" });
        }

        return res.status(201).json({ success: true, consult });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const findConsultById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(403).json({ success: false, message: "consult id is required!" });
        }

        const consult = await consultService.findConsultById(id);

        if(!consult) {
            return res.status(400).json({ success: false, message: "Unable to find consult of given id!" });
        }

        return res.status(200).json({ success: true, consult });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const findConsultPatientById = async (req: Request, res: Response) => {
    try {
        const patientId = req.params.patientId;

        if(!patientId) {
            return res.status(403).json({ success: false, message: "consult id is required!" });
        }

        const consults = await consultService.findConsultByPatientId(patientId);

        if(!consults || consults.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find consults of given id!" });
        }

        return res.status(200).json({ success: true, consults });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const getAllConsents = async (req: Request, res: Response) => {
    try {
        const consults = await consultService.getAllConsents();

        if(!consults || consults.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find consults!" });
        }

        return res.status(200).json({ success: true, consults });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const deleteConsult = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(403).json({ success: false, message: "consult id is required!" });
        }

        await consultService.deleteConsult(id);

        return res.status(201).json({ success: true, message: "Consult deleted successfully" });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}