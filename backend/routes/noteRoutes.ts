// routes/noteRoutes.ts
import { Router } from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById, searchNotes, updateNote, pinNote, archiveNote, getNotesByIsPinned, getNotesByCategory, getNotesByIsArchived, deleteAllNotes } from '../controllers/noteController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

// Semua rute notes akan membutuhkan token JWT
router.post('/', verifyToken, createNote); // POST /api/notes
router.get('/', verifyToken, getAllNotes); // GET /api/notes
router.get('/pinned', verifyToken, getNotesByIsPinned); // GET /api/notes/pinned
router.get('/q', verifyToken, searchNotes);  // GET /api/notes/q
router.get('/archived', verifyToken, getNotesByIsArchived); // GET /api/notes/archived
router.get('/:id', verifyToken, getNoteById); // GET /api/notes/:id
router.get('/category/:id', verifyToken, getNotesByCategory); // GET /api/notes/category/:id
router.put('/:id', verifyToken, updateNote); // PUT /api/notes/:id
router.put('/:id/pin', verifyToken, pinNote); // PUT /api/notes/:id
router.put('/:id/archive', verifyToken, archiveNote); // PUT /api/notes/:id
router.delete('/:id', verifyToken, deleteNote); // DELETE /api/notes/:id
router.delete('/', verifyToken, deleteAllNotes); // DELETE /api/notes

export default router;
