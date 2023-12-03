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

module.exports = {login}