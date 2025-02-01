async function getTimelineItems(req, res) {
  const { word } = req.query;
  
  if (!word) {
    return res.status(400).json({ error: "Missing query parameter 'word'" });
  }

  const { data, error } = await req.supabase
    .from("news_dates")
    .select("*")
    .ilike("text", `%${word}%`);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "No data found" });
  }

  return res.status(200).json(data);
}

module.exports = { getTimelineItems };

async function updateTimelineItem(req, res) {
  const { id, newDate } = req.body;

  if (!id || !newDate) {
    return res.status(400).json({ error: "Missing required parameters: id and newDate" });
  }

  const { data, error } = await req.supabase
    .from("news_dates")
    .update({ extracted_date: newDate })
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: "Timeline item updated successfully", data });
}

module.exports = { getTimelineItems, updateTimelineItem };
