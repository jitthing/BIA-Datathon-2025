const express = require("express");

const {getRelationships} = require("../controllers/relationshipController");

router = express.Router();

// Relationship routes
router.get("/relationships", getRelationships);


module.exports = router;