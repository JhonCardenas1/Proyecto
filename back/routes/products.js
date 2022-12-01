const express = require("express");
const router = express.Router();

const {newProduct, getAllProducts, getProductsById, updateProductById, deleteProduct} = require("../controllers/productsControllers")


router.route('/producto/nuevo').post(newProduct);
router.route ('/productos').get(getAllProducts);
router.route('/producto/:id').get(getProductsById);
router.route('/producto/:id').put(updateProductById);
router.route('/producto/:id').delete(deleteProduct);

module.exports =router;