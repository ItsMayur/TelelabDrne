const express = require("express");
const sessions = require("express-session");
const getUserData = require("./firebase.js");
const cors = require("cors");
const app = express();
const fs = require("fs");
const PORT = 4000;

// CORS FOR FRONTEND
app.use(cors({ credentials: true, origin: true }));
// JSON FORMAT FOR DATA
app.use(express.json());

// SESSIONS TIME
const oneDay = 1000 * 60 * 60 * 24;

// SESSION INITALISED
app.use(
  sessions({
    secret: "SESSIONS_SECRET",
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: oneDay * 30,
    },
  })
);
// ROUTE ("/") FOR SESSION ID
app.get("/", (req, res) => {
  req.session.isAuth = true;
  req.session.sessionId = "21092123297";
  res.send({ message: "Session Id assigned" });
});

// IMPORTING REQUST DRONE ROUTE FROM ROUTES
app.use(require("./routes/requestDrone"));

// ROUTE TO SEND USER DATA TO REACT
// const userData = fs.readFileSync("./userDat.json");
app.get("/userData", (req, res) => {
  req.session.isAuth = true;
  // console.log(req.session.sessionId);
  getUserData(String(req.session.sessionId)).then((data) => {
    if (data === undefined) {
      res.send({ message: "Sorry user not defiened" });
    } else {
      console.log(data.Organisation);
      res.send({ Name: data.Name, Organisation: data.Organisation });
    }
  });
});

// ROUTE TO GET DELIVERY HISTORY OF USER
app.get("/deliveryHistory", (req, res) => {
  req.session.isAuth = true;
  getUserData(String(req.session.sessionId)).then((data) => {
    if (data === undefined) {
      console.log("ehh");
    } else {
      console.log(data.Organisation);
      res.send({ DeliveryHistory: data.DeliveryHistory });
    }
  });
});

// LISTING TO PORT
app.listen(PORT, () => {
  console.log("AT >>>  " + PORT);
});
