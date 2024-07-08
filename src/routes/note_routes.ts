import { createSingleNote, deleteNoteById, getNotes, updateNoteById } from "../controllers/note_controller";
import validateBody, { noteSchema } from "../core/validator";

const { Router } = require('express');

const noteRoutes = Router();

noteRoutes.get('/list', getNotes)
noteRoutes.post('/create', validateBody(noteSchema), createSingleNote)
noteRoutes.put('/update/:noteId', validateBody(noteSchema), updateNoteById)
noteRoutes.delete('/delete/:noteId', deleteNoteById)

export default noteRoutes;