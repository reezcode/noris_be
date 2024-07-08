import { createSingleNote, deleteNoteById, detailNote, getNotes, updateNoteById } from "../controllers/note_controller";
import { authMiddleware } from "../core/commons/middlewares/auth";
import validateBody, { noteSchema } from "../core/validator";

const { Router } = require('express');

const noteRoutes = Router();

// apply middleware for auth token
noteRoutes.use(authMiddleware)

noteRoutes.get('/list', getNotes)
noteRoutes.get('/:noteId', detailNote)
noteRoutes.post('/create', validateBody(noteSchema), createSingleNote)
noteRoutes.put('/update/:noteId', validateBody(noteSchema), updateNoteById)
noteRoutes.delete('/delete/:noteId', deleteNoteById)

export default noteRoutes;