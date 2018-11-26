const express = require("express");
const exec = require("child_process").exec;

const app = express();

app.get("/", (req, res) => {
  const testscript = exec("ping  -c 10 localhost");
  testscript.stdout.on("data", function(data) {
    console.log(data);
    // sendBackInfo();
  });
  res.send("helloworld");
});

app.listen("5555", () => {
  console.log("sever started at 5555");
});
