const express = require("express");
const morgan = require("morgan");
const router = require("./routes/envelopes");
const app = express();
const docsRouter = require("./routes/docs");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

//Logging
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).send("This server is running super good");
});

app.use("/api-docs", docsRouter);
app.use("/api/v1/envelopes", router);

const PORT = process.env.PORT;

app.listen(3000, () => {
  console.log("This is testing");
});
