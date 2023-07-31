const covidSchema = require("../models/dataModel");

// COVID Data APIs
exports.getAllCovidData = async (req, res) => {
  try {
    const data = await covidSchema.find();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error in getAllCovidData:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getCovidDataByCountry = async (req, res) => {
  try {
    const data = await covidSchema.find({ location: req.params.country });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.compareCovidDataByCountries = async (req, res) => {
  try {
    const data1 = await covidSchema.find({ location: req.params.country1 });
    const data2 = await covidSchema.find({ location: req.params.country2 });
    res.status(200).json({ country1: data1, country2: data2 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
