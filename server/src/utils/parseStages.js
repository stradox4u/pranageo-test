const { execShellCommand } = require("./exec");
const { promisify } = require("util");
const { readFile } = require("fs");

const readFilePromisified = promisify(readFile);
  
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
  const result = await execShellCommand(`ls ${path}`);

  const fileNamesArray = result.split('\n').filter(name => name && name.includes('.json'));
  
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