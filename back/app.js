const express = require("express");
const app = express();

//Importar las rutas
const productos =require("./routes/products")

app.use(express.json());

app.use('/api', productos)


module.exports = app
