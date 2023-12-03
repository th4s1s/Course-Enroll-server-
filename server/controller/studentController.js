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
        await pool.query("SELECT login($1, $2, 'student')", [username, password], (error, results) => {
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

module.exports = {login, enrollClass, unenrollClass}