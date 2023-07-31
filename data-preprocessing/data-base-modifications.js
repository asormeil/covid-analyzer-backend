const mongoose = require("mongoose");
const MortalityData = require("../src/models/mortalityModel");


const fieldsToUpdate = [
  "p_scores_all_ages",
  "p_scores_15_64",
  "p_scores_65_74",
  "p_scores_75_84",
  "p_scores_85plus",
  "deaths_2020_all_ages",
  "average_deaths_2015_2019_all_ages",
  "deaths_2015_all_ages",
  "deaths_2016_all_ages",
  "deaths_2017_all_ages",
  "deaths_2018_all_ages",
  "deaths_2019_all_ages",
  "deaths_2010_all_ages",
  "deaths_2011_all_ages",
  "deaths_2012_all_ages",
  "deaths_2013_all_ages",
  "deaths_2014_all_ages",
  "deaths_2021_all_ages",
  "time",
  "p_scores_0_14",
  "projected_deaths_since_2020_all_ages",
  "excess_proj_all_ages",
  "cum_excess_proj_all_ages",
  "cum_proj_deaths_all_ages",
  "cum_p_proj_all_ages",
  "p_proj_all_ages",
  "p_proj_0_14",
  "p_proj_15_64",
  "p_proj_65_74",
  "p_proj_75_84",
  "p_proj_85p",
  "cum_excess_per_million_proj_all_ages",
  "excess_per_million_proj_all_ages",
  "deaths_2022_all_ages",
  "deaths_2023_all_ages",
  "deaths_since_2020_all_ages"
];

async function fixDataTypes() {
  const data = await MortalityData.find();
  console.log(data.length);
  
  for (const item of data) {
    fieldsToUpdate.forEach(async (field) => {
      if (typeof item[field] === "string") {
        item[field] = parseFloat(item[field]);
        try {
          await item.save();
        } catch (error) {
          console.log(`Error in saving: ${error}`);
        }
      }
    });
  }
}

mongoose
  .connect("mongodb://localhost:27017/covid-analyzer", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    fixDataTypes();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
