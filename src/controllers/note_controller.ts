import { Request, Response } from 'express';
import { exceptionResponse, response } from '../core/commons/response';
import { createNote, deleteNote, getAllNotes, getDetailNote, updateNote } from '../core/repository/notes/service';
import { CustomError } from '../core/commons/exceptions';

const getNotes = async (req: Request, res: Response) => {
    try {
        const jwt = req.headers.authorization;
        const extraParam = req.query
        const data = await getAllNotes(jwt!, extraParam);
        if (data.data) {
            return response(res, {
                code: 200,
                success: true,
                message: 'Notes fetched successfully',
                content: data.data
            });
        } else {
            return response(res, {
                code: 404,
                success: false,
                message: 'No notes found'
            });
        }
    } catch (error: any){
        return exceptionResponse(res, error);
    }
}

const createSingleNote = async (req: Request, res: Response) => {
    try {
        const jwt = req.headers.authorization
        const body = req.body
        const data = await createNote(jwt!, body)
        if (data) {
            return response(res, {
                code: 200,
                success: true,
                message: 'Note created successfully',
                content: data.content
            });
        } else {
            return exceptionResponse(res, new CustomError(400, 'Note created failed'));
        }
    } catch (error: any) {
        return exceptionResponse(res, error);
    }
}

const updateNoteById = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.noteId
        const body = req.body
        const jwt = req.headers.authorization
        const data = await updateNote(jwt!,noteId, body)
        if (data) {
            return response(res, {
                code: 200,
                success: true,
                message: 'Note updated successfully',
                content: data.content
            });
        } else {
            return exceptionResponse(res, new CustomError(400, 'Note updated failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const deleteNoteById = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.noteId
        const jwt = req.headers.authorization
        const data = await deleteNote(jwt!, noteId)
        if (data) {
            return response(res, {
                code: 200,
                success: true,
                message: 'Note deleted successfully'
            });
        } else {
            return exceptionResponse(res, new CustomError(400, 'Note deleted failed'))
        }
    } catch(error: any){
        return exceptionResponse(res, error)
    }
}

const detailNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.noteId
        const jwt = req.headers.authorization
        const data = await getDetailNote(jwt!, noteId)
        if (data) {
            return response(res, {
                code: 200,
                success: true,
                message: 'Note fetched successfully',
                content: data.data![0]
            });
        } else {
            return exceptionResponse(res, new CustomError(400, 'Note not found'))
        }
    } catch(error: any) {
        return exceptionResponse(res, error)
    }
}

export { getNotes, createSingleNote, updateNoteById, deleteNoteById, detailNote }