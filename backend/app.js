const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const PORT = 4000;

app.use(cors());
app.use(express.json());

// importing requestDrone route
app.use(require("./routes/requestDrone"));

// Route to send user data to react

const userData = fs.readFileSync("./userDat.json");
app.get("/userData", (req, res) => {
  res.json(JSON.parse(userData));
});

app.listen(PORT, () => {
  console.log("AT" + PORT);
});
