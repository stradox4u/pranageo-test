"use strict"

const { readFile, writeFile } = require("fs");
const path = require("path");
const { promisify } = require("util");
const { execShellCommand } = require("./utils/exec");
const { commit, push } = require("./controllers/gitFunctions");

const basePath = path.join(__dirname, '../', '../', 'umar');
const cmdLineArgs = process.argv;

const readFilePromisified = promisify(readFile);
const writeFilePromisified = promisify(writeFile);
let gitRepoPath = '';

const initGitRepository = async () => {
  // Read from file
  const data = await readFilePromisified(path.resolve("../classification.json"));
  const blob = JSON.parse(data);
  
  // Make username directory
  await execShellCommand(`mkdir -p ${basePath}`);
  
  // Make project name directory
  await execShellCommand(`mkdir -p ${basePath}/${blob.project.title}`);

  // Write Headers
  const headers = {};
  Object.keys(blob.project).forEach(key => {
    if (key !== "stages") {
      headers[key] = blob.project[key];
    }
  });

  await writeFilePromisified(`${basePath}/${blob.project.title}/projectHeader.json`, JSON.stringify(headers));
  
  const promisesArray = [];
  gitRepoPath = `../umar/${blob.project.title}`;
  
  // Make stage name directories
  blob.project.stages.forEach(el => {
    const stagePath = `${basePath}/${blob.project.title}/${el.title}`;
    promisesArray.push(execShellCommand(`mkdir -p ${stagePath}`));
    
    // Make cell directories
    el.cells.forEach((cell, index) => {
      const cellPath = `${stagePath}/${+index + 1}`;
      promisesArray.push(execShellCommand(`mkdir -p ${cellPath}`));

      // Write cell contents to file
      const fileName = `${cellPath}/cell${+index + 1}.json`;
      promisesArray.push(execShellCommand(`touch ${fileName}`));
      promisesArray.push(writeFilePromisified(fileName, JSON.stringify(cell)));
    });
  });
  return Promise.all(promisesArray);
}

const callFunctions = async () => {
  initGitRepository().then(async () => {
    console.log(gitRepoPath);
    await execShellCommand(`cd ${gitRepoPath} && git init`);
    await commit(cmdLineArgs[2]);
    await push({remoteAddress: cmdLineArgs[3]});

  })
}

callFunctions();

