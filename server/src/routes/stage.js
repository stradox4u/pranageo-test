const { Router } = require("express");
const { getStages, updateCell } = require("../controllers/stage");

const router = Router();

router.get('/stages', getStages);

router.patch('/cell', updateCell);

module.exports = router;