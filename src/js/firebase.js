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
    apiKey: "AIzaSyDsSw4LqDBRn-lGIGeHnt3PjkCSQBYOOOE",
    authDomain: "hkcase-b8d38.firebaseapp.com",
    databaseURL: "https://hkcase-b8d38.firebaseio.com",
    projectId: "hkcase-b8d38",
    storageBucket: "hkcase-b8d38.appspot.com",
    messagingSenderId: "475890824722",
    appId: "1: 475890824722: web: 761931254c715043"
    
    // apiKey: "AIzaSyAyCf4RHuJyDV6JFqYj3XilQwPuWa8BtQg",
    // authDomain: "getdatafromexcel.firebaseapp.com",
    // databaseURL: "https://getdatafromexcel.firebaseio.com",
    // projectId: "getdatafromexcel",
    // storageBucket: "getdatafromexcel.appspot.com",
    // messagingSenderId: "239716020528"

    // apiKey: "AIzaSyDJyB9NpZrGTKNfoFFR4RHROamPwPCQN3U",
    // authDomain: "uat-pks.firebaseapp.com",
    // databaseURL: "https://uat-pks.firebaseio.com",
    // projectId: "uat-pks",
    // storageBucket: "uat-pks.appspot.com",
    // messagingSenderId: "925105436158"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }
  database = firebase.database();
};

//add order
export const addOrderToDB = data => {
  return database.ref("/orders/").set({ time: date, data });
};

export const loadOrderFromDB = () => {
  return firebase
    .database()
    .ref("/orders/")
    .once("value")
    .then(function(snapshot) {
      return snapshot.val() || [];
    });
};

//add data origin
export const addDataOrigin = dataOrigin => {
  // const fileName = dataOrigin.fileName.split(".").join("-");
  const data = dataOrigin;
  return database.ref("/ordersOriginal/" + date).set(data);
};


export const loadOrderOriginal = () => {
  return firebase
    .database()
    .ref("/ordersOriginal/")
    .once("value")
    .then(function(snapshot) {
      return snapshot.val() || [];
    });
};

