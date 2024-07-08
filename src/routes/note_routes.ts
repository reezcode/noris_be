import { createSingleNote, getNotes } from "../controllers/note_controller";
import validateBody, { noteSchema } from "../core/validator";

const { Router } = require('express');

const noteRoutes = Router();

noteRoutes.get('/list', getNotes)
noteRoutes.post('/create', validateBody(noteSchema), createSingleNote)

export default noteRoutes;