const Router = require('koa-router')
const boardgames = require('../boardgames')

const router = new Router()

router
  .get('/recommend/base-game/:baseGameId', async ctx => {
    const count = ctx.query.count || 1

    const baseGame = boardgames.find(boardgame => boardgame.id === ctx.params.baseGameId) || {}

    ctx.body = boardgames
      .filter(boardgame => boardgame.id !== baseGame.id)
      .filter(boardgame => boardgame.category === baseGame.category)
      .sort((game1, game2) => game1.rating - game2.rating)
      .slice(0, count)
  })

module.exports = router.routes()
