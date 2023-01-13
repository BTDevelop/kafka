const {HexaError} = require('./hexa-error')

const errorHandler = (err, req, res, next) => {
    if(err instanceof HexaError) {
        return res.status(err.statusCode).send({ Error: err.serializeError() })
    }
    res.status(400).send({error: {message: err.message}})
}

module.exports = errorHandler