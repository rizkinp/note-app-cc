import { Router } from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById, searchNotes, updateNote, pinNote } from '../controllers/noteController';

const router = Router();

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/search', searchNotes); 
router.put('/:id/pin', pinNote);

export default router;
