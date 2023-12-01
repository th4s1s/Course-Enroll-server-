require('dotenv').config();
const express = require('express');
const router = express.Router();
const pool = require('../db').pool

// controllers
const testCtl = require('../controller/testController')

router.get('/', testCtl.getAllStudents)

router.get('/error', async (req, res) => {
    try {
        await pool.query("INSERT INTO class VALUES ('C02', 'CO2013', '222', 'khuong.nguyen', 0, 30, 2, '08:00', '10:00');", (error, results) => {
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