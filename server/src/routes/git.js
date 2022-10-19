const { Router } = require("express");
const { gitPull, gitCommit, gitPush } = require("../controllers/git");

const router = Router();

router.post('/gitPull', gitPull);

router.post('/gitCommit', gitCommit);

router.post('/gitPush', gitPush);

module.exports = router;