async function errorOnPurpose(ctx) {
  throw new Error('an error occured')
}

module.exports = { errorOnPurpose }
