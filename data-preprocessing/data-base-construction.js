const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const csvParser = require("csv-parser");

const url = "mongodb://localhost:27017/";
const path_latest = "owid-covid-latest.json";
const path_mortality = "excess_mortality.csv";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB...");

    let db = client.db("covid-analyzer");

    // Inserting data from JSON file
    // fs.readFile(path_latest, "utf8", (err, data) => {
    //   if (err) {
    //     console.error("An error occurred while reading the file:", err);
    //     return;
    //   }

    //   let parsedData = JSON.parse(data);

    //   let covidData = [];
    //   for (let countryCode in parsedData) {
    //     let countryData = parsedData[countryCode];
    //     countryData["countryCode"] = countryCode;
    //     covidData.push(countryData);
    //   }
    //   console.log("Data processed...");

    //   db.collection("covidData").insertMany(covidData)
    //     .then((res) => {
    //       console.log("Number of documents inserted: " + res.insertedCount);
    //     })
    //     .catch((err) => {
    //       console.error("An error occurred while inserting data into MongoDB:", err);
    //     });
    // });

    // Inserting data from CSV file
    let mortalityData = [];

    fs.createReadStream(path_mortality)
      .pipe(csvParser())
      .on("data", (row) => {
        // Convert all numerical fields from string to number
        for (let field in row) {
          if (
            field !== "location" &&
            field !== "date" &&
            field !== "time_unit"
          ) {
            row[field] = Number(row[field]);
          }
        }

        mortalityData.push(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");

        db.collection("mortalityData")
          .insertMany(mortalityData)
          .then((res) => {
            console.log("Number of documents inserted: " + res.insertedCount);
            client.close();
            console.log("Database connection closed...");
          })
          .catch((err) => {
            console.error(
              "An error occurred while inserting data into MongoDB:",
              err
            );
          });
      });
  })
  .catch((err) => {
    console.error("An error occurred while connecting to MongoDB:", err);
  });
