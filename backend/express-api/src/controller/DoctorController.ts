import { Request, Response } from "express";
import { DoctorService } from "../service/DoctorService";
import { AuthRequest } from "../middleware/auth";

const doctorService: DoctorService = new DoctorService();

export const getDoctorBySpecialty = async (req: Request, res: Response) => {
    try {
        const { specialty } = req.params;

        if (!specialty) {
            return res.status(403).json({ success: false, message: "specialty is required!" });
        }

        const doctors = await doctorService.findDoctorsBySpecialty(specialty);

        if(!doctors) {
            return res.status(400).json({ success: false, message: "Unable to find doctors of given specialty!" });
        }

        return res.status(201).json({ success: true, doctors });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const isDoctorVerified = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(403).json({ success: false, message: "doctor id is required!" });
        }

        const verified = await doctorService.isDoctorVerified(id);

        if(!verified) {
            return res.status(400).json({ success: false, message: "Unable to find doctor of given id!" });
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

export const isDoctorPhoneVerified = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(403).json({ success: false, message: "doctor id is required!" });
        }

        const phoneVerified = await doctorService.isDoctorPhoneVerified(id);

        if(!phoneVerified) {
            return res.status(400).json({ success: false, message: "Unable to find doctor of given id!" });
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

export const getAvailabilityAndTimeSlots = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(403).json({ success: false, message: "doctor id is required!" });
        }

        const availabilityAndTimeSlots = await doctorService.getAvailabilityAndTimeSlots(id);

        if(!availabilityAndTimeSlots) {
            return res.status(400).json({ success: false, message: "Unable to find doctor of given id!" });
        }

        return res.status(201).json({ success: true, response: availabilityAndTimeSlots });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const updateDoctor = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.user?.userId;
        const role = req.user?.role;
        const updatedDoctor = req.body;

        if (role !== "Doctor") {
            return res.status(403).json({ success: false, message: "Unauthorized access!" });
        }
        if(!id || !updatedDoctor) {
            return res.status(403).json({ success: false, message: "id and updateDoctor is required!" });
        }

        let doctor: any = await doctorService.updateDoctor(id, updatedDoctor);

        // Getting new deatils of doctor
        doctor = await doctorService.findDoctorById(id);

        if(!doctor) {
            return res.status(400).json({ success: false, message: "Unable to find the doctor!" });
        }

        return res.status(201).json({ success: true, doctor });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const getAllDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await doctorService.getAllDoctors();

        if(!doctors || doctors.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find the doctors!" });
        }

        return res.status(201).json({ success: true, doctors });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const getAllRegisteredDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await doctorService.getAllRegisteredDoctors();
        
        if(!doctors || doctors.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find the doctors!" });
        }
        
        return res.status(201).json({ success: true, doctors });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}