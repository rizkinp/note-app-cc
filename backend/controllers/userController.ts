import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { successResponse, errorResponse } from '../utils/responseHelper';
import { RegisterUserDTO, LoginUserDTO, UserResponseDTO } from '../dtos/userDTO';

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password }: RegisterUserDTO = req.body;

    // Validation checks
    if (!username || !email || !password) {
      return errorResponse(res, "All fields (username, email, password) are required.", 400);
    }

    const user = await userService.registerUser(username, email, password);

    successResponse(res, {
      id: user.id,
      username: user.username,
      email: user.email,
    }, 'User registered successfully.');
  } catch (error) {
    errorResponse(res, (error as Error).message, 500);
  }
};

// Login a user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginUserDTO = req.body;

    if (!email || !password) {
      return errorResponse(res, "Email and password are required.", 400);
    }

    const { user, token } = await userService.loginUser(email, password);

    successResponse(res, {
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    }, 'Login successful.');
  } catch (error) {
    errorResponse(res, (error as Error).message, 401);
  }
};

