const pool = require('../db').pool

async function getAllClasses(req, res) {
    try {
        SemID = req.params.semester
        await pool.query('SELECT * FROM class WHERE SemID = $1 ORDER BY CourseID, ClassID', [SemID], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                class: results.rows
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function enrollClass(req, res) {
    if(!req.body.susername || !req.body.class || !req.body.semester || !req.body.course) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        student = req.body.susername
        classID = req.body.class
        SemID = req.body.semester
        CourseID = req.body.course
        await pool.query('CALL enroll($1, $2, $3, $4)', [classID, CourseID, SemID, student], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Đăng ký thành công',
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function unenrollClass(req, res) {
    if(!req.body.susername || !req.body.class || !req.body.semester || !req.body.course) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        student = req.body.susername
        classID = req.body.class
        SemID = req.body.semester
        CourseID = req.body.course
        await pool.query('CALL unenroll($1, $2, $3, $4)', [classID, CourseID, SemID, student], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Hủy đăng ký thành công',
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function endRegisterClass(req, res) {
    if(!req.body.semester) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        SemID = req.body.semester
        console.log(SemID)
        await pool.query('CALL register_end($1)', [SemID], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Đã kết thúc thời hạn đăng ký môn học',
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

module.exports = {getAllClasses , enrollClass, unenrollClass, endRegisterClass}