//Capturar los errores de funciones asincronas cuando la promesa no se cumple

module.exports = func => (req, res, next) => 
    Promise.resolve(func(req, res, next))
        .catch(next)
    
