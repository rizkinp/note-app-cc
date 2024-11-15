import { CreateCategoryDTO } from "../dtos/categoryDTO";
import Category from "../models/categoryModel";

class CategoryService {
    // Get All Categories
    async getAllCategories() {
        return await Category.findAll({
            where:{is_deleted : false}
        });
    }
    //Get All Category 
    async getCategoryById(id: number) {
        return await Category.findAll({
            where: {is_deleted : false}
        })
    }

    //Get Category By Name
    async getCategoryByName(name: string) {
        return await Category.findAll({
            where: {name}
        })
    }

    // Create Category
    async createCategory(data: CreateCategoryDTO) {
        return await Category.create(data);
    }

    //Update Category
    async updateCategory(id: number, data: CreateCategoryDTO) {
        return await Category.update(data, { where: { id } });
    }

    // Soft Delete Category
    async deleteCategory(id: number) {
        return await Category.update({ is_deleted: true }, { where: { id } });
    }
}

export default new CategoryService();