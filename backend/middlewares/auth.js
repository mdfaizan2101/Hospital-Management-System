import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate dashboard users
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {

    const token = req.cookies.adminToken;

    if (!token) {
      return next(new ErrorHandler("Dashboard User Is Not Authenticated As Admin!", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (req.user.role !== "Admin") {
      return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
    }
    next();
});


export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {

    const token = req.cookies.patientToken;
    
    // Debug logging
    console.log('Cookies received:', req.cookies);
    console.log('Patient token:', token);

    if (!token) {
      return next(new ErrorHandler("Patient is not authenticated! Please login again.", 400));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            return next(new ErrorHandler("User not found!", 404));
        }
        
        if (req.user.role !== "Patient") {
            return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
        }
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return next(new ErrorHandler("Invalid token! Please login again.", 401));
    }
});