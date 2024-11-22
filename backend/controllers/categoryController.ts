import { Request, Response } from "express";
import categoryService from "../services/categoryService";
import { successResponse, errorResponse } from "../utils/responseHelper";
import { CreateCategoryDTO } from "../dtos/categoryDTO";

// Create Category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const data: CreateCategoryDTO = req.body;
    const userId = req.userId;
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const category = await categoryService.createCategory(userId, data);
    successResponse(res, category, "Category created successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Get All Categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const categories = await categoryService.getAllCategories(userId);
    successResponse(res, categories, "Categories fetched successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Get Category By ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const category = await categoryService.getCategoryById(userId, Number(req.params.id));
    if (!category) {
      return errorResponse(res, "Category not found.");
    }
    successResponse(res, category, "Category fetched successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Update Category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const data: CreateCategoryDTO = req.body;
    const category = await categoryService.updateCategory(userId, Number(req.params.id), data);
    successResponse(res, category, "Category updated successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const category = await categoryService.deleteCategory(userId, Number(req.params.id));
    successResponse(res, category, "Category deleted successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};
