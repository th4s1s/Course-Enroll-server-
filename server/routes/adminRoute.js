require('dotenv').config();
const express = require('express');
const router = express.Router();

// controller
const adminCtl = require('../controller/adminController');

router.post('/login', adminCtl.adminLogin);
router.post('/end', adminCtl.endRegisterClass);
router.get('/instructor', adminCtl.getInstructorList);
router.post('/instructor/add', adminCtl.addInstructor);
router.post('/instructor/remove', adminCtl.removeInstructor);
router.post('/instructor/update', adminCtl.updateInstructorInfo);
router.post('/instructor/degree', adminCtl.insertInstructorDegree);


module.exports = router;