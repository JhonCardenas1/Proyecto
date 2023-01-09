const catchAsyncErros = require("../middleware/catchAsyncErros.js");
const producto = require("../models/products.js");
const ErrorHandler = require("../Utils/errorHandler.js");
const fetch = (url) => import ('node-fetch').then(({default:fetch}) => fetch(url));


//Crear nuevo producto /api/productos
exports.newProduct = catchAsyncErros(async (req, res, next) => {
    
    req.body.user= req.user.id;
    const product = await producto.create(req.body);
    
    res.status(201).json({
        sucess: true,
        product
    })
})

//Consultar la lista de todos los productos
exports.getAllProducts = catchAsyncErros(async (req, res, next) => {
    const products = await producto.find();
    if(!products){
        return next(new ErrorHandler("Informacion no encontrada", 404))

        /*return res.status(404).json({
            success:false,
            error:true
        })*/
    }
    res.status(200).json({
        sucess:true,
        count: products.length,
        products
    })
})

//Consultar productos por ID
exports.getProductsById = catchAsyncErros( async (req, res, next) => {
    const product = await producto.findById(req.params.id);
    
    if(!product){
        
        return next(new ErrorHandler("Producto no encontrado", 404))
    
    //Sin el Middleware
        /*if(!product){
            return res.status(404).json({
                sucess:false,
                message: "No se encontro el producto",
                error:true
            })*/
    }

    res.status(200).json({
        sucess:true,
        message: "Aqui debajo estara la informacion del producto",
        product
    })
})

//Actualizar producto por id
exports.updateProductById = catchAsyncErros(async (req, res, next) =>{
    let product = await producto.findById(req.params.id); //variable de tipo modificacle
    if(!product){ // Verificar si el objeto existe para finalizar el proceso
        
        return next(new ErrorHandler("Producto no encontrado", 404))

        /*return res.status(404).json({
            sucess:false,
            message: "No se encontro el producto"
        })*/
    };

    //Si el objeto existe, ejecute la actualizacion
    product = await producto.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true
    });
    //Confirmar la actualización
    res.status(200).json({
        success: true,
        message: "Producto Actualizado",
        product
    })
})

//Eliminar productos
exports.deleteProduct = catchAsyncErros(async (req, res, next) =>{
    const product = await producto.findById(req.params.id); //variable de tipo modificacle
    if(!product){ // Verificar si el objeto existe para finalizar el proceso
       
        return next(new ErrorHandler("Producto no encontrado", 404))

        /*return res.status(404).json({
            sucess:false,
            message: "No se encontro el producto"
        })*/
    };
    await product.remove();
    res.status(200).json({
        success: true,
        message: "El producto se elimino correctamente"
    });

})



//Utilizando fetch
//Consultar todos los productos
function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err =>console.error(err))
}
//verProductos(); //Llamar el metodo creado

//Consultar productos por id
function verProductoPorId(id){
    fetch('localhost:4000/api/producto/'+id)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err =>console.error(err))
}

//verProductoPorId('6388a02672d9108545c4c75c')


