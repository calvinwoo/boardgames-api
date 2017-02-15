const Koa = require('koa')
const json = require('koa-json')
const cors = require('koa-cors')
const routes = require('./src/routes')

const app = new Koa()

app.use(cors({credentials: true}))

app
  .use(json())
  .use(routes)
  .listen(process.env.PORT || 3000)
