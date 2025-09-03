import mongoose from 'mongoose';

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM"
    })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error(`Some error occurred while connecting to the database: ${err}`);
    });
}