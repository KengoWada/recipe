const { func } = require("joi");
const Joi = require("joi");

const validateRegisterUser = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().min(8).required(),
  });

  const res = schema.validate(body);
  if (res.error) {
    return { isValid: false, error: res.error };
  }

  return { isValid: true, error: null };
};

const validateLogin = (body) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const res = schema.validate(body);
  if (res.error) {
    return { isValid: false, error: res.error };
  }

  return { isValid: true, error: null };
};

// (async function () {
//   const body = {
//     email: "louiskengo3@gmail.com",
//     username: "Kengo",
//     password: "123456789",
//   };
//   console.log(validateRegisterUser(body));
// })();

module.exports = { validateRegisterUser, validateLogin };
