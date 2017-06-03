const pgp = require('pg-promise')()

pgp.pg.defaults.ssl = !!process.env.DATABASE_URL

const db = pgp(process.env.DATABASE_URL || 'postgres://localhost:5432/bigboardofgames')

module.exports = db
