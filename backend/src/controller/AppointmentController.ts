import { Request, Response } from "express";
import { AppointmentService } from "../service/AppointmentService";

const appointmentService = new AppointmentService();

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = await appointmentService.createAppointment(req.body);

        if(!appointment) {
            return res.status(400).json({ success: false, message: "Unable to create the appointment!" });
        }

        return res.status(201).json({ success: true, appointment });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}

export const findAppointmentById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(403).json({ success: false, message: "appointment id is required!" });
        }
        const appointment = await appointmentService.findAppointmentById(id);

        if(!appointment) {
            return res.status(400).json({ success: false, message: "Unable to find the appointment!" });
        }

        return res.status(201).json({ success: true, appointment });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}

export const findAppointmentByPatientId = async (req: Request, res: Response) => {
    try {
        const patientId = req.params.patientId;

        if(!patientId) {
            return res.status(403).json({ success: false, message: "patientId is required!" });
        }
        const appointments = await appointmentService.findAppointmentByPatientId(patientId);

        if(!appointments || appointments.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find any appointments of given patient!" });
        }

        return res.status(201).json({ success: true, appointments });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}

export const findAppointmentByDoctorId = async (req: Request, res: Response) => {
    try {
        const doctorId = req.params.doctorId;

        if(!doctorId) {
            return res.status(403).json({ success: false, message: "doctorId is required!" });
        }
        const appointments = await appointmentService.findAppointmentByDoctorId(doctorId);

        if(!appointments || appointments.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find any appointments of given doctor!" });
        }

        return res.status(201).json({ success: true, appointments });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}

export const getStatusOfAppointment = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(403).json({ success: false, message: "appointment id is required!" });
        }
        const status = await appointmentService.getStatusOfAppointment(id);

        if(!status) {
            return res.status(400).json({ success: false, message: "Unable to find the appointment!" });
        }

        return res.status(201).json({ success: true, status });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}

export const setStatusOfAppointment = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const status: string = req.body.status;

        if(!id) {
            return res.status(403).json({ success: false, message: "appointment id is required!" });
        }
        const newAppointment = await appointmentService.setStatusOfAppointment(id, status);

        if(!newAppointment) {
            return res.status(400).json({ success: false, message: "Unable to find the appointment!" });
        }

        return res.status(201).json({ success: true, appointment: newAppointment });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}

export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await appointmentService.getAllAppointments();

        if(!appointments) {
            return res.status(400).json({ success: false, message: "Unable to find the appointments!" });
        }

        return res.status(201).json({ success: true, appointments });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}

export const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(403).json({ success: false, message: "appointment id is required!" });
        }
        const appointment = await appointmentService.deleteAppointment(id);

        return res.status(201).json({ success: true, message: "Appointment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
    }
}