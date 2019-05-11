import * as firebase from "firebase";
import _ from "lodash";

let database;

const currentdate = new Date();
const date =
  currentdate.getDate() +
  "" +
  (currentdate.getMonth() < 10 ? "0" : "") +
  (currentdate.getMonth() + 1) +
  "" +
  currentdate.getFullYear();

const datetime =
  currentdate.getHours() +
  "" +
  (currentdate.getMinutes() < 10 ? "0" : "") +
  currentdate.getMinutes() +
  "" +
  (currentdate.getSeconds() < 10 ? "0" : "") +
  currentdate.getSeconds();

export const init = () => {
  var config = {
    apiKey: "AIzaSyAyCf4RHuJyDV6JFqYj3XilQwPuWa8BtQg",
    authDomain: "getdatafromexcel.firebaseapp.com",
    databaseURL: "https://getdatafromexcel.firebaseio.com",
    projectId: "getdatafromexcel",
    storageBucket: "getdatafromexcel.appspot.com",
    messagingSenderId: "239716020528"

    // apiKey: "AIzaSyDJyB9NpZrGTKNfoFFR4RHROamPwPCQN3U",
    // authDomain: "uat-pks.firebaseapp.com",
    // databaseURL: "https://uat-pks.firebaseio.com",
    // projectId: "uat-pks",
    // storageBucket: "uat-pks.appspot.com",
    // messagingSenderId: "925105436158"
  };
  firebase.initializeApp(config);
  database = firebase.database();
};

//add order
export const addOrderToDB = data => {
  return database.ref("/orders/" + date).set({ time: datetime, data });
};

export const loadOrderFromDB = () => {
  return firebase
    .database()
    .ref("/orders/" + date)
    .once("value")
    .then(function(snapshot) {
      return snapshot.val() || [];
    });
};

//add data origin
export const addDataOrigin = dataOrigin => {
  const fileName = dataOrigin.fileName.split(".").join("-");
  const data = dataOrigin.data;
  return database.ref("/ordersOriginal/" + date + datetime + "-" + fileName).set(data);
};
