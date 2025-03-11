const express = require("express");
const router = express.Router();
const medController = require('../controllers/medications')
// const upload = require("../middleware/multer");
const { ensureAuth} = require("../middleware/auth");

router.get('/', medController.getAllMed)
router.get('/:userId', medController.getMed)
router.get('/searchAll/:name', medController.searchAllMed)
router.get('/search/:medName', medController.searchMed)
router.post('/create', medController.createMed)
router.put('/update/:id', medController.updateMed)
router.put('/approve/:id', medController.approveMed)


module.exports = router;


