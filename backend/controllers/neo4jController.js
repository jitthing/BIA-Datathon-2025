const { getSession } = require("../middleware/neo4j");

async function getGraphRelationships(req, res) {
  const session = getSession();

  try {
    const result = await session.run(`
      MATCH (n)-[r]->(m) 
      RETURN DISTINCT n.name AS source, type(r) AS relationship, m.name AS target 
      LIMIT 50
    `);

    if (!result.records || result.records.length === 0) {
      return res.status(200).json({
        success: true,
        nodes: [],
        edges: [],
      });
    }

    const nodes = new Map();
    const edges = [];

    result.records.forEach((record) => {
      const source = record.get("source");
      const target = record.get("target");
      const relationship = record.get("relationship");

      // Ensure uniqueness of nodes
      if (!nodes.has(source)) {
        nodes.set(source, { id: source, label: source });
      }
      if (!nodes.has(target)) {
        nodes.set(target, { id: target, label: target });
      }

      // Add relationships
      edges.push({ from: source, to: target, label: relationship });
    });

    return res.status(200).json({
      success: true,
      nodes: Array.from(nodes.values()), // Convert Map to array
      edges: edges,
    });
  } catch (error) {
    console.error("Neo4j Query Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  } finally {
    await session.close();
  }
}

module.exports = { getGraphRelationships };
