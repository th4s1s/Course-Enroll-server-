// library
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan');

// setup
const app = express()
const port = 9696

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('tiny'));

// routes
const testRoute = require('./routes/testRoute')


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.json({
        info: 'Node.js, Express, and Postgres API'
    })
})

app.use('/api/test', testRoute)