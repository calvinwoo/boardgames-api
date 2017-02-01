const Koa = require('koa')
const json = require('koa-json')
const routes = require('./src/routes')

const app = new Koa()

app
  .use(json())
  .use(routes)
  .listen(process.env.PORT || 3000)
