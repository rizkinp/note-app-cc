import { Router } from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById, searchNotes, updateNote, pinNote, archiveNote, getNotesByIsPinned, getNotesByCategory, getNotesByIsArchived, deleteAllNotes } from '../controllers/noteController';

const router = Router();

router.post('/', createNote); // POST /api/notes
router.get('/', getAllNotes); // GET /api/notes
router.get('/pinned', getNotesByIsPinned); // GET /api/notes/pinned
router.get('/q', searchNotes);  // GET /api/notes/q
router.get('/archived', getNotesByIsArchived); // GET /api/notes/archived
router.get('/:id', getNoteById); // GET /api/notes/:id
router.get('/category/:id', getNotesByCategory); // GET /api/notes/category/:id
router.put('/:id', updateNote); // PUT /api/notes/:id
router.put('/:id/pin', pinNote); // PUT /api/notes/:id
router.put('/:id/archive', archiveNote); // PUT /api/notes/:id
router.delete('/:id', deleteNote); // DELETE /api/notes/:id
router.delete('/', deleteAllNotes); // DELETE /api/notes
export default router;
