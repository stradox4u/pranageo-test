const { execShellCommand } = require("../utils/exec");

const addAll = async () => {
  const result = await execShellCommand(`cd ../umar/Classification && git add .`);
  console.log(result);
  return result;
}

const addRemote = async (remoteOrigin) => {
  const result = await execShellCommand(`cd ../umar/Classification && git remote add origin ${remoteOrigin}`);
  console.log(result);
  return result;
}
exports.commit = async (message) => {
  await addAll();
  const result = await execShellCommand(`cd ../umar/Classification && git commit -m "${message}"`);
  console.log(result);
  return result;
}

exports.push = async ({remoteAddress = null, branch = 'main'}) => {
  if (remoteAddress) {
    await addRemote(remoteAddress);
  }
  const result = await execShellCommand(`cd ../umar/Classification && git push ${branch ? '-u origin ' + branch : ''}`);
  console.log(result);
  return result;
}

exports.pull = async (branchName) => {
  const result = await execShellCommand(`cd ../umar/Classification && git pull ${branchName ? branchName : ''}`);
  console.log(result);
  return result;
}