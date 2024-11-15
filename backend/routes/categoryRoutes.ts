// routes/categoryRoutes.js
import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryByName, updateCategory } from '../controllers/categoryController';

const router = Router();

router.post('/', createCategory); // POST /api/category
router.get('/', getAllCategories); // GET /api/category
router.get('/:name', getCategoryByName); // GET /api/category/:name
router.put('/:id', updateCategory); // PUT /api/category/:id
router.delete('/:id', deleteCategory); // DELETE /api/category/:id

export default router;
