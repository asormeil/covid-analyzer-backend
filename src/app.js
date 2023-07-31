const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const covidRoutes = require("./routes/dataRoutes");
const mortalityRoutes = require("./routes/moralityRoutes");
const baselineRoutes = require("./routes/baselineRoutes");

require("dotenv").config();

const app = express();

var allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use("/api/covid", covidRoutes);
app.use("/api/mortality", mortalityRoutes);
app.use("/api/baseline", baselineRoutes);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
