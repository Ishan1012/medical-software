"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const DoctorService_1 = require("./DoctorService");
const JwtService_1 = require("./JwtService");
const PatientService_1 = require("./PatientService");
const GoogleAuthconfig_1 = require("../config/GoogleAuthconfig");
const axios_1 = __importDefault(require("axios"));
class AuthService {
    constructor() {
        this.patientService = new PatientService_1.PatientService();
        this.doctorService = new DoctorService_1.DoctorService();
        this.jwtService = new JwtService_1.JwtService();
    }
    signUp(signUpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!signUpRequest.role || !signUpRequest.email || !signUpRequest.password || !signUpRequest.name) {
                throw new Error(`Missing required fields: \n role: ${!!signUpRequest.role}, name: ${!!signUpRequest.name}, email: ${!!signUpRequest.email}, or password: ${!!signUpRequest.password}`);
            }
            const doctor = yield this.doctorService.findDoctorByEmail(signUpRequest.email);
            const patient = yield this.patientService.findPatientByEmail(signUpRequest.email);
            if (doctor || patient) {
                return null;
            }
            const hashedPassword = yield bcrypt_1.default.hash(signUpRequest.password, 10);
            const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
            if (signUpRequest.role === "Patient") {
                const createdPatient = yield this.patientService.savePatient({
                    name: signUpRequest.name,
                    email: signUpRequest.email,
                    password: hashedPassword,
                    verificationToken
                });
                if (!createdPatient) {
                    throw new Error("Unable to create new Patient!");
                }
                const token = this.jwtService.generateToken(createdPatient === null || createdPatient === void 0 ? void 0 : createdPatient.email, "Patient", createdPatient === null || createdPatient === void 0 ? void 0 : createdPatient.id);
                return { token: token, email: createdPatient.email, name: createdPatient.name };
            }
            else if (signUpRequest.role === "Doctor") {
                const createdDoctor = yield this.doctorService.saveDoctor({
                    name: signUpRequest.name,
                    email: signUpRequest.email,
                    password: hashedPassword,
                    verificationToken,
                    experience: signUpRequest.experience
                });
                if (!createdDoctor) {
                    throw new Error("Unable to create new Patient!");
                }
                const token = this.jwtService.generateToken(createdDoctor === null || createdDoctor === void 0 ? void 0 : createdDoctor.email, "Doctor", createdDoctor === null || createdDoctor === void 0 ? void 0 : createdDoctor.id);
                return { token: token, email: createdDoctor.email, name: createdDoctor.name };
            }
            else {
                throw new Error("Invalid user type");
            }
        });
    }
    signIn(signInRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = signInRequest.body;
            if (!email || !password) {
                throw new Error(`Following details not defined!\n Please provide following to proceed:\n email: ${!!email}, password: ${!!password}`);
            }
            const patient = yield this.patientService.findPatientByEmail(email);
            const doctor = yield this.doctorService.findDoctorByEmail(email);
            if (!patient && !doctor) {
                return null;
            }
            if (patient) {
                const isPasswordValid = yield bcrypt_1.default.compare(password, patient.password);
                if (isPasswordValid) {
                    const token = this.jwtService.generateToken(patient.email, "Patient", patient.id);
                    return { token: token, email: patient.email, name: patient.name };
                }
                return null;
            }
            else if (doctor) {
                const isPasswordValid = yield bcrypt_1.default.compare(password, doctor.password);
                if (isPasswordValid) {
                    const token = this.jwtService.generateToken(doctor.email, "Doctor", doctor.id);
                    return { token: token, email: doctor.email, name: doctor.name };
                }
                return null;
            }
            else {
                throw new Error('Invalid user type');
            }
        });
    }
    getPatientById(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield this.patientService.findPatientById(patientId);
            if (!patient) {
                return null;
            }
            const patientObj = patient.toObject();
            const { _id, password } = patientObj, rest = __rest(patientObj, ["_id", "password"]);
            return rest;
        });
    }
    getDoctorById(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield this.doctorService.findDoctorById(doctorId);
            if (!doctor) {
                return null;
            }
            const doctorObj = doctor.toObject();
            const { _id, password } = doctorObj, rest = __rest(doctorObj, ["_id", "password"]);
            return rest;
        });
    }
    signInByGoogle(code, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const googleResponse = yield GoogleAuthconfig_1.oauth2Client.getToken(code);
            const userResponse = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);
            const { email, name, verified_email, picture } = userResponse.data;
            let userInfo;
            if (role === "Patient") {
                userInfo = yield this.patientService.findPatientByEmail(email);
                if (!userInfo) {
                    userInfo = yield this.patientService.savePatient({
                        name,
                        email,
                        password: '',
                        isVerified: verified_email,
                        profileUrl: picture,
                        isOAuth: true
                    });
                }
            }
            else if (role === "Doctor") {
                userInfo = yield this.doctorService.findDoctorByEmail(email);
                if (!userInfo) {
                    userInfo = yield this.doctorService.saveDoctor({
                        name,
                        email,
                        password: '',
                        isVerified: verified_email,
                        profileUrl: picture,
                        isOAuth: true
                    });
                }
            }
            else {
                throw new Error('Invalid user role');
            }
            if (!userInfo || !userInfo.id) {
                throw new Error('Unable to save user in the database');
            }
            const token = this.jwtService.generateToken(email, "Doctor", userInfo.id);
            return { token, email, name, profile: userInfo.profileUrl || '' };
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map