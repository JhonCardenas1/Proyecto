const express = require("express");
const router = express.Router();

const {newProduct, getAllProducts, getProductsById, updateProductById, deleteProduct} = require("../controllers/productsControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//probando autenticacion
router.route('/producto/nuevo').post(isAuthenticatedUser,authorizeRoles("admin"), newProduct);
router.route ('/productos').get(getAllProducts);
router.route('/producto/:id').get(getProductsById);
router.route('/producto/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProductById);
router.route('/producto/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

module.exports =router;