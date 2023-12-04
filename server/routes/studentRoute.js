require('dotenv').config();
const express = require('express');
const router = express.Router();

// controller
const studentCtl = require('../controller/studentController');

router.post('/login', studentCtl.login);
router.post('/enroll', studentCtl.enrollClass);
router.post('/unenroll', studentCtl.unenrollClass);
router.post('/schedule', studentCtl.getSchedule);
router.post('/scoreboard', studentCtl.getScoreboard);

module.exports = router;