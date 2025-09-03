import express from 'express';
import { config } from 'dotenv';
import cors from "cors";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js'; 
import messageRouter from './router/messageRouter.js';
import {errorMiddleware} from './middlewares/errorMiddleware.js';
import userRouter from './router/userRouter.js';
import appointmentRouter from './router/appointmentRouter.js';


const app = express();
config({path: './config/config.env'});

app.use(
    cors({
    origin: [process.env.FRONTEND_URL, process.env.Dashboard_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    })
);


app.use(cookieParser());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Add root route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hospital Management System API is running!',
    version: '1.0.0',
    endpoints: {
      users: '/api/v1/user',
      appointments: '/api/v1/appointment',
      messages: '/api/v1/message'
    }
  });
});

app.use(
    fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    })
);


app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/appointment', appointmentRouter);


dbConnection();


// Error middleware
app.use(errorMiddleware);

export default app;