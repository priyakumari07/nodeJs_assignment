const User = require("../model/user");
const bcrypt = require("bcryptjs");

// Register new user
exports.register = async (req: any, res: any) => {
  const isEmailExist = await User.findOne({ email: req.body.email });

  //throw error when email already registered
  if (isEmailExist)
    return res.status(400).json({ error: "Email already exists" });

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
    addressLine1: req.body.addressLine1,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  });
  try {
    const savedUser = await user.save();
    res.json({ error: null, data: savedUser });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//Login
exports.login = async (req: any, res: any, next: any) => {  
  try {  
    const user = await User.findIfUserExists(req.body.email, req.body.password);   
    const token = await user.authToken();   
    
    res.status(200).send({ user, token });
    res.header("auth-token", token).json({
      error: null,
      data: {
        token,
        message: "Login successful",
      },
    });
  } catch (e) {
    res.send({ Error: "Invalid Username and Password" });
  }
};

//Modifying User
exports.updateUser = async (req: any, res: any, next: any) => {

//destructing address,city,state and zip
  const { addressLine1, city, state, zip } = req.body;
  if (!addressLine1 || !city || !state || !zip) {
    res.status(400).send({ Error: "Please enter Address city and State" });
    next();
    return;
  }
  const data = { addressLine1, city, state, zip };
  const email = req.body.email;
  try {
    const updatedUser = await User.findOneAndUpdate(email, data, { new: true });
    if (updatedUser) {
      res.status(200).send({ success: true, user: updatedUser });
    }
  } catch (e) {
    res.status(500).send({ Error: "Info cannot be updated" });
  }
};
