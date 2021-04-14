const {
  createFeedback,
  createRecipe,
  getAllRecipes,
  getRecipe,
  getRecipeSimple,
  getRecipesByUser,
} = require("../database");
const {
  validateAddRecipe,
  validateAddFeedback,
} = require("../validation/index");

const addRecipe = async (req, res) => {
  let result = validateAddRecipe(req.body);
  if (!result.isValid) {
    const response = {
      message: "Invalid request",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  req.body.description = JSON.stringify(req.body.description);
  req.body.userId = req.user.id;

  result = await createRecipe(req.body);
  if (!result.isValid) {
    const response = {
      message: "Invalid request",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  const response = { message: "DONE", error: null, data: null };
  return res.status(201).json(response);
};

const addFeedback = async (req, res) => {
  let result = validateAddFeedback(req.body);
  if (!result.isValid) {
    const response = {
      message: "Invalid request",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  result = await getRecipeSimple(req.params.recipeId);
  if (!result.isValid) {
    const response = {
      message: "Invalid request",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  req.body.recipeId = req.params.recipeId;
  req.body.userId = req.user.id;

  result = await createFeedback(req.body);
  if (!result.isValid) {
    const response = {
      message: "Invalid request",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  const response = { message: "DONE", error: null, data: null };
  return res.status(201).json(response);
};

const getMyRecipes = async (req, res) => {
  const result = await getRecipesByUser(req.user.id);
  if (!result.isValid) {
    const response = {
      message: "Invalid request",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  const response = {
    message: "DONE",
    error: null,
    data: { recipes: result.recipes },
  };
  return res.status(200).json(response);
};

const getRecipes = async (req, res) => {
  const result = await getAllRecipes();
  if (!result.isValid) {
    const response = {
      message: "Invalid request",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  const response = {
    message: "DONE",
    error: null,
    data: { recipes: result.recipes },
  };
  return res.status(200).json(response);
};

const getOneRecipe = async (req, res) => {
  const result = await getRecipe(req.params.recipeId);
  if (!result.isValid) {
    const response = {
      message: "Invalid request",
      error: result.error,
      data: null,
    };
    return res.status(400).json(response);
  }

  const response = {
    message: "DONE",
    error: null,
    data: { recipe: result.recipe },
  };
  return res.status(200).json(response);
};

module.exports = {
  addRecipe,
  addFeedback,
  getMyRecipes,
  getRecipes,
  getOneRecipe,
};
