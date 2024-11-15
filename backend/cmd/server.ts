import express from 'express';
import { connectDB } from '../config/db';
import apiRoutes from '../routes/apiRoutes';

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

const startServer = async () => {
  await connectDB();
  console.log('Database connected.');
};

export { app, startServer };
