import mongoose from "mongoose";
import validator from "validator";


const messageSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
        minLength: [10, "Message must be at least 10 characters"],
    },
});


// messageSchema.js
export const Message = mongoose.model("Message", messageSchema);
