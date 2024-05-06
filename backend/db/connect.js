import mongoose from 'mongoose';
export const connect = (URL) => {
  mongoose.connect(URL);
};
