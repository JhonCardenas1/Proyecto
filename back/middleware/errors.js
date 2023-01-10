const ErrorHandler = require('../Utils/errorHandler');

// Error del servidor
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    res.status(err.statusCode).json({
        success: false,
        message: err.stack
    })

    //Eror de clave duplicaca en mongoose
    if(err.code === 11000){
        const message =`Clave duplicada ${Object.keys(err.keyValue)}`
        error = new ErrorHandler(message, 400)
    }

    //Error en JWT Token
    if(err.name === "JsonWebTokenError"){
        const message ="Token de Json Wed es invalido, intetelo de nuevo!"
        error = new ErrorHandler(message,400)
    }

    //Error token expirado
    if(err.name === "TokenExpiredError"){
        const message = "El token de JWT esta vencido, Ya expiro. Intentalo de nuevo"
        error = new ErrorHandler(message, 400)
    }
}


