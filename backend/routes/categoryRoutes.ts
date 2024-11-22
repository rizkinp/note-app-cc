// routes/categoryRoutes.ts
import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/categoryController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

router.post('/', verifyToken, createCategory); // POST /api/category
router.get('/', verifyToken, getAllCategories); // GET /api/category
router.get('/:id', verifyToken, getCategoryById); // GET /api/category/:id
router.put('/:id', verifyToken, updateCategory); // PUT /api/category/:id
router.delete('/:id', verifyToken, deleteCategory); // DELETE /api/category/:id

export default router;
