const response = require('./response');

function errors(err, req, res, next) {
    //logear los errores de nuestro servidor, (buena practica tener un estandar para los log)
    console.error('[error]', err);

    const message = err.message || 'Error internal';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports = errors;