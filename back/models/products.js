const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
    nombre:{
        type: String,
        required:[true, "Por favor refistra el nombre del producto."],
        trim: true,
        maxLength:[120,"El nombre del producto no debe exceder los 120 caracteres."],
    },
    precio:{
        type: Number,
        required: [true, "Por favor registre el precio del producto."],
        maxLength: [9, "El precio del producto no puede estar por encima de 999'999.999"],
        default: 0.0
    },
    descripcion:{
        type: String,
        required: [true, "Por favor registre una descripcion para el producto"]
    },
    calificacion:{
        type: Number,
        default: 0
    },
    imagen:[
        {
            public_id:{
                type: String,
                required: true,  
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    categoria:{
        type: String,
        require:[true, "Por favor seleccione la categoria del producto."],
        enum:{
            values:[
                "Perifericos",
                "Almacenamiento",
                "Accesorios",
                "Programas",
                "Tarjetas graficas"
            ]
        }
    },
    vendedor:{
        type: String,
        required: [true, "Por favor registre el vendedor del producto"]
    },
    inventario:{
        type: Number,
        required: [true,"Por favor registre el Stock del producto"],
        maxLength: [5, "Cantidad maxima del producto no puede sobrepasar 99999"],
        default: 0
    },
    numCalificaciones:{
        type: Number,
        default: 0
    },
    opiniones:[
        {
            nombreCliente:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comentario:{
                type: String,
                required: true
            }
        }
    ],
    fechaCreacion:{
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports= mongoose.model("productos", productsSchema);