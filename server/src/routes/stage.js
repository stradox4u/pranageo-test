const { Router } = require("express");
const { getStages } = require("../controllers/stage");

const router = Router();

router.get('/stages', getStages);

module.exports = router;