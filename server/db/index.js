const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '34.85.62.251',
  database: 'BTL',
  password: '=gHQe[F4_K7l%mSc',
  port: 5432,
})

module.exports = {pool}
