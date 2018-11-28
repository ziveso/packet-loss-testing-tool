const express = require("express");
const app = express();
const { getIP, pingIP, routerIP, myIP } = require("./function/shell.js");
const moment = require("moment");
const { list, set } = require("./db/fundamental.js");

const { initDatabaseServer, connectDatabase } = require("./db");
const databasePort = process.env.databasePort || "5556";

app.get("/", async (req, res) => {
  res.send("welcome to packet-loss-testing-tools api");
});

app.get("/list", async (req, res) => {
  new Promise((resolved, reject) => {
    resolved(list());
  }).then(data => res.send(JSON.stringify(data)));
});

app.get("/routerIP", async (req, res) => {
  const ip = routerIP(req.query.os)
    .then(data => {
      res.send(data);
    })
    .catch(err => console.error(err));
});

app.get("/pingIP/:ip", async (req, res) => {
  const ping = pingIP(req.params.ip, parseInt(req.query.time))
    .then(data => {
      console.log(data);
      set(moment().format("YYYY-MM-DD-HH:mm:ss"), data);
      res.send(data);
    })
    .catch(err => console.error(err));
});

app.get("/getIP/:url", async (req, res) => {
  const ip = getIP(req.params.url)
    .then(data => {
      res.send(data);
    })
    .catch(err => console.error(err));
});

app.get("/myIP", async (req, res) => {
  const myIp = myIP()
    .then(data => {
      res.send(data);
    })
    .catch(err => console.error(err));
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
