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
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.signInByGoogle = exports.signin = exports.signup = void 0;
const AuthService_1 = require("../service/AuthService");
const authService = new AuthService_1.AuthService();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdUser = yield authService.signUp(req.body);
        if (!createdUser) {
            return res.status(400).json({ success: false, message: "Email already exists or unable to create user!" });
        }
        return res.status(201).json({ success: true, message: "User is created successfully!", user: createdUser });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDetails = yield authService.signIn(req);
        if (!userDetails) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        return res.status(200).json({ success: true, message: "User is logged in successfully!", userDetails });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.signin = signin;
const signInByGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, role } = req.body;
    try {
        const userDetails = yield authService.signInByGoogle(code, role);
        if (!userDetails) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        return res.status(200).json({ success: true, message: "User is logged in successfully!", userDetails });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.signInByGoogle = signInByGoogle;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ success: false, message: "No user found!" });
        }
        if (!user.userId) {
            return res.status(401).json({ success: false, message: "No userId found!" });
        }
        if (user.role === "Patient") {
            const patient = yield authService.getPatientById(user.userId);
            if (!patient) {
                return res.status(404).json({ success: false, message: "Patient not found!" });
            }
            return res.status(200).json({ success: true, user: patient });
        }
        else if (user.role === "Doctor") {
            const doctor = yield authService.getDoctorById(user.userId);
            if (!doctor) {
                return res.status(404).json({ success: false, message: "Doctor not found!" });
            }
            return res.status(200).json({ success: true, user: doctor });
        }
        else {
            return res.status(401).json({ success: false, message: "Unauthorized user role!" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.me = me;
//# sourceMappingURL=AuthController.js.map