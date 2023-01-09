const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const ErrorHandler= require("../Utils/errorHandler");
const catchAsyncErros = require("../middleware/catchAsyncErros");

//Verificamos si estamos autenticados, (existencia y veracidad del token)
exports.isAuthenticatedUser = catchAsyncErros( async(req, res, next) =>{
    const {token} = req.cookies

    if(!token){
       return next(new ErrorHandler("Debe iniciar sesion para ingresar a este recurso",401))
    }
    
    const decodificada = jwt.decode(token, process.env.JWT_SECRET)
    req.user = await User.findById(decodificada.id);

    next()
})

//Capturamos el role
exports.authorizeRoles = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Rol (${req.user.role}) no esta autorizado a entrar a este recurso`,403))
        }
        next()
    }
}