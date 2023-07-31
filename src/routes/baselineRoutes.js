const express = require("express");
const router = express.Router();
const baselineController = require("../controllers/baselineController");

router.post("/compare", baselineController.compareData);

module.exports = router;

module.exports = router;
