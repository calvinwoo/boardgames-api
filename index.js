const Koa = require('koa')
const json = require('koa-json')
const cors = require('koa-cors')
const pg = require('pg')
const routes = require('./src/routes')

pg.defaults.ssl = !!process.env.DATABASE_URL
pg.connect(process.env.DATABASE_URL || 'postgres://localhost:5432/bigboardofgames', (err, client) => {
  if (err) {
    throw err
  }

  console.log('Connected to postgres! Getting schemas...')

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', (row) => {
      console.log(JSON.stringify(row))
    })
})

const app = new Koa()
const options = {
//  origin: '*',
  credentials: true
}

app.use(cors(options))

app
  .use(json())
  .use(routes)
  .listen(process.env.PORT || 3000)
