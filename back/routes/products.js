const express = require("express");
const router = express.Router();

const {newProduct, getAllProducts, getProductsById, updateProductById, deleteProduct} = require("../controllers/productsControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//probando autenticacion
router.route('/producto/nuevo').post(newProduct);
router.route ('/productos').get(getAllProducts);
//router.route ('/productos').get(isAuthenticatedUser,authorizeRoles("admin"), getAllProducts);
router.route('/producto/:id').get(getProductsById);
router.route('/producto/:id').put(updateProductById);
router.route('/producto/:id').delete(deleteProduct);

module.exports =router;