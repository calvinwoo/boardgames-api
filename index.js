const Koa = require('koa');
const json = require('koa-json');
const routes = require('./src/routes');

const app = new Koa();

app
  .use(json())
  .use(routes)
  .listen(7000);
