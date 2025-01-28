import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const apiKey = process.env.SUPABASE_API_KEY 

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, apiKey)

export default supabase;



