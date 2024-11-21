import { Router } from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById, searchNotes, updateNote, pinNote, getNoteByCategory, archiveNote } from '../controllers/noteController';

const router = Router();

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.get('/q', searchNotes); 
router.get('/category/:id', getNoteByCategory);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.put('/:id/pin', pinNote);
router.put('/:id/archive', archiveNote);

export default router;
