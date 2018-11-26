const FirebaseServer = require("firebase-server");
const firebase = require("firebase");

function initDatabaseServer(databasePort) {
  return new Promise((resolved, reject) => {
    try {
      new FirebaseServer(databasePort, "localhost");
    } catch (err) {
      reject(err);
    }
    resolved("database started on port " + databasePort);
  });
}

function connectDatabase(databasePort) {
  return new Promise((resolved, reject) => {
    try {
      firebase.initializeApp({
        databaseURL: `ws://localhost:5556`
      });
    } catch (err) {
      reject(err);
    }
    resolved("conencted to firebase");
  });
}

module.exports = { initDatabaseServer, connectDatabase };
