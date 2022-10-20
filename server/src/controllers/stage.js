const path = require("path");
const { execShellCommand } = require("../utils/exec");
const { parse } = require("../utils/parseStages");
const username = process.env.USERNAME;

exports.getStages = async (req, res, next) => {
  const userPath = path.join(__dirname, '../', '../', '../', username);
  const projectsLevel = await execShellCommand(`ls ${userPath}`);
  const projectName = projectsLevel.split('\n')[0];
  const stagesLevel = await execShellCommand(`ls ${userPath}/${projectName}`);
  const stageNames = stagesLevel.split('\n').filter(el => {
    return el && !el.includes('.');
  })

  try {
    const reconstitutedStages = await parse(stageNames, `${userPath}/${projectName}`);
    return res.status(200).json({ projectName, stages: reconstitutedStages });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
}