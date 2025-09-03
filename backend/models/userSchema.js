import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema  = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be at least 8 characters"],
        select: false, // Do not return password in queries
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
        default: "user",
    },
    //
    availability: {
        isAvailable: {
            type: Boolean,
            default: true,
        },
        days: {
            type: [String],
            default: [],
        },
        from: {
            type: String,
        },
        to: {
            type: String,
        },
    },
    //
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // ✅ only skip hashing if not modified

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};


// userSchema.js
export const User = mongoose.model("User", userSchema);
