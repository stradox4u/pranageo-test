const path = require("path");
const { readdir } = require("fs");
const { promisify } = require("util");
const { parse } = require("../utils/parseStages");

const readdirPromisified = promisify(readdir);
const username = process.env.USERNAME;

exports.getStages = async (req, res, next) => {
  const userPath = path.join(__dirname, '../', '../', '../', username);
  const projectsLevel = await readdirPromisified(userPath);
  const projectName = projectsLevel[0];
  const stagesLevel = await readdirPromisified(`${userPath}/${projectName}`);
  const stageNames = stagesLevel.filter(el => {
    return el && !el.includes('.');
  });

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