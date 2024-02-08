const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

console.log("Hello World!");

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Testing whether the API works",
  });
});

app.listen(PORT, () => console.log("Your server is running on PORT" + PORT));