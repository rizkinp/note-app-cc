import { Response } from 'express';

// Success Response
export const successResponse = (res: Response, data: any, message: string = 'Success', statusCode: number = 200) => {
  return res.status(statusCode).json({
    code: statusCode,
    message,
    data,
  });
};

// Error Response
export const errorResponse = (res: Response, message: string = 'Error', statusCode: number = 500) => {
  return res.status(statusCode).json({
    code: statusCode,
    message,
  });
};
