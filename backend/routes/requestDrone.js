const express = require("express");
const router = express.Router();

router.post("/requestDrone", (req, res) => {
  const { coordinates } = req.body;
  if (coordinates == undefined) {
    res.send({ stage: "Requesting" });
  } else {
    res.send({ stage: "Searching" });
  }
  console.log(coordinates);
});
module.exports = router;
