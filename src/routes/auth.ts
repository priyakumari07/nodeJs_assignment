const router = require("express").Router();
const userController = require("../controller/userController")
const userValidator = require("../middleware/validator")
const validation = require("../validation/userValidation")

//Route for registering new user
router.post("/register", userValidator(validation),userController.register);


//Route for Login user
router.post('/login', userController.login);

//Route for Update user
router.put('/update', userController.updateUser);


module.exports = router;
