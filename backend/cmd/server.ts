import express from 'express';
import cors from 'cors'; 
import { connectDB } from '../config/db';
import apiRoutes from '../routes/apiRoutes';


const app = express();

app.use(cors()); 
app.use(express.json());
app.use('/api', apiRoutes);
app.use(cors({
  origin: ['http://localhost:5173', 'https://note-app-cc.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const startServer = async () => {
  await connectDB();
  console.log('Database connected.');
};

export { app, startServer };
