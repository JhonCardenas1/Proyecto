const User = require("../models/auth");
const catchAsyncErros = require("../middleware/catchAsyncErros");
const ErrorHandler = require("../Utils/errorHandler");
const tokenEnviado = require("../Utils/jwtToken");

//Registrar un nuevo usuario /api/usuario/registro

exports.registroUsuario = catchAsyncErros( async (req, res, next)=>{
    const {nombre, email, password} = req.body;
    
    
    const user = await User.create({
        nombre,
        email,
        password, 
        avatar:{
            public_id:"grBa1KTwfoWBOqu1n0ewyRXQnx59bNHtHjvbsFc82gk",
            url: "https://media.istockphoto.com/id/1300845620/es/vector/icono-de-usuario-plano-aislado-sobre-fondo-blanco-s%C3%ADmbolo-de-usuario-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=grBa1KTwfoWBOqu1n0ewyRXQnx59bNHtHjvbsFc82gk="
        }
    })
    /*const token = user.getJwtToken();
    res.status(201).json({
        success: true,
        token,
        user
    })*/

    tokenEnviado(user, 201,res)
})

//Metodo para iniciar sesión-Login
exports.loginUser = catchAsyncErros(async(req, res, next) => {
    const{ email, password} = req.body;

    //Verificar si los campos estan completos
    if(!email || !password){
        return next(new ErrorHandler("Por favor ingrese email & contraseña", 400))
    }

    //Buscar si el usuario existe en la base de datos
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Email o contraseña invalidos", 401))
    }

    //Comparar contraseñas, verificar si estan bien
    const contraseñaOK = await user.compararPass(password);

    if(!contraseñaOK){
        return next(new ErrorHandler("Contraseña invalida", 401))
    }
    
    /*const token = user.getJwtToken();
    res.status(201).json({
        success: true,
        token,
        user
    })*/

    tokenEnviado(user, 200,res)
})
