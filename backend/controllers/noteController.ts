import { Request, Response } from 'express';
import noteService from '../services/noteService';
import { successResponse, errorResponse } from '../utils/responseHelper';

// Note Controller

//Create Note
export const createNote = async (req: Request, res: Response) => {
  try {
    const note = await noteService.createNote(req.body);
    successResponse(res, note, 'Note created successfully.');
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};
//Get All Note
export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await noteService.getAllNotes();
    successResponse(res, notes, 'Notes fetched successfully.');
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};
//Get Note By ID
export const getNoteById = async (req: Request, res: Response) => {
  try {
    const note = await noteService.getNoteById(Number(req.params.id));
    successResponse(res, note, 'Note fetched successfully.');
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};
