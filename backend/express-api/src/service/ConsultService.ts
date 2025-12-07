import { IConsult, PredictedCondition } from "../interface/IConsult";
import { ConsultRepository } from "../repository/ConsultRepository";

export class ConsultService {
    private consultRepository: ConsultRepository;

    constructor() {
        this.consultRepository = new ConsultRepository();
    }

    async consult(symptoms: string, userId: string): Promise<IConsult | null> {
        try {
            const response = await fetch("https://wellnest-quart-api.onrender.com/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ symptoms })
            });

            if (!response.ok) {
                return null;
            }

            const data = await response.json();

            if (data.error) {
                return null;
            }

            const specialist = data.prediction as string;
            const description = data.description as string;
            const predictedConditions = data.top_3_predictions.map((item: any) => {
                const prob = item.probability as number;

                let probabilityLevel: "High" | "Moderate" | "Low" = "Low";

                if (prob >= 0.6) {
                    probabilityLevel = "High";
                } else if (prob >= 0.25) {
                    probabilityLevel = "Moderate";
                }

                return {
                    disease: item.disease,
                    probability: probabilityLevel
                };
            }) as PredictedCondition[];

            const suggestedActions = data.precautions;

            const consultData: Partial<IConsult> = {
                userId,
                symptoms,
                description,
                specialist,
                predictedConditions,
                suggestedActions
            };

            return await this.consultRepository.create(consultData);
        } catch (error) {
            throw error;
        }
    }

    async findConsultById(id: string): Promise<IConsult | null> {
        return await this.consultRepository.findById(id);
    }

    async findConsultByPatientId(patientId: string): Promise<IConsult[]> {
        return await this.consultRepository.findByPatientId(patientId);
    }

    async getAllConsents(): Promise<IConsult[]> {
        return await this.consultRepository.getAll();
    }

    async deleteConsult(id: string): Promise<void> {
        await this.consultRepository.delete(id);
    }
}