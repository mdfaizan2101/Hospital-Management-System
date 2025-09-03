import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddleware.js';
import { User } from '../models/userSchema.js';
import { generateToken } from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';


export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { 
        firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        gender, 
        dob, 
        aadhaar, 
        role 
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !aadhaar || !gender || !dob || !role) {
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }

    user = await User.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        gender, 
        dob, 
        aadhaar, 
        role 
    });

    generateToken(user, "User Registered Successfully!", 200, res);

});



export const login = catchAsyncErrors(async (req, res, next) => {
    
    // check if req.body is present
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }


    const { email, password, confirmPassword, role } = req.body;


    // Basic field check
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password do not match!", 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorHandler("Invalid Email or Password!", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password!", 400));
    }

    if (role !== user.role) {
        return next(new ErrorHandler("User With This Role Not Found!", 403));
    }

    generateToken(user, "User Logged In Successfully!", 200, res);
});


export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {

    // Check if req.body is present
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const { firstName, lastName, email, phone, aadhaar, dob, gender, password } = req.body;


    if (!firstName || !lastName || !email || !phone || !password || !aadhaar || !gender || !dob) {
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`, 400));
    }

    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        aadhaar,
        dob,
        gender,
        password,
        role: "Admin",
    });
    res.status(200).json({
        success: true,
        message: "New Admin Registered",
        admin,
    });
});


export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });

    if (doctors.length === 0) {
        return next(new ErrorHandler("No Doctors Found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Doctors Fetched Successfully",
        doctors,
    });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;

    if (!user) {
        return next(new ErrorHandler("User Not Found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "User Details Fetched Successfully",
        user,
    });
});


export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.cookie("adminToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Admin Logged Out Successfully",
    });
});


export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.cookie("patientToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Patient Logged Out Successfully",
    });
});



export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    // Fix 1: Access specific file field
    if (!req.files || !req.files.docAvatar) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }

    const docAvatar = req.files.docAvatar; // Fix 2: Only the avatar file
    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("Invalid Image Format!", 400));
    }

    const { 
        firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        gender, 
        dob, 
        aadhaar,
        doctorDepartment
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !aadhaar || !dob || !gender || !doctorDepartment) {
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`, 400));
    }

    // Fix 3: Use correct cloudinary upload
    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    );

    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
        return next(new ErrorHandler("Cloudinary Upload Failed!", 500));
    }

    const doctor = await User.create({
        firstName,
        lastName,
        email, 
        phone, 
        password, 
        gender, 
        dob, 
        aadhaar,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });

    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor,
    });
});

//
// Admin: Update a doctor's record
export const updateDoctorById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    // Allow updating only specific fields
    const allowedUpdates = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "doctorDepartment",
        "availability",
        "gender",
        "dob",
        "aadhaar",
    ];

    const updates = {};
    for (const key of allowedUpdates) {
        if (key in req.body) updates[key] = req.body[key];
    }

    if (Object.keys(updates).length === 0 && !req.files) {
        return next(new ErrorHandler("No valid fields provided for update", 400));
    }

    // Optional: update avatar
    if (req.files && req.files.docAvatar) {
        const docAvatar = req.files.docAvatar;
        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!allowedFormats.includes(docAvatar.mimetype)) {
            return next(new ErrorHandler("Invalid Image Format!", 400));
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(
            docAvatar.tempFilePath
        );
        if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
            return next(new ErrorHandler("Cloudinary Upload Failed!", 500));
        }
        updates.docAvatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    const doctor = await User.findOne({ _id: id, role: "Doctor" });
    if (!doctor) {
        return next(new ErrorHandler("Doctor not found", 404));
    }

    Object.assign(doctor, updates);
    await doctor.save();

    return res.status(200).json({
        success: true,
        message: "Doctor updated successfully",
        doctor,
    });
});

// Admin: Delete a doctor's record permanently
export const deleteDoctorById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const doctor = await User.findOne({ _id: id, role: "Doctor" });
    if (!doctor) {
        return next(new ErrorHandler("Doctor not found", 404));
    }

    // Optional confirmation gate via query/body flag
    const { confirm } = req.query;
    if (confirm !== 'true') {
        return res.status(400).json({
            success: false,
            message: "Deletion not confirmed. Pass ?confirm=true to proceed.",
        });
    }

    await User.deleteOne({ _id: doctor._id });

    return res.status(200).json({
        success: true,
        message: "Doctor deleted successfully",
    });
});
//