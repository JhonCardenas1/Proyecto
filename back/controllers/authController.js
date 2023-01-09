const User = require("../models/auth");
const catchAsyncErros = require("../middleware/catchAsyncErros");
const ErrorHandler = require("../Utils/errorHandler");
const tokenEnviado = require("../Utils/jwtToken");
const sendEmail = require("../Utils/sendEmail")
const crypto = require("crypto")

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

//Metodo para cerrar sesion
exports.logOut = catchAsyncErros(async(req, res, next)=>{
    res.cookie("token",null, {
         expires: new Date(Date.now()),
         httpOnly: true
    })

    res.status(200).json({
        success:true,
        message: "Cerró sesión"
    })
})

//Olvide mi contraseña, recuperar contraseña
exports.forgotPassword = catchAsyncErros( async(req, res, next) =>{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler("Usuario no registrado"), 404)
    }

    const resetToken = user.genResetPasswordToken();

    await user.save({validateBeforeSave: false})

    //Crear una url para hacer el reset de la contraseña
    const resetUrl =`${req.protocol}://${req.get("host")}/api/resetPassword/${resetToken}`;

    const mensaje = `Hola\n\n Tu link para ajustar una nueva contraseña es 
    el siguiente: \n\n ${resetUrl}\n\n
    Si no lo solicitaste este link, por favor comunicate con soporte.\n\n Att:\nTienda de informatica`

    try{
        await sendEmail({
            email:user.email,
            subject: "Tienda de informatica recuperacion de la contraseña",
            mensaje
        })
        res.status(200).json({
            success: true,
            message:`Correo enviado a :${user.email}`
        })

    } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500))
    }
})


//Resetear la contraseña
exports.resetPassword = catchAsyncErros(async(req, res, next) =>{
    //hashear el token que llego con la url

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
   
    //Buscamos al usuario al que le vamos a resetear la contraseña
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })

    //EL usuario esta en la base de datos ?
    if(!user){
        return next(new ErrorHandler("el token es invalido o ya expiro", 400))
    }

    //Diligenciamod bien los campos
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("contraseñas no coinciden", 400))
    }

    //Setear la nueva contraseña
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    tokenEnviado(user, 200, res)

})