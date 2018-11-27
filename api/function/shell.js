const exec = require("child_process").exec;

function echo() {
  return new Promise((resolve, reject) => {
    exec('echo "helloworld"', (error, stdout, stderr) => {
      if (error) return reject(false);
      if (stderr) return reject(false);
      resolve(stdout);
    });
  });
}

function routerIP() {
  return new Promise((resolve, reject) => {
    exec('netstat -nr | grep default', (error, stdout, stderr) => {
      if(error) return reject(error)
      if(stderr) return reject(stderr)
      const ip = stdout.split(" ")
      for(var i = 0; i < ip.length; i++) {
        if(ValidateIPaddress(ip[i])) {
          resolve(ip[i])
        }
      }
      reject(false)
    })
  })
}

function pingIP(ipaddress, numberOfTimes) {
  return new Promise((resolve, reject) => {
    exec(`ping -c ${numberOfTimes} ${ipaddress}`, (error, stdout, stderr) => {
      if (error) return reject(false);
      if (stderr) return reject(false);
      const output = stdout.split("\n")
      const stat = output[numberOfTimes + 3].split(" ")
      resolve(stat[6]);
    });
  });
}

function getIP(url) {
  return new Promise((resolve, reject) => {
    exec(`nslookup ${url}`, (error, stdout, stderr) => {
      if (error) return reject(false);
      if (stderr) return reject(false);
      const output = stdout.split(" ")
      const ip = output[output.length - 1]
      resolve(ip);
    });
  });
}

function ValidateIPaddress(ipaddress) {  
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
    return (true)  
  }  
  return (false)  
}  

const cmd = "ping -c 10 localhost";

module.exports = {getIP, pingIP, routerIP}
