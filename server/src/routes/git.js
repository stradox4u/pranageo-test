const { Router } = require("express");
const { gitPull, gitCommit, gitPush, getGitLog } = require("../controllers/git");

const router = Router();

router.post('/gitPull', gitPull);

router.post('/gitCommit', gitCommit);

router.post('/gitPush', gitPush);

router.get('/gitLog', getGitLog);

module.exports = router;