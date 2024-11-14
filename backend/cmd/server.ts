import express from 'express';
import { connectDB } from '../config/db';
import noteRoutes from '../routes/noteRoutes';

const app = express();

app.use(express.json());
app.use('/api', noteRoutes);

const startServer = async () => {
  await connectDB();
  console.log('Database connected.');
};

export { app, startServer };
