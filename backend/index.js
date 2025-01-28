const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const supabase = require('./middleware/supabase');

const PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json());

// this attaches the supabase client to the request object, so we can refer to req.supabase when writing controller functions and no need to import supabase in every file
app.use((req, res, next) => {
    req.supabase = supabase;
    next();
  });

app.listen(PORT, () => {
    console.log(`[SYSTEM] Server started on port ${PORT}...`);
});