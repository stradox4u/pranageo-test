const { promisify } = require("util");
const path = require("path");
const { readFile, readdir } = require("fs");

const readFilePromisified = promisify(readFile);
const readdirPromisified = promisify(readdir);
const username = process.env.USERNAME;
  
exports.parse = async (stageNames, projectPath) => {
  const stageNamesObject = {};
  stageNames.forEach(name => {
    stageNamesObject[name] = `${projectPath}/${name}`;
  })
  return await handleStages(stageNamesObject);
}
  
const handleStages = async (stageNamePaths) => {
  const promisesArray = [];
  let stageContent = {}
  for (let i = 0; i < Object.keys(stageNamePaths).length; i++) {
    const result = await getFileNames(stageNamePaths[Object.keys(stageNamePaths)[i]]);
    promisesArray.push(result);
    stageContent[Object.keys(stageNamePaths)[i]] = {};
    stageContent[Object.keys(stageNamePaths)[i]]['content'] = result;
  }
  await Promise.all(promisesArray);
  return Promise.resolve(stageContent)
}
const getFileNames = async (path) => {
  const result = await readdirPromisified(path);

  const fileNamesArray = result.filter(name => name && name.includes('.json'));
  
  return await readFiles(fileNamesArray, path);

}

const readFiles = async (fileNames, path) => {
  const content = {};
  const promisesArray = [];
  for (let i = 0; i < fileNames.length; i++) {
    const result = await readFilePromisified(`${path}/${fileNames[i]}`, 'utf8');
    promisesArray.push(result);
    content[fileNames[i]] = result;
  }
  await Promise.all(promisesArray);
  return content;
}

exports.readChangedFiles = async (fileNames, projectName) => {
  const userPath = path.join(__dirname, '../', '../', '../', username);
  const projectPath = `${userPath}/${projectName}`;

  const result = await readFiles(fileNames, projectPath);
  return result;
}