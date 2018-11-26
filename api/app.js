const express = require("express");
const app = express();
const { getIP } = require("./function/shell.js");

const { initDatabaseServer, connectDatabase } = require("./db");
const databasePort = process.env.databasePort || "5556";

app.get("/", async (req, res) => {
  res.send("welcome to packet-loss-testing-tools api");
});

app.get("/ip", async (req, res) => {
  const ip = getIP().then((data) => {
    console.log(data)
    res.send(data)
  })
})

initDatabase(databasePort).then(res => {
  console.log(res);
});
initDatabaseServer(databasePort)
  .then(res => {
    console.log(res);
    connectDatabase(databasePort)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  })
  .catch(err => {
    console.error(err);
  });

app.listen("5555", () => {
  console.log("sever started at 5555");
});

module.exports = { app, databasePort };
