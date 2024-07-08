import { Request, Response } from 'express';
import { exceptionResponse, response } from '../core/commons/response';
import { createNote, getAllNotes } from '../core/repository/notes/service';
import { CustomError } from '../core/commons/exceptions';

const getNotes = async (req: Request, res: Response) => {
    try {
        const jwt = req.headers.authorization;
        const data = await getAllNotes(jwt!);
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

export { getNotes, createSingleNote }