const express = require("express");
const app = express();

const initDatabase = require("./db");
const databasePort = process.env.databasePort || "5556";

app.get("/", async (req, res) => {
  res.send("welcome to packet-loss-testing-tools api");
});

initDatabase(databasePort).then(res => {
  console.log(res);
});
app.listen("5555", () => {
  console.log("sever started at 5555");
});

module.exports = { app, databasePort };
