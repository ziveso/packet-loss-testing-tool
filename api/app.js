const express = require("express");
const app = express();

const { initDatabaseServer, connectDatabase } = require("./db");
const databasePort = process.env.databasePort || "5556";

app.get("/", async (req, res) => {
  res.send("welcome to packet-loss-testing-tools api");
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
