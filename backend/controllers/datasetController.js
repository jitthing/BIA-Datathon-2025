// controllers/datasetController.js

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const axios = require("axios");
const haversine = require('haversine-distance'); // You can use this package to calculate distances

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

async function getCoordinates(countryName) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    countryName
  )}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK" && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error(`No results for: ${countryName}`);
      return { lat: null, lng: null }; // Handle invalid locations
    }
  } catch (error) {
    console.error(
      `Error fetching coordinates for ${countryName}:`,
      error.message
    );
    return { lat: null, lng: null };
  }
}

async function getPeople(req, res) {
    const { data: relations, error } = await req.supabase
        .from('dataset')
        .select('Subject, Predicate, Object')
        .or('Predicate.ilike.%of%,Predicate.ilike.%by%')
        .not('Object', 'ilike', 'hi%')
        .not('Subject', 'ilike', 'hi%');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const result = [];

    for (const relation of relations) {
        if (!relation.Subject || !relation.Predicate || !relation.Object) continue;

        const { lat, lng } = await getCoordinates(relation.Object);

        if (lat !== null && lng !== null) {
            const text = `${relation.Subject}, ${relation.Predicate}, ${relation.Object}`;
            result.push({
                lat,
                lng,
                text
            });
        }
    }

    const groupedResult = groupByProximity(result, 1000); // Group places within 1000 meters

    return res.json(groupedResult);
}

// Function to group places by proximity
function groupByProximity(data, threshold) {
    const groups = [];

    data.forEach(item => {
        let added = false;

        for (const group of groups) {
            if (group.length > 0) {
                const distance = haversine(
                    { lat: item.lat, lng: item.lng },
                    { lat: group[0].lat, lng: group[0].lng }
                );

                if (distance <= threshold) {
                    group.push(item);
                    added = true;
                    break;
                }
            }
        }

        if (!added) {
            groups.push([item]);
        }
    });

    // Aggregate the text of all places in each group
    const aggregatedGroups = groups.map(group => {
        const aggregatedText = group.map(item => item.text).join('; ');
        return {
            lat: group[0].lat,
            lng: group[0].lng,
            text: aggregatedText
        };
    });

    return aggregatedGroups;
}

module.exports = { getDataset , getPeople};
