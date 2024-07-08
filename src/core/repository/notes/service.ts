import client from "../../../database/client"
import { CustomError } from "../../commons/exceptions"
import { ExtraParam } from "../../commons/models/extra_param"
import { getUserId } from "../user/service"
import { Note } from "./model"

const getAllNotes = async (token: string, param: ExtraParam) => {
    try {
        const userId = await getUserId(token)
        const notes = await client.from('notes')
            .select('*')
            .eq('created_by', userId[0].id)
            .order(param.order_by ?? "id", { ascending: param.sort === 'asc' ? true : false })
            .limit(param.limit ?? 10)
            .range(param.page ? param.page * (param.limit ?? 10) : 0, param.limit ?? 10 * (param.page ?? 1))
        console.log(notes)
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

const updateNote = async (token: string, noteId: string, note: Note) => {
    try {
        const userId = await getUserId(token)
        const { error } = await client.from('notes').update(note).eq('id', noteId).eq('created_by', userId[0].id)
        if (error) {
            throw new CustomError(400, error.message)
        }
        return {
            message: 'Note updated successfully',
            content: note
        }
    } catch (error) {
        throw error
    }
}

const deleteNote = async (token: string, noteId: string) => {
    try {
        const userId = await getUserId(token)
        const { error } = await client.from('notes').delete().eq('id', noteId).eq('created_by', userId[0].id)
        if (error) {
            throw new CustomError(400, error.message)
        } else {
            return {
                message: 'Note deleted successfully'
            }
        }
    } catch (error) {
        throw error
    }
}

const getDetailNote = async (token: string, noteId: string) => {
    try {
        const userId = await getUserId(token)
        const note = await client.from('notes').select('*').eq('id', noteId).eq('created_by', userId[0].id)
        if (note) {
            return note
        } else {
            throw new CustomError(400, 'Note not found')
        }
    } catch (error) {
        throw error
    }
}

export { getAllNotes, createNote, updateNote, deleteNote, getDetailNote }