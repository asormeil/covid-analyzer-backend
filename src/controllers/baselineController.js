const MortalityData = require('../models/mortalityModel');
const CovidData = require('../models/dataModel');

exports.compareData = async function(req, res) {
  const baselineData = req.body.baseline; 
  const comparisonData = req.body.comparison; 

  try {
    let baselineMortalityData = await MortalityData.findOne(baselineData);
    let comparisonMortalityData = await MortalityData.findOne(comparisonData);

    let baselineCovidData = await CovidData.findOne(baselineData);
    let comparisonCovidData = await CovidData.findOne(comparisonData);

    let data = {
      baseline: {
        mortality: baselineMortalityData,
        covid: baselineCovidData
      },
      comparison: {
        mortality: comparisonMortalityData,
        covid: comparisonCovidData
      }
    };
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
