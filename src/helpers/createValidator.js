const Ajv = require('ajv')
const createError = require('http-errors')

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

function createValidator(schema) {
  const ajvValidator = ajv.compile(schema)

  return function validate(data) {
    const isValid = ajvValidator(data)

    if (!isValid) {
      const errors = ajvValidator.errors.map((error) => {
        return {
          param_name: error.dataPath,
          keyword: error.keyword,
          message: error.message,
          details: error.params
        }
      })

      throw createError(400, 'Oops something got wrong', {
        help: 'Validation error',
        helps: errors
      })
    }
  }
}

module.exports = { createValidator }
