const express = require("express");

const {getRelationships} = require("../controllers/relationshipController");
const { getGraphRelationships } = require("../controllers/neo4jController");


router = express.Router();

// Relationship routes
router.get("/relationships", getRelationships);
router.get("/graph/relationships", getGraphRelationships);


module.exports = router;