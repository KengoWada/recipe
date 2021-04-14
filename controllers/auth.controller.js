const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createUser, getUserByEmail } = require("../database");
const { validateRegisterUser, validateLogin } = require("../validation/index");

const JWT_SECRET = process.env.JWT_SECRET;

const generateAccessToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1800s" });
};

const registerUser = async (req, res) => {
  let result = validateRegisterUser(req.body);
  if (!result.isValid) {
    const response = {
      message: "Invalid request",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  req.body.password = bcrypt.hashSync(req.body.password, 10);

  result = await createUser(req.body);
  if (!result.isValid) {
    const response = {
      message: "Invalid request",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  const user = await getUserByEmail(req.body.email);
  const accessToken = generateAccessToken(user.user);

  const response = { message: "DONE", error: null, data: { accessToken } };
  return res.status(201).json(response);
};

const loginUser = async (req, res) => {
  const result = validateLogin(req.body);
  if (!result.isValid) {
    const response = {
      message: "Invalid credentials",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  const user = await getUserByEmail(req.body.email);
  if (!user.isValid) {
    const response = {
      message: "Invalid credentials",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  if (!bcrypt.compareSync(req.body.password, user.user.password)) {
    const response = {
      message: "Invalid credentials",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  const accessToken = generateAccessToken(user.user);

  const response = { message: "DONE", data: { accessToken }, error: null };
  return res.status(201).json(response);
};

module.exports = { registerUser, loginUser };
