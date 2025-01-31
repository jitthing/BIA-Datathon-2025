const express = require("express");

const { getGraphRelationships } = require("../controllers/neo4jController");

const {
  getRelationships,
  updateCountries,
  getCountriesWithCoor,
} = require("../controllers/relationshipController");

router = express.Router();

// Relationship routes
router.get("/relationships", getRelationships);
router.get("/graph/relationships", getGraphRelationships);
router.get("/update-coor", updateCountries);
router.get("/get-country-coord", getCountriesWithCoor);

module.exports = router;
