const FirebaseServer = require("firebase-server");

function initDatabase(databasePort) {
  return new Promise((resolved, reject) => {
    try {
      new FirebaseServer(databasePort, "localhost");
    } catch (err) {
      reject(err);
    }
    resolved("database started on port " + databasePort);
  });
}

module.exports = initDatabase;
