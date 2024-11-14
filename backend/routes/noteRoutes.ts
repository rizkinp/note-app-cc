import { Router } from 'express';
import { createNote, getAllNotes, getNoteById } from '../controllers/noteController';

const router = Router();

router.post('/note', createNote);
router.get('/notes', getAllNotes);
router.get('/note/:id', getNoteById)

export default router;
