import { Appointment, FormDataConsult, SignInRequest, SignUpRequest } from "@/types/type";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI || "http://localhost:5000/api/v1";

const api = axios.create({ baseURL });

export const signInApi = (signInRequest: SignInRequest) => api.post('/auth/signin', signInRequest);

export const signUpApi = (signUpRequest: SignUpRequest) => api.post('/auth/signup', signUpRequest);

export const signInByGoogleApi = (code: string, role: string) => api.post('/auth/signin/google', { code, role }, { headers: { 'Content-Type': 'application/json' } });

export const bookAppoinementApi = (appointment: Appointment) => api.post('/appointment/', appointment);

export const smartConsultApi = (consult: FormDataConsult) => api.post('/consult', consult);