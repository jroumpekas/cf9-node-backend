import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './utils/db';

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is up, ${PORT}`);
  });
};

start();