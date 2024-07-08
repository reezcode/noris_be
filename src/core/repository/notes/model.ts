interface Note {
    active?: boolean | null
    created_at?: string
    created_by: number
    description?: string | null
    end_date?: string | null
    group?: number | null
    id?: number
    name: string
    reminder?: boolean | null
    start_date?: string | null
    tags?: string[] | null
}

export { Note }