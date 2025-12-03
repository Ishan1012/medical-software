import { Request, Response } from "express";
import { FeedbackService } from "../service/FeedbackService";

const feedbackService: FeedbackService = new FeedbackService();

export const createFeedback = async (req: Request, res: Response) => {
    try {
        const feedback = await feedbackService.createFeedback(req.body);

        if (!feedback) {
            return res.status(400).json({ success: false, message: "Unable to create the feedback!" });
        }

        return res.status(201).json({ success: true, feedback });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const findFeedbackById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(403).json({ success: false, message: "feedback id is required!" });
        }

        const feedback = await feedbackService.findFeedbackById(id);

        if (!feedback) {
            return res.status(400).json({ success: false, message: "Unable to find the feedback!" });
        }

        return res.status(201).json({ success: true, feedback });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const findFeedbackByPatientId = async (req: Request, res: Response) => {
    try {
        const patientId = req.params.patientId;

        if (!patientId) {
            return res.status(403).json({ success: false, message: "patient id is required!" });
        }

        const feedbacks = await feedbackService.findFeedbackByPatientId(patientId);

        if (!feedbacks || feedbacks.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find the feedbacks!" });
        }

        return res.status(201).json({ success: true, feedbacks });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const getAllFeedbacks = async (req: Request, res: Response) => {
    try {
        const feedbacks = await feedbackService.getAllFeedbacks();

        if (!feedbacks || feedbacks.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find the feedbacks!" });
        }

        return res.status(201).json({ success: true, feedbacks });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const deleteFeedback = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(403).json({ success: false, message: "id is required!" });
        }

        await feedbackService.deleteFeedback(id);

        return res.status(201).json({ success: true, message: "Feedback deleted successfully" });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}