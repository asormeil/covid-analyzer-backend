const express = require("express");
const router = express.Router();
const covidController = require("../controllers/dataController");

router.get("/", covidController.getAllCovidData);
router.get("/:country", covidController.getCovidDataByCountry);
router.get(
  "/compare/:country1/:country2",
  covidController.compareCovidDataByCountries
);

module.exports = router;
