import { Request, Response } from "express";
import { PatientService } from "../service/PatientService";
import { AuthRequest } from "../middleware/auth";
import { IPatient } from "../interface/IPatient";

const patientService: PatientService = new PatientService();

export const isPatientVerified = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(403).json({ success: false, message: "patient id is required!" });
        }

        const verified = await patientService.isPatientVerified(id);

        if (!verified) {
            return res.status(400).json({ success: false, message: "Unable to find patient of given id!" });
        }

        return res.status(201).json({ success: true, verified });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const isPatientPhoneVerified = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(403).json({ success: false, message: "patient id is required!" });
        }

        const phoneVerified = await patientService.isPatientPhoneVerified(id);

        if (!phoneVerified) {
            return res.status(400).json({ success: false, message: "Unable to find patient of given id!" });
        }

        return res.status(201).json({ success: true, phoneVerified });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const updatePatient = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.user?.userId;
        const role = req.user?.role;
        const updatedPatient: Partial<IPatient> = req.body;

        if (role !== "Patient") {
            return res.status(403).json({ success: false, message: "Unauthorized access!" });
        }
        if (!id || !updatedPatient) {
            return res.status(403).json({ success: false, message: "id and updatePatient is required!" });
        }

        let patient: any = await patientService.updatePatient(id as string, updatedPatient);

        // Getting new deatils of patient
        patient = await patientService.findPatientById(id as string);

        if (!patient) {
            return res.status(400).json({ success: false, message: "Unable to find the patient!" });
        }

        return res.status(201).json({ success: true, patient });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const getAllPatients = async (req: Request, res: Response) => {
    try {
        const patients = await patientService.getAllPatients();

        if (!patients || patients.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find the patients!" });
        }

        return res.status(201).json({ success: true, patients });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}