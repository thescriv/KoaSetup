async function handleErrorMiddleware(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500

    ctx.body = {
      message: 'An error occured, sorry !'
    }
  }
}

module.exports = { handleErrorMiddleware }
