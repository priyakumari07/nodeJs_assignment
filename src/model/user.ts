const usermongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = new usermongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
 },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  addressLine1: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  city: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  state: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  zip: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.authToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRECT, {
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findIfUserExists = async function (email:string,password:string) {
 
  const user = await userModel.findOne({ email});
 
  // throw error when email is wrong
  if (!user) throw new Error( "User does not exist" );
 
  // check for password correctness
  // const validPassword = await bcrypt.compare(password, user.password);
 
  // if (!validPassword)
  //  throw new Error( "Invalid Password" );
   return user;
}
const userModel = usermongoose.model('User', userSchema);
module.exports = userModel;
