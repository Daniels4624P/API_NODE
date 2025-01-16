const boom = require('@hapi/boom')

const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property]
    const { error } = schema.validate(data) // schema.validate(data, { abortEarly: false }) si se pone este segundo parametro, se obtienen todos los errores no solo el primero
    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = validatorHandler
