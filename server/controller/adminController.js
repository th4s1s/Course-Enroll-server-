const admin = require('../db/admin')

let pool = null

async function adminLogin(req, res) {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        username = req.body.username
        password = req.body.password
        pool = await admin.adminConnect(username, password)
        if(pool == null) {
            return res.status(400).json({
                msg: 'Sai tên đăng nhập hoặc mật khẩu',
            })
        }
        else return res.status(200).json({
            msg: 'Đăng nhập thành công',
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

module.exports = {adminLogin, endRegisterClass}