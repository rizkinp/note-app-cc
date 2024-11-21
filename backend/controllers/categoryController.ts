import { CreateCategoryDTO } from "../dtos/categoryDTO";
import categoryService from "../services/categoryService";
import { errorResponse, successResponse } from "../utils/responseHelper";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const data: CreateCategoryDTO = req.body;
        const category = await categoryService.createCategory(data);
        successResponse(res, category, "Category created successfully.");
    } catch (error) {
        errorResponse(res, (error as Error).message);
    }
}

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        successResponse(res, categories, "Categories fetched successfully.");
    } catch (error) {
        errorResponse(res, (error as Error).message);
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.getCategoryById(Number(req.params.id));
        successResponse(res, category, "Category fetched successfully.");
    } catch (error) {
        errorResponse(res, (error as Error).message);
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const data: CreateCategoryDTO = req.body;
        const category = await categoryService.updateCategory(Number(req.params.id), data);
        successResponse(res, category, "Category updated successfully.");
    } catch (error) {
        errorResponse(res, (error as Error).message);
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.deleteCategory(Number(req.params.id));
        successResponse(res, category, "Category deleted successfully.");
    } catch (error) {
        errorResponse(res, (error as Error).message);
    }
}
