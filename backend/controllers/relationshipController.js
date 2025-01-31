// const supabase = require('../middleware/supabase');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const axios = require("axios");

async function getRelationships(req, res) {
  // console.log('getRelationships');
  const { data, error } = await req.supabase
    .from("entity_relationship_all")
    .select("Subject")
    .limit(10);
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "No data found" });
  }

  return res.status(200).json(data);
}

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

async function updateCountries(req, res) {
  const { data: countries, error } = await req.supabase
    .from("countries")
    .select("Object, count")
    .is("lat", null);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  //   if (!data || data.length === 0) {
  //     return res.status(404).json({ error: "No data found" });
  //   }

  for (const country of countries) {
    if (!country.Object) continue; // Skip if country name is empty

    console.log(`Fetching coordinates for ${country.Object}...`);
    const { lat, lng } = await getCoordinates(country.Object);

    if (lat !== null && lng !== null) {
      // 2. Update the row in Supabase
      const { error: updateError } = await req.supabase
        .from("countries") // Replace with your table name
        .update({ lat, long: lng })
        .eq("Object", country.Object);

      if (updateError) {
        console.error(`Error updating ${country.Object}:`, updateError.message);
      } else {
        console.log(`Updated ${country.Object} with lat: ${lat}, long: ${lng}`);
      }
    }
  }

  return res.status(200).json(countries);
}

async function getCountriesWithCoor(req, res) {
  const { data, error } = await req.supabase
    .from("countries")
    .select("Object, count, lat, long");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "No data found" });
  }

  return res.status(200).json(data);
}

module.exports = { getRelationships, updateCountries, getCountriesWithCoor };
