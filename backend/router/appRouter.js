const express = require("express");

const {getRelationships} = require("../controllers/relationshipController");
const {getDataset} = require("../controllers/datasetController");



router = express.Router();

// Relationship routes
router.get("/relationships", getRelationships);
router.get("/dataset", getDataset);



module.exports = router;