require('dotenv').config();
const express = require('express');
const router = express.Router();

// controller
const classCtl = require('../controller/classController');

router.get('/:semester', classCtl.getAllClasses);
router.post('/list', classCtl.getStudentFromClass);

module.exports = router;