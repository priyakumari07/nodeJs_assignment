const yup = require('yup');

const userValidation  = yup.object().shape({
  firstName: yup.string().required('Please Enter the First Name'),
  lastName: yup.string().required('Please Enter the Last Name'),
  email: yup.string().email().required('Please Enter Your Email Address'),
  password: yup.string().min(4).max(10).required('Please Enter Your Password'),
  addressLine1: yup.string().required('Please Fill Your Password'),
  city: yup.string().required('City Name is Required'),
  state: yup.string().required('State is Required'),
  zip: yup.string().required('Enter your Zip code'),
});

module.exports = userValidation;