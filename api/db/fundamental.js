const firebase = require("firebase");

function list() {
  firebase
    .database()
    .ref("/")
    .once("value", snap => {
      console.log(snap.val());
    });
}

function get(key) {
  firebase
    .database()
    .ref("/" + key)
    .once("value", snap => {
      console.log(snap.val());
    });
}

function set(key, value) {
  firebase
    .database()
    .ref("/")
    .update({ [key]: value });
}

module.exports = { list, get, set };
