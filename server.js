const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

console.log("Hello World!");

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Testing whether the API works",
  });
});

app.listen(PORT, () => console.log("Your server is running on PORT" + PORT));