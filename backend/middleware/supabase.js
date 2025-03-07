// import { createClient } from '@supabase/supabase-js'
// import dotenv from 'dotenv'

const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const apiKey = process.env.SUPABASE_KEY;

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, apiKey);

// console.log(supabase);
// console.log(supabase.from);

// export default supabase;
module.exports = supabase;
