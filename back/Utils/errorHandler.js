class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode

        //Capturar la rupa del error o todo lo que este relacionado con el error
        Error.captureStackTrace(this, this.constructor)

    }
}

module.exports = ErrorHandler