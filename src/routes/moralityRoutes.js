const express = require("express");
const router = express.Router();
const mortalityController = require("../controllers/moralityController");

router.get("/", mortalityController.getAllMortalityData);
router.get("/:country", mortalityController.getMortalityDataByCountry);
router.get(
  "/compare/:country1/:country2",
  mortalityController.compareMortalityDataByCountries
);

module.exports = router;
