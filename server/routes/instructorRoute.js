require('dotenv').config();
const express = require('express');
const router = express.Router();

// controller
const instructorCtl = require('../controller/instructorController');

router.post('/login', instructorCtl.login);
router.post('/teach', instructorCtl.teachClass);
router.post('/unteach', instructorCtl.unteachClass);
router.post('/grade', instructorCtl.gradeStudent);
router.post('/remove', instructorCtl.removeStudent);

module.exports = router;