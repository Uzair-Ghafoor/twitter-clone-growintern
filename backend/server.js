import express from 'express';
const app = express();
import authRouter from './routes/auth.routes.js';
import { connect } from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log('connected to db');
    app.listen(3000, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
app.use('/api/auth', authRouter);
