import express from 'express';
const app = express();
import authRouter from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { v2 as cloudinary } from 'cloudinary';
import { connect } from './db/connect.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log('connected to db');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
app.use('/api/auth', authRouter);
app.use('/api/users', userRoutes);
