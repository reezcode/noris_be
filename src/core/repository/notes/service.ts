import client from "../../../database/client"
import { CustomError } from "../../commons/exceptions"
import { getUserId } from "../user/service"
import { Note } from "./model"

const getAllNotes = async (token: string) => {
    try {
        const userId = await getUserId(token)
        const notes = await client.from('notes').select('*').eq('created_by', userId[0].id)
        if (notes) {
            return notes
        } else {
            return {
                data: []
            }
        }
    } catch (error) {
        throw error
    }
}

const createNote = async (token: string, note: Note) => {
    try {
        const userId = await getUserId(token)
        const { error } = await client.from('notes').insert(
            {
                name: note.name,
                description: note.description,
                start_date: note.start_date,
                end_date: note.end_date,
                reminder: note.reminder,
                active: note.active,
                tags: note.tags,
                group: note.group,
                created_by: userId[0].id
            }
        )
        if (error) {
            throw new CustomError(400, error.message)
        }
        return {
            message: 'Note created successfully',
            content: note
        }
    } catch (error) {
        throw error
    }
}

export { getAllNotes, createNote }