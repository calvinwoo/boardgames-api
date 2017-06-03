const moment = require('moment')
const db = require('../db')

module.exports = router => {
  router.get('/articles/:articleId', async ctx => {
    try {
      const article = await db.oneOrNone(`SELECT * FROM articles WHERE id=${ctx.params.articleId}`)

      if (!article) {
        ctx.status = 404
      } else {
        ctx.body = article
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = error
    }
  })

  router.post('/articles', async ctx => {
    const requestBody = ctx.request.body

    if (!requestBody.postedTimestamp) {
      ctx.response.status = 400
      ctx.response.body = 'Posted date not supplied.'
    } else if (!moment(requestBody.postedTimestamp).isValid()) {
      ctx.response.status = 400
      ctx.response.body = 'Posted date not in a valid momentJS format.'
    } else if (!requestBody.content) {
      ctx.response.status = 400
      ctx.response.body = 'Article content not supplied.'
    } else {
      const postedTimestamp = moment(requestBody.postedTimestamp).format('YYYY-MM-DD HH:MM:ssZ')
      try {
        await db.none(`INSERT INTO articles (posted, content) VALUES ('${postedTimestamp}', '${requestBody.content}')`)
        ctx.status = 200
      } catch (error) {
        ctx.status = 500
        ctx.body = error
      }
    }
  })
}
