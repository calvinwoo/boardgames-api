const db = require('../db')

module.exports = router => {
  router.get('/articles/:articleId', async ctx => {
    ctx.body = await db.one(`select * from articles where id=${ctx.params.articleId}`)
  })
}
