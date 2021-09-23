const Router = require('@koa/router')

const { helloWorld } = require('./helloWorld.controller')

const router = new Router()

router.get('/api', helloWorld)

module.exports = router.routes()
