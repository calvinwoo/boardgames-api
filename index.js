const Koa = require('koa')
const json = require('koa-json')
var bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const routes = require('./src/routes')

const port = process.env.PORT || 3000

const app = new Koa()

app.use(cors({credentials: true}))

app
  .use(json())
  .use(bodyParser())
  .use(routes)
  .listen(port)

console.log(`Server listening at port ${3000}`)
