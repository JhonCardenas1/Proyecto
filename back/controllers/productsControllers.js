const producto = require("../models/products.js");
const fetch = (url) => import ('node-fetch').then(({default:fetch}) => fetch(url));


//Crear nuevo producto /api/productos
exports.newProduct = async (req, res, next) => {
    const product = await producto.create(req.body);
    res.status(201).json({
        sucess: true,
        product
    })
}

//Consultar la lista de todos los productos
exports.getAllProducts = async (req, res, next) => {
    const productos = await producto.find();
    if(!productos){
        return res.status(404).json({
            success:false,
            error:true
        })
    }
    res.status(200).json({
        sucess:true,
        count: productos.length,
        productos
    })
}

//Consultar productos por ID
exports.getProductsById = async (req, res, next) => {
    const id = await producto.findById(req.params.id);
    if(!id){
        return res.status(404).json({
            sucess:false,
            message: "No se encontro el producto"
        })
    }
    res.status(200).json({
        sucess:true,
        message: "Aqui debajo estada la informacion del producto",
        id
    })
}

//Actualizar producto por id
exports.updateProductById = async (req, res, next) =>{
    let id = await producto.findById(req.params.id); //variable de tipo modificacle
    if(!id){ // Verificar si el objeto existe para finalizar el proceso
        return res.status(404).json({
            sucess:false,
            message: "No se encontro el producto"
        })
    };
    //Si el objeto existe, ejecute la actualizacion
    id = await producto.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true
    });
    //Confirmar la actualización
    res.status(200).json({
        success: true,
        message: "Producto Actualizado",
        id
    })
}

//Eliminar productos
exports.deleteProduct = async (req, res, next) =>{
    const id = await producto.findById(req.params.id); //variable de tipo modificacle
    if(!id){ // Verificar si el objeto existe para finalizar el proceso
        return res.status(404).json({
            sucess:false,
            message: "No se encontro el producto"
        })
    };
    await id.remove();
    res.status(200).json({
        success: true,
        message: "El producto se elimino correctamente"
    });

}



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


