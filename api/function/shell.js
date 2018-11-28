const exec = require("child_process").exec;
const axios = require("axios");

function echo() {
  return new Promise((resolve, reject) => {
    exec('echo "helloworld"', (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(stderr);
      resolve(stdout);
    });
  });
}

function routerIP(os) {
  return new Promise((resolve, reject) => {
    if (os.substring(0, 3) === "Mac") {
      exec("netstat -nr | grep default", (error, stdout, stderr) => {
        if (error) return reject(error);
        if (stderr) return reject(stderr);
        const ip = stdout.split(" ");
        for (var i = 0; i < ip.length; i++) {
          if (ValidateIPaddress(ip[i])) {
            resolve(ip[i]);
          }
        }
        reject(error);
      });
    } else {
      exec("ipconfig", (error, stdout, stderr) => {
        if (error) return reject(error);
        if (stderr) return reject(stderr);
        const output = stdout.split("\n");
        const ip = output[40].trim().split(":");
        resolve(ip[1].trim());
      });
    }
  });
}

function myIP() {
  return new Promise((resolved, reject) => {
    axios
      .get("https://api.ipify.org?format=json")
      .then(({ data }) => {
        resolved(data.ip);
      })
      .catch(err => reject(err));
  });
}

function pingIP(ipaddress, numberOfTimes) {
  return new Promise((resolve, reject) => {
    exec(`ping -c ${numberOfTimes} ${ipaddress}`, (error, stdout, stderr) => {
      // if (error) return reject(error);
      // if (stderr) return reject(stderr);
      const output = stdout.split("\n");
      let stat;
      if (output[output.length - 2].substring(0, 1) === "r") {
        stat = output[output.length - 3].split(" ");
      } else {
        stat = output[output.length - 2].split(" ");
      }
      resolve(stat[6]);
    });
  });
}

function getIP(url) {
  return new Promise((resolve, reject) => {
    exec(`nslookup ${url}`, (error, stdout, stderr) => {
      if (error) return reject("err", error);
      if (stderr) return reject("stderr", stderr);
      const output = stdout.split(" ");
      const ip = output[output.length - 1];
      resolve(ip);
    });
  });
}

function ValidateIPaddress(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  return false;
}

const cmd = "ping -c 10 localhost";

module.exports = { getIP, pingIP, routerIP, myIP };
