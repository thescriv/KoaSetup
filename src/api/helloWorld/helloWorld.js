const Router = require('@koa/router')

const router = new Router()

router.get('/api', async (ctx) => {
    console.log('Hello World')

    ctx.body = 'Hello World'
})

module.exports = router.routes()