const Pool = require('pg').Pool

async function adminConnect(username, password) {
    const pool = new Pool({
        user: username,
        password: password,
        host: '34.85.62.251',
        port: 5432,
        database: 'BTL'
    });

    try {
        const client = await pool.connect();
        console.log(username, password);
        console.log('sManager connected to the database');
        return client;
    } catch (error) {
        console.error('Error connecting to the database', error);
        return null;
    }
}

module.exports = {adminConnect}
