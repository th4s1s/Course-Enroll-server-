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

async function gradeStudent(req, res) {
    if(!req.body.list || !req.body.class || !req.body.semester || !req.body.course || !Array.isArray(req.body.list)) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        classID = req.body.class
        SemID = req.body.semester
        CourseID = req.body.course
        for (let entry of req.body.list) {
            if(!entry.susername || !entry.bt || !entry.btl || !entry.gk || !entry.ck) {
                return res.status(400).json({
                    msg: 'Bad request'
                })
            }
            student = entry.susername
            BT = entry.bt
            BTL = entry.btl
            GK = entry.gk
            CK = entry.ck
            await pool.query('CALL give_grade($1, $2, $3, $4, $5, $6, $7, $8)', [classID, CourseID, SemID, student, BT, BTL, GK, CK], (error, results) => {
                if (error) {
                    return res.status(500).json({
                        msg: error.message,
                    })
                }
            })
        }
        return res.status(200).json({
            msg: 'Đã cập nhật điểm cho sinh viên',
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function removeStudent(req, res) {
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
                msg: 'Xóa sinh viên khỏi lớp thành công',
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

module.exports = {login, teachClass, unteachClass, gradeStudent, removeStudent}