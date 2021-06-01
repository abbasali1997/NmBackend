const router = require('express').Router();
const {
    createReport,
    updateReport,
    deleteReport,
    getAll,
    getOne,
} = require('../controllers/report.controller');
const {
    reportsQb,
} = require('../mongo-query-builders/report.query-builder');
const multer = require('multer');
const upload = multer();

router.get('/', [reportsQb], getAll);
router.get('/:id', [], getOne);
router.post('/', upload.single('file'), createReport);
router.put('/', [], updateReport);
router.delete('/:id', [], deleteReport);

module.exports = router;