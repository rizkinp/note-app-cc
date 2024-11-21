// routes/apiRoutes.js
import express from 'express';
import noteRoutes from './noteRoutes';
import categoryRoutes from './categoryRoutes';

const router = express.Router();

router.use('/notes', noteRoutes); // Route notes
router.use('/category', categoryRoutes); // Route kategori

export default router;
