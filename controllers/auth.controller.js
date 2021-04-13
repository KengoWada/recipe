const bcrypt = require("bcryptjs");

const { createUser, getUser } = require("../database");
const { validateRegisterUser } = require("../validation/index");

const registerUser = async (req, res) => {
  let result = validateRegisterUser(req.body);
  if (!result.isValid) {
    const response = { message: "Invalid request", error: result.error };
    return res.status(400).json(response);
  }

  // Hash password
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = passwordHash;

  result = await createUser(req.body);
  if (!result.isValid) {
    const response = { message: "Invalid request", error: result.error };
    return res.status(400).json(response);
  }

  const response = { message: "DONE" };
  return res.status(201).json(response);
};

const loginUser = async (req, res) => {
  return res.status(201).json({ message: "DONE" });
};

module.exports = { registerUser, loginUser };
