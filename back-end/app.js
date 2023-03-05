const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");



app.use(cors());
app.use(bodyParser.json());

const userRoute = require("./routes/user");

app.use("/user", userRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("DB Connected");
});

app.listen(3001, () => {
  console.log("server is running");
});
