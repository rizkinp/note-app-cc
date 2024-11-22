// routes/apiRoutes.js
import express from 'express';
import noteRoutes from './noteRoutes';
import categoryRoutes from './categoryRoutes';
import userRoutes from './userRoutes';

const router = express.Router();
router.use('', userRoutes); // Route user
router.use('/notes', noteRoutes); // Route notes
router.use('/category', categoryRoutes); // Route kategori

export default router;
