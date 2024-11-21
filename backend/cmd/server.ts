import express from 'express';
import cors from 'cors'; // Import cors
import { connectDB } from '../config/db';
import apiRoutes from '../routes/apiRoutes';


const app = express();

app.use(cors()); // Gunakan CORS middleware
app.use(express.json());
app.use('/api', apiRoutes);
app.use(cors({
  origin: 'http://localhost:5173', // Ganti dengan domain frontend Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const startServer = async () => {
  await connectDB();
  console.log('Database connected.');
};

export { app, startServer };
