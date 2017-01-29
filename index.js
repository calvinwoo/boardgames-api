const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date();
  const ms = new Date() - start;
  await next();
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(ctx => {
  ctx.body = 'Hello Koa@2';
});

app.listen(7000);
