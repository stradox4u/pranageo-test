const { exec } = require("child_process");

exports.execShellCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        throw err;
      }

      resolve(stdout ? stdout : stderr);
    })
  })
}