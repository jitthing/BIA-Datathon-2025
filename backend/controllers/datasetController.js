// controllers/datasetController.js

const getDataset = async (req, res) => {
    try {
        const { search } = req.query; // Extract 'search' from query parameters
        console.log("Received search query:", search);
    
        // Step 1: Fetch Sources where Subject matches the search term
        let sourcesQuery = req.supabase
            .from('dataset') // Ensure 'dataset' is the correct table name
            .select('Source')
            .or(`Subject.ilike.%${search}%,Object.ilike.%${search}%,Predicate.ilike.%${search}%`)
            .limit(100); // Case-insensitive search on 'Subject'
    
        const { data: sourcesData, error: sourcesError } = await sourcesQuery;
    
        if (sourcesError) {
            console.error("Error fetching sources:", sourcesError);
            return res.status(500).json({ error: "Error fetching sources" });
        }
    
        // Extract unique Source values
        const sources = sourcesData.map(item => item.Source);
        console.log("Retrieved sources:", sources);
    
        if (sources.length === 0) {
            // No matching sources found
            return res.status(404).json({ message: "No matching sources found." });
        }
    
        // Step 2: Fetch all rows with the retrieved Source values
        let finalQuery = req.supabase
            .from('dataset')
            .select('*')
            .in('Source', sources); // Filter where 'Source' is in the retrieved sources
    
        const { data: finalData, error: finalError } = await finalQuery;
        console.log('Final Query', finalData);
    
        if (finalError) {
            console.error("Error fetching final data:", finalError);
            return res.status(500).json({ error: "Error fetching final data" });
        }
    
        // Successfully retrieved the data
        return res.status(200).json(finalData);
    
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
};

module.exports = { getDataset };
