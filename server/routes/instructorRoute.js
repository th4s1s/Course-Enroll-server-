require('dotenv').config();
const express = require('express');
const router = express.Router();

// controller
const instructorCtl = require('../controller/instructorController');

router.post('/teach', instructorCtl.teachClass);
router.post('/unteach', instructorCtl.unteachClass);
router.post('/login', instructorCtl.login);

module.exports = router;