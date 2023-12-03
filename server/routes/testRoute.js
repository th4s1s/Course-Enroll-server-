require('dotenv').config();
const express = require('express');
const router = express.Router();
const pool = require('../db').pool

// controllers
const testCtl = require('../controller/testController')

router.get('/', testCtl.getAllStudents)

router.get('/error', async (req, res) => {
    try {
        await pool.query("select * from get_student_schedule('anh.le')", (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json(results.rows)
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
})

module.exports = router;

//INSERT INTO prerequisite VALUES ('CO3093', 'CO2013')