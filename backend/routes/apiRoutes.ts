// routes/apiRoutes.js
import express from 'express';
import noteRoutes from './noteRoutes';
import categoryRoutes from './categoryRoutes';

const router = express.Router();

// Gabungkan semua route di dalam satu grup /api
router.use('/notes', noteRoutes); // Route untuk notes
router.use('/category', categoryRoutes); // Route untuk kategori

export default router;
