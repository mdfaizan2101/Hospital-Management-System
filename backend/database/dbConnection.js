import mongoose from 'mongoose';

export const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
            serverSelectionTimeoutMS: 20000, // wait up to 20s for initial connection
            socketTimeoutMS: 45000, // close sockets after 45s of inactivity
        })
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((err) => {
            console.error("Some error occurred while connecting to the database:", err?.message || err);
        });
}