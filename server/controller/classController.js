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

async function getStudentFromClass(req, res) {
    if(!req.body.class || !req.body.semester || !req.body.course) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        classID = req.body.class
        SemID = req.body.semester
        CourseID = req.body.course
        await pool.query('SELECT * FROM list_students_in_class($1, $2, $3)', [classID, CourseID, SemID], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Lấy danh sách sinh viên thành công',
                studentList: results.rows,
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function endRegisterClass(req, res) {
    if(!req.body.semester || !pool) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        SemID = req.body.semester
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

module.exports = {getAllClasses, getStudentFromClass, endRegisterClass}