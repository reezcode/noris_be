
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../database.types'

const supabaseUrl = process.env.SUPABASE_URL ?? ""
const supabaseKey = process.env.SUPABASE_KEY ?? ""
const client = createClient<Database>(supabaseUrl, supabaseKey)

export default client