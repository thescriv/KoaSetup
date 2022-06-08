const Ajv = require('ajv')

const ajv = new Ajv()

function createValidator(schema) {
  const ajvValidator = ajv.compile(schema)

  return function validate(data) {
    const isValid = ajvValidator(data)

    let errors: Error[] = []

    if (!isValid) {
      errors = ajvValidator.errors.map((error) => {
        const dataPath = error.dataPath.replace(/\./, '')

        const message = `${dataPath}${error.message}`

        return {
          param: dataPath,
          keyword: error.keyword,
          message,
          details: error.params
        }
      })
    }

    return { isValid, errors }
  }
}

module.exports = { createValidator }
