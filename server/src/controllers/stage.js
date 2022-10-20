const path = require("path");
const { readdir, writeFile } = require("fs");
const { promisify } = require("util");
const { parse } = require("../utils/parseStages");
const { commit, push } = require("./gitFunctions");

const readdirPromisified = promisify(readdir);
const writeFilePromisified = promisify(writeFile);
const username = process.env.USERNAME;
const userPath = path.join(__dirname, '../', '../', '../', username);

exports.getStages = async (req, res, next) => {
  const projectName = await getProjectName();
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

exports.updateCell = async (req, res, next) => {
  const { name, stageName, content } = req.body;
  const projectName = await getProjectName();

  const cellPath = `${userPath}/${projectName}/${stageName}/${name}`;
  try {
    await writeFilePromisified(cellPath, JSON.stringify(content));
    console.log(cellPath);
    await commit(`${name} updated`);
    await push({ remoteAddress: null });
    
    return res.status(200).json({
      message: 'Cell successfully updated'
    })
   
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }

}

const getProjectName = async () => {
  const projectsLevel = await readdirPromisified(userPath);
  const projectName = projectsLevel[0];
  return projectName;
}