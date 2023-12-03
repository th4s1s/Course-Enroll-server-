require('dotenv').config();
const express = require('express');
const router = express.Router();

// controller
const classCtl = require('../controller/classController');

router.get('/:semester', classCtl.getAllClasses);
router.post('/enroll', classCtl.enrollClass);
router.post('/unenroll', classCtl.unenrollClass);
router.post('/end', classCtl.endRegisterClass);

module.exports = router;