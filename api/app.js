const express = require("express");
const app = express();
const { getIP, pingIP, routerIP } = require("./function/shell.js");

const { initDatabaseServer, connectDatabase } = require("./db");
const databasePort = process.env.databasePort || "5556";

app.get("/", async (req, res) => {
  res.send("welcome to packet-loss-testing-tools api");
});

app.get("/routerIP", async (req, res) => {
  const ip = routerIP().then((data) => {
    res.send(data)
  }).catch(err => console.error(err))
})

app.get("/pingIP/:ip", async (req, res) => {
  const ping = pingIP(req.params.ip, parseInt(req.query.time)).then((data) => {
    res.send(data)
  }).catch(err => console.error(err))
})

app.get("/getIP/:url", async (req, res) => {
  const ip = getIP(req.params.url).then((data) => {
    res.send(data)
  }).catch(err => console.error(err))
})

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
