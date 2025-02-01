async function getTimelineItems(req, res) {
  const { word } = req.query;
  
  if (!word) {
    return res.status(400).json({ error: "Missing query parameter 'word'" });
  }

  const { data, error } = await req.supabase
    .from("news_dates")
    .select("*")
    .ilike("text", `%${word}%`)
    .limit(10);  

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "No data found" });
  }

  return res.status(200).json(data);
}

module.exports = { getTimelineItems };
