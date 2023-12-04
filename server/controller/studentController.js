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
            if(results.rows[0] == undefined) {
                return res.status(400).json({
                    msg: 'Sai tên đăng nhập hoặc mật khẩu',
                })
            }
            else return res.status(200).json({
                msg: 'Đăng nhập thành công',
                info: results.rows[0]
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

async function getSchedule(req, res) {
    if(!req.body.susername || !req.body.semester) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        student = req.body.susername
        SemID = req.body.semester
        await pool.query('SELECT * FROM get_student_schedule($1, $2)', [student, SemID], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Lấy thời khóa biểu thành công',
                schedule: results.rows
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function getScoreboard(req, res) {
    if(!req.body.susername || !req.body.semester) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        student = req.body.susername
        SemID = req.body.semester
        gpa = await pool.query('SELECT * FROM calculate_semester_gpa($1, $2)', [student, SemID])
        money = await pool.query('SELECT * FROM calculate_scholarship($1, $2, 25000000)', [student, SemID])
        await pool.query('SELECT * FROM show_student_scoreboard($1, $2)', [student, SemID], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Lấy bảng điểm thành công',
                scoreboard: results.rows,
                gpa: gpa.rows[0],
                scholarship: money.rows[0]
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function calScholarship(req, res) {
    if(!req.body.susername || !req.body.semester) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        scholarship = req.body.money
        student = req.body.susername
        SemID = req.body.semester
        await pool.query('SELECT * FROM calculate_scholarship($1, $2, $3)', [student, SemID, scholarship], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Lấy học bổng thành công',
                scholarship: results.rows[0].calculate_scholarship
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

module.exports = {login, enrollClass, unenrollClass, getSchedule, getScoreboard, calScholarship}