const { pull, commit, push } = require("./gitFunctions");

exports.gitPull = async (req, res, next) => {
  const { branch } = req.body;
  try {
    await pull(branch ? branch : null);
    res.status(200).json({
      message: 'Pull successful',
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
    await commit(commitMessage);
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
    await push({ remoteAddress: remoteAddress ? remoteAddress : null, branch: branch ? branch : null });
    res.status(200).json({
      message: 'Push successful',
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
}