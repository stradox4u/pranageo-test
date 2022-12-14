const parseLogs = require("../utils/parseLog");
const { readChangedFiles } = require("../utils/parseStages");
const gitFunctions = require("./gitFunctions");

exports.gitPull = async (req, res, next) => {
  const { branch, projectName } = req.body;
  try {
    const result = await gitFunctions.pull(branch ? branch : null);
    const files = result.split('\n').filter(el => el.includes('.json'));
    const fileNames = files.map(el => el.split('|')[0].trim());
    const updatedFiles = await readChangedFiles(fileNames, projectName);

    res.status(200).json({
      message: 'Pull successful',
      updatedFiles,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.gitCommit = async (req, res, next) => {
  const { commitMessage } = req.body;
  if (!commitMessage) {
    const error = new Error('Enter commit message please');
    error.statusCode = 400;
    throw error;
  }
  try {
    await gitFunctions.commit(commitMessage);
    res.status(200).json({
      message: 'Commit successful',
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
}

exports.gitPush = async (req, res, next) => {
  const { remoteAddress, branch } = req.body;
  try {
    await gitFunctions.push({ remoteAddress: remoteAddress ? remoteAddress : null, branch: branch ? branch : null });
    res.status(200).json({
      message: 'Push successful',
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
}

exports.getGitLog = async (req, res, next) => {
  try {
    const result = await gitFunctions.log();
    const filtered = result.split('\n').filter(el => {
      return el && el.length;
    });
    const formattedLogs = parseLogs.formatLogs(filtered);
    return res.status(200).json({
      message: 'Success',
      logs: formattedLogs,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
}

exports.postGitCheckout = async (req, res, next) => {
  const { commitHash } = req.body;
  if (!commitHash) {
    const error = new Error('Please supply commit hash');
    error.statusCode = 400;
    throw error;
  }
  try {
    const result = await gitFunctions.checkout(commitHash);
    if (result) {
      return res.status(200).json({
        message: 'Success',
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
}