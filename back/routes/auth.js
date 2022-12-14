const express = require("express");
const { registroUsuario, 
    loginUser,
    logOut,
    forgotPassword,
    resetPassword,
    getUserProfile, 
    updatePassword,
    updateProfile,
    getAllUsers} = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route('/usuario/registro').post(registroUsuario)
router.route('/login').get(loginUser)
router.route('/logout').get(isAuthenticatedUser, logOut)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').post(resetPassword)
router.route('/yo').get(isAuthenticatedUser, getUserProfile)
router.route('/yo/updatePassword').put(isAuthenticatedUser, updatePassword)
router.route('/yo/updateProfile').put(isAuthenticatedUser, updateProfile)

//Rutas ADMIN
router.route('/admin/allUsers').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)

module.exports = router