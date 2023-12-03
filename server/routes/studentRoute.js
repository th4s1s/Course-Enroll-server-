require('dotenv').config();
const express = require('express');
const router = express.Router();

// controller
const studentCtl = require('../controller/studentController');

router.post('/login', studentCtl.login);

module.exports = router;