import { Request, Response } from "express";
import { AuthService } from "../service/AuthService";
import { AuthRequest } from "../middleware/auth";

const authService = new AuthService();

export const signupPatient = async (req: Request, res: Response) => {
    try {
        const createdPatient = await authService.signUpPatient(req.body);

        if(!createdPatient) {
            return res.status(400).json({ success: false, message: "unable to create user!" });
        }
        return res.status(201).json({ success: true, user: createdPatient });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}

export const signupDoctor = async (req: Request, res: Response) => {
    try {
        const createdDoctor = await authService.signUpDoctor(req.body);

        if(!createdDoctor) {
            return res.status(400).json({ success: false, message: "unable to create user!" });
        }
        return res.status(201).json({ success: true, user: createdDoctor });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}

export const signinPatient = async (req: Request, res: Response) => {
    try {
        const patient = await authService.signInPatient(req.body);

        if(!patient) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        return res.status(200).json({ success: true, user: patient });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}

export const signinDoctor = async (req: Request, res: Response) => {
    try {
        const doctor = await authService.signInDoctor(req.body);

        if(!doctor) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        return res.status(200).json({ success: true, user: doctor });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}

export const me = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;

        if(!user) {
            return res.status(401).json({ success: false, message: "No user found!" });
        }

        if(!user.userId) {
            return res.status(401).json({ success: false, message: "No userId found!" });
        }

        if(user.role === "Patient") {
            const patient = await authService.getPatientById(user.userId);
            if (!patient) {
                return res.status(404).json({ success: false, message: "Patient not found!" });
            }
            return res.status(200).json({ success: true, user: patient });
        } else if(user.role === "Doctor") {
            const doctor = await authService.getDoctorById(user.userId);
            if (!doctor) {
                return res.status(404).json({ success: false, message: "Doctor not found!" });
            }
            return res.status(200).json({ success: true, user: doctor });
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized user role!" });
        }
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
};
