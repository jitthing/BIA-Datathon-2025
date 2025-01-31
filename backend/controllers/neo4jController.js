const { getSession } = require("../middleware/neo4j");

// Fetch all relationships from Neo4j
async function getGraphRelationships(req, res) {
  const session = getSession();

  try {
    const result = await session.run(
      "MATCH (a)-[r]->(b) RETURN a, r, b LIMIT 10"
    );

    const relationships = result.records.map((record) => ({
      source: record.get("a").properties,
      relationship: record.get("r").type,
      target: record.get("b").properties,
    }));

    if (relationships.length === 0) {
      return res.status(404).json({ error: "No relationships found" });
    }

    return res.status(200).json({ success: true, data: relationships });
  } catch (error) {
    console.error("Error fetching Neo4j relationships:", error);
    return res.status(500).json({ success: false, error: error.message });
  } finally {
    await session.close();
  }
}

module.exports = { getGraphRelationships };
