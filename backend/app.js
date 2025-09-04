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

// Trust the first proxy (required for secure cookies behind proxies like Render/Heroku)
app.set('trust proxy', 1);

// Build allowed origins from env, ignoring missing values
const allowedOrigins = [process.env.FRONTEND_URL, process.env.DASHBOARD_URL].filter(Boolean);

app.use(
    cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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