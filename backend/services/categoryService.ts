import { CreateCategoryDTO } from "../dtos/categoryDTO";
import Category from "../models/categoryModel";

class CategoryService {
  // Get All Categories
  async getAllCategories(userId: number) {
    return await Category.findAll({
      where: { is_deleted: false, userId },
    });
  }

  // Get Category by ID
  async getCategoryById(userId: number, id: number) {
    return await Category.findOne({
      where: { id, userId, is_deleted: false },  // Menambahkan kondisi untuk userId dan is_deleted
    });
  }

  // Create Category
  async createCategory(userId: number, data: CreateCategoryDTO) {
    return await Category.create({
      ...data,
      userId,  // Menambahkan userId saat membuat kategori
    });
  }

  // Update Category
  async updateCategory(userId: number, id: number, data: CreateCategoryDTO) {
    const [affectedRows] = await Category.update(data, { 
      where: { id, userId, is_deleted: false },  // Memastikan kategori yang diupdate adalah milik user yang tepat dan tidak terhapus
    });

    if (affectedRows === 0) {
      throw new Error('Category not found or already deleted.');
    }
    return { affectedRows };
  }

  // Soft Delete Category
  async deleteCategory(userId: number, id: number) {
    const [affectedRows] = await Category.update(
      { is_deleted: true }, 
      { where: { id, userId, is_deleted: false } }  // Pastikan hanya kategori milik user yang dapat dihapus dan yang belum dihapus
    );

    if (affectedRows === 0) {
      throw new Error('Category not found or already deleted.');
    }
    return { affectedRows };
  }
}

export default new CategoryService();
