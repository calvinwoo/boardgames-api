const Koa = require('koa')
const json = require('koa-json')
const cors = require('koa-cors')
const routes = require('./src/routes')

const app = new Koa()
const options = {
//  origin: '*',
  credentials: true
}

app.use(cors(options));

app
  .use(json())
  .use(routes)
  .listen(process.env.PORT || 3000)
