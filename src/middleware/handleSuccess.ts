const { isEmpty } = require('lodash')

export default async function handleSuccess(ctx, next) {
  await next()

  if (ctx.status === 200 && isEmpty(ctx.body)) {
    ctx.status = 204
  }
}
