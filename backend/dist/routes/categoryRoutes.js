"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/categoryRoutes.js
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const router = (0, express_1.Router)();
router.post('/', categoryController_1.createCategory); // POST /api/category
router.get('/', categoryController_1.getAllCategories); // GET /api/category
router.get('/:name', categoryController_1.getCategoryByName); // GET /api/category/:name
router.put('/:id', categoryController_1.updateCategory); // PUT /api/category/:id
router.delete('/:id', categoryController_1.deleteCategory); // DELETE /api/category/:id
exports.default = router;
