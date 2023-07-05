const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const UID = "1234";
const data1 = {
  Age: 18,
  Email: "mayursehgal718@gmail.com",
  Gender: "Male",
  Name: "Mayur",
  Organisation: "NA",
  UID: "21092123297",
  UserType: "Developer",
  DeliveryHistory: [
    {
      deliveryID: "4328912",
      packageName: "Name 1",
      packageWeight: " 3.12",
      packageQuantity: "30",
      packageOrderTime: "24/06/2023",
      packageDeliveryTime: "28/06/2023",
    },
    {
      packageName: "Name 1",
      packageWeight: " 3.12",
      packageQuantity: "30",
      packageOrderTime: "24/06/2023",
      packageDeliveryTime: "28/06/2023",
    },
    {
      packageName: "Name 2",
      packageWeight: " 3.222",
      packageQuantity: "323",
      packageOrderTime: "24/06/2023",
      packageDeliveryTime: "28/06/2023",
    },
    {
      packageName: "Name 3",
      packageWeight: " 5.125",
      packageQuantity: "3",
      packageOrderTime: "24/07/2023",
      packageDeliveryTime: "28/07/2023",
    },
  ],
};

// VARIABLE TO STORE SERVICE ACCOUNT OF FIREBASE
const serviceAccount = require("./serviceAccountKey.json");

// INITIALIZING FIREBASE APP
initializeApp({
  credential: cert(serviceAccount),
});

// USING FIREBASE AS DATABASE
const db = getFirestore();

// FUNCTIONS FOR EASE DATABASE WORK
function userRegister(data) {
  const docRef = db.collection("USERS").doc(data.UID);
  docRef.set({
    Name: data.Name,
    Age: data.Age,
    Email: data.Email,
    Gender: data.Gender,
    UID: data.UID,
    UserType: data.UserType,
    Organisation: data.Organisation,
    DeliveryHistory: data.DeliveryHistory,
  });
}

async function getUserData(UID) {
  const userRef = db.collection("USERS").doc(UID);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log("USER NOT FOUND");
  } else {
    return doc.data();
  }
}

userRegister(data1);

module.exports = getUserData;
