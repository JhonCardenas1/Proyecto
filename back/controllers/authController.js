const User = require("../models/auth");
const catchAsyncErros = require("../middleware/catchAsyncErros");
const ErrorHandler = require("../Utils/errorHandler");

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

    res.status(201).json({
        success: true,
        user
    })
})