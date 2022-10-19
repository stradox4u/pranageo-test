const path = require("path");
const { execShellCommand } = require("../utils/exec");
const username = process.env.USERNAME;

exports.getStages = async (req, res, next) => {
  const userPath = path.join(__dirname, '../', '../', '../', username);
  const projectsLevel = await execShellCommand(`ls ${userPath}`);
  const stagesLevel = await execShellCommand(`ls ${userPath}/${projectsLevel}`);
  const stageNames = stagesLevel.split('\n').filter(el => {
    return el && !el.includes('.');
  })
  console.log(stageNames);
}