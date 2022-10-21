const { execShellCommand } = require("../utils/exec");
const username = process.env.USERNAME;
const projectname = process.env.PROJECTNAME;

const addAll = async () => {
  const result = await execShellCommand(`cd ../${username}/${projectname} && git add .`);
  console.log(result);
  return result;
}

const addRemote = async (remoteOrigin) => {
  const result = await execShellCommand(`cd ../${username}/${projectname} && git remote add origin ${remoteOrigin}`);
  console.log(result);
  return result;
}
exports.commit = async (message) => {
  await addAll();
  const result = await execShellCommand(`cd ../${username}/${projectname} && git commit -m "${message}"`);
  console.log(result);
  return result;
}

exports.push = async ({remoteAddress = null, branch = 'main'}) => {
  if (remoteAddress) {
    await addRemote(remoteAddress);
  }
  const result = await execShellCommand(`cd ../${username}/${projectname} && git push ${branch ? '-u origin ' + branch : ''}`);
  console.log(result);
  return result;
}

exports.pull = async (branchName) => {
  const result = await execShellCommand(`cd ../${username}/${projectname} && git pull ${branchName ? branchName : ''}`);
  console.log(result);
  return result;
}

exports.log = async () => {
  const result = await execShellCommand(`cd ../${username}/${projectname} && git log --format=oneline`);
  console.log(result);
  return result;
}

exports.checkout = async (commit) => {
  const result = await execShellCommand(`cd ../${username}/${projectname} && git checkout ${commit}`);
  console.log(result);
  return result;
}