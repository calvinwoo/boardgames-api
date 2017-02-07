const Router = require('koa-router')
const boardgames = require('../boardgames')

const router = new Router()

router
  .get('/recommend/base-game/:baseGameId', async ctx => {
    const count = ctx.query.count || 1

    const baseGame = boardgames.find(boardgame => boardgame['@objectid'] === ctx.params.baseGameId) || {}

    ctx.body = boardgames
      .filter(boardgame => boardgame['@objectid'] !== baseGame['@objectid'])
      .filter(boardgame => boardgame.minplayers === baseGame.minplayers)
      .filter(boardgame => boardgame.maxplayers === baseGame.maxplayers)
      .sort((game1, game2) => game1.statistics.ratings.ranks['@id'] - game2.statistics.ratings.ranks['@id'])
      .slice(0, count)
  })

module.exports = router.routes()
