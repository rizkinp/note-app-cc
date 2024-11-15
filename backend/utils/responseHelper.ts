// utils/responseHelper.ts
import { Response } from 'express';

export const successResponse = (res: Response, data: any, message: string = 'Success') => {
  res.status(200).json({ code: res.statusCode, message, data });
};

export const errorResponse = (res: Response, message: string = 'Error', statusCode: number = 500) => {
  res.status(statusCode).json({ code: res.statusCode, message });
};
