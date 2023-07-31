const MortalityData = require("../models/mortalityModel");

exports.getAllMortalityData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the requested page from query parameter
    const limit = parseInt(req.query.limit) || 10; // Set a default limit of 10 items per page
    const skip = (page - 1) * limit;

    const totalDocs = await MortalityData.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);

    const data = await MortalityData.find().skip(skip).limit(limit);

    res.status(200).json({
      currentPage: page,
      totalPages,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMortalityDataByCountry = async (req, res) => {
  const { country } = req.params;
  const { page, limit } = req.query;

  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;

  try {
    const skip = (pageNumber - 1) * pageSize;

    const data = await MortalityData.find({ location: country })
      .skip(skip)
      .limit(pageSize);

    const totalCount = await MortalityData.countDocuments({
      location: country,
    });
    const totalPages = Math.ceil(totalCount / pageSize);

    res.json({
      data,
      currentPage: pageNumber,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching mortality data:", error);
    res.status(500).json({ error: "Failed to fetch mortality data" });
  }
};

exports.compareMortalityDataByCountries = async (req, res) => {
  try {
    const data1 = await MortalityData.find({ location: req.body.country1 });
    const data2 = await MortalityData.find({ location: req.body.country2 });
    res.status(200).json({ country1: data1, country2: data2 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
