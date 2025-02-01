const express = require("express");

// const {getRelationships} = require("../controllers/relationshipController");
const { getDataset, getPeople } = require("../controllers/datasetController");

const { getGraphRelationships } = require("../controllers/neo4jController");

const {
  getRelationships,
  updateCountries,
  getCountriesWithCoor,
} = require("../controllers/relationshipController");

const {
  getTimelineItems,
  updateTimelineItem,
} = require("../controllers/timelineController");

router = express.Router();

// Relationship routes
router.get("/relationships", getRelationships);
router.get("/dataset", getDataset);
// uncommented so we wont expose the endpoint for updating the table
// router.get("/people", getPeople);

router.get("/graph/relationships", getGraphRelationships);
router.get("/update-coor", updateCountries);
router.get("/get-country-coord", getCountriesWithCoor);

router.get("/timeline", getTimelineItems);
router.put("/timeline", updateTimelineItem);

module.exports = router;
