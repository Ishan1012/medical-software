import axios from "axios";
import { IConsult, PredictedCondition } from "../interface/IConsult";
import { ConsultRepository } from "../repository/ConsultRepository";

export class ConsultService {
    private consultRepository: ConsultRepository;

    constructor() {
        this.consultRepository = new ConsultRepository();
    }

    async consult(symptoms: string, userId: string): Promise<IConsult | null> {
        try {
            const response = await axios.post('https://wellnest-quart-api.onrender.com/predict', { symptoms });
            if (response.data.error) {
                return null;
            }
            const specialist = response.data.prediction as string;
            const predictedConditions = response.data.top_3_predictions.map((item: any) => {
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
    
            const suggestedActions = [
                "Stay hydrated - drink at least 8 glasses of water daily",
                "Maintain proper hygiene - wash hands regularly and take warm baths",
                "Get adequate rest - aim for 7-9 hours of sleep",
                "Follow a balanced diet with fruits and vegetables",
                "Exercise regularly - at least 30 minutes of moderate activity daily",
                "Avoid close contact with sick individuals",
                "Keep vaccinations up to date",
                "Monitor symptoms and seek medical attention if they worsen"
            ];
    
            const consultData: Partial<IConsult> = {
                userId,
                symptoms,
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