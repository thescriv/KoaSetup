module.exports = {
  API_PORT: process.env.API_PORT || '3000',
  API_URL: process.env.API_URL || 'localhost',
  MIDDLEWARE_ERROR_LOGGER: process.env.MIDDLEWARE_ERROR_LOGGER === true
}
