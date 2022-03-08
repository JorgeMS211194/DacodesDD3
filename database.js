const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port:5432,
    password: "Montiel0721",
    database: "WORDLE"
})

module.exports = client