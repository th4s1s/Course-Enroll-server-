const pool = require('../db').pool

async function getAllStudents(req, res) {
    try {
        await pool.query('SELECT * FROM student', (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error,
                })
            }
            return res.status(200).json(results.rows)
        })
    } catch(err) {
        return res.status(500).json({
            msg: err,
        })
    }
}

module.exports = {getAllStudents}