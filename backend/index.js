const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const supabase = require('./middleware/supabase');

const PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json());

// Attach the supabase client to the request object
app.use((req, res, next) => {
    req.supabase = supabase;
    next();
});

app.use("/api", require("./router/appRouter"));

app.get("/", async (req, res) => {
    // Test the Supabase client
    try {
        const { data, error } = await req.supabase.default.from('entity_relationship_all').select('*').limit(10);
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Error fetching data' });
        }
        return res.json({ message: "[SYSTEM] This is the backend endpoint.", data });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'Unexpected error' });
    }
});

app.listen(PORT, () => {
    console.log(`[SYSTEM] Server started on port ${PORT}...`);
    // Log the Supabase client to check if it is initialized correctly
    // console.log('Supabase Client:', supabase);
    console.log('Supabase Client Methods:', Object.keys(supabase.default));
    // console.log('Supabase REST Methods:', Object.keys(supabase.rest));
});