import express from 'express';
const app = express();
import authRouter from './routes/auth.routes.js';
import { connect } from './db/connect.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
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
