const router = require("express").Router();
const auth = require("./auth.api");
const report = require('./report.api');

router.use('/auth', auth);
router.use('/report', report);

module.exports = router;