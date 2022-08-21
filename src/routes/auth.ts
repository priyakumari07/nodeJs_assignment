const router = require("express").Router();
const userController = require("../controller/userController")

//Route for registering new user
router.post("/register", userController.register);


//Route for Login user
router.post('/login', userController.login);

//Route for Update user
router.put('/update', userController.updateUser);


module.exports = router;
