import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema  = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [2, "First name must be at least 2 characters"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [2, "First name must be at least 2 characters"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must be at least 10 characters"],
        maxLength: [10, "Phone number must be at atmost 10 characters"],
    },
    aadhaar: {
        type: String,
        required: true,
        minLength: [12, "Aadhar Number should be 12 characters"],
        maxLength: [12, "Aadhar Number should be 12 characters"],
    },
    dob: {
        type: Date,
        required: [true, "Date of Birth is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"],
    },
    appointment_date: {
        type: Date,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
});


export const Appointment =  mongoose.model("Appointment", appointmentSchema);
