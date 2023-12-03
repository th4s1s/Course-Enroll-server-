const pool = require('../db').pool

async function login(req, res) {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        username = req.body.username
        password = req.body.password
        await pool.query("SELECT login($1, $2, 'instructor')", [username, password], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            if(results.rows[0].login == false) {
                return res.status(400).json({
                    msg: 'Sai tên đăng nhập hoặc mật khẩu',
                })
            }
            else return res.status(200).json({
                msg: 'Đăng nhập thành công',
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function teachClass(req, res) {
    if(!req.body.insusername || !req.body.class || !req.body.semester || !req.body.course) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        instructor = req.body.insusername
        classID = req.body.class
        SemID = req.body.semester
        CourseID = req.body.course
        await pool.query('CALL teach($1, $2, $3, $4)', [classID, CourseID, SemID, instructor], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Đăng ký dạy thành công',
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function unteachClass(req, res) {
    if(!req.body.insusername || !req.body.class || !req.body.semester || !req.body.course) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        instructor = req.body.insusername
        classID = req.body.class
        SemID = req.body.semester
        CourseID = req.body.course
        await pool.query('CALL unteach($1, $2, $3, $4)', [classID, CourseID, SemID, instructor], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Hủy dạy thành công',
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

module.exports = {login, teachClass, unteachClass, getStudentFromClass}