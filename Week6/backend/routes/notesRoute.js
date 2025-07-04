import express from 'express'
import { addNotes, getNotes, removeNotes, updateNotes ,getSingleNotes} from '../controllers/NotesControllers.js';
const notesRouter = express.Router();

notesRouter.post("/addNotes", addNotes);
notesRouter.get("/getAllNotes", getNotes);
notesRouter.get("/getAllNotes/:id", getSingleNotes);
notesRouter.delete("/remove/:id", removeNotes);
notesRouter.put("/update/:id",updateNotes);

export default notesRouter;