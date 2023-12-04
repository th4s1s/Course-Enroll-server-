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

async function getInstructorList(req, res) {
    if(!pool) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        await pool.query('SELECT * FROM get_instructor_info()', (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Lấy danh sách giảng viên thành công',
                list: results.rows
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function updateInstructorInfo(req, res) {
    if(!req.body.insusername || !req.body.name || !req.body.id || !req.body.address || !req.body.bdate || !req.body.rank || !req.body.phone || !req.body.dname) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        instructor = req.body.insusername
        iname = req.body.name
        id = req.body.id
        address = req.body.address
        bdate = req.body.bdate
        rank = req.body.rank
        phone = req.body.phone
        dname = req.body.dname
        await pool.query('CALL update_instructor_info($1, $2, $3, $4, $5, $6, $7, $8)', [instructor, iname, id, address, bdate, rank, phone, dname], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Cập nhật thông tin giảng viên thành công',
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function addInstructor(req, res) {
    if(!req.body.insusername || !req.body.password || !req.body.name || !req.body.id || !req.body.address || !req.body.bdate || !req.body.rank || !req.body.phone || !req.body.dname) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        instructor = req.body.insusername
        password = req.body.password
        iname = req.body.name
        id = req.body.id
        address = req.body.address
        bdate = req.body.bdate
        rank = req.body.rank
        phone = req.body.phone
        dname = req.body.dname
        await pool.query('CALL add_instructor($1, $2, $3, $4, $5, $6, $7, $8, $9)', [instructor, password, iname, id, address, bdate, rank, phone, dname], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Thêm giảng viên thành công',
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function removeInstructor(req, res) {
    if(!req.body.insusername) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        instructor = req.body.insusername
        await pool.query('CALL delete_instructor($1)', [instructor], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Xóa giảng viên thành công',
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

async function insertInstructorDegree(req, res) {
    if(!req.body.insusername || !req.body.degree) {
        return res.status(400).json({
            msg: 'Bad request'
        })
    }
    try {
        instructor = req.body.insusername
        degree = req.body.degree
        await pool.query('CALL insert_degree($1, $2)', [degree, instructor], (error, results) => {
            if (error) {
                return res.status(500).json({
                    msg: error.message,
                })
            }
            return res.status(200).json({
                msg: 'Thêm học vị thành công',
            })
        })
    } catch(error) {
        return res.status(500).json({
            msg: error.message,
        })
    }
}

module.exports = {adminLogin, endRegisterClass, getInstructorList, updateInstructorInfo, addInstructor, removeInstructor, insertInstructorDegree}