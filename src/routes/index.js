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

router
  .get('/id/:gameId', async ctx => {
    ctx.body = boardgames
      .find(boardgame => boardgame['@objectid'] === ctx.params.gameId)
  })

router
  .get('/game/:gameName', async ctx => {
    const sanitize = /[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g
    const gameName = ctx.params.gameName
    ctx.body = boardgames
      .find(boardgame => boardgame.name.toLowerCase().replace(sanitize, '') === gameName.toLowerCase().replace(sanitize, ''))
      || boardgames
        .find(boardgame => boardgame.name.toLowerCase().replace(sanitize, '').includes(gameName.toLowerCase().replace(sanitize, '')))
  })

module.exports = router.routes()
