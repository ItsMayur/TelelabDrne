const express = require("express");
const router = express.Router();

router.post("/requestDrone", (req, res) => {
  const { name, email, id, coordinates } = req.body;
  if (!name || !email || !coordinates) {
    return res.status(422).json({ error: "Sorry invalid user" });
  }
  console.log(name + " " + email + " " + id);
  console.log(coordinates);
});
module.exports = router;
