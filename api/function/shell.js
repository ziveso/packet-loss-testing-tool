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

const cmd = "ping -c 10 localhost";
