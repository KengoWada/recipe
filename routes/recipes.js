const express = require("express");

const { authenticateToken } = require("../middleware/auth");
const {
  addFeedback,
  addRecipe,
  getRecipes,
  getMyRecipes,
  getOneRecipe,
} = require("../controllers/recipes.controller");

const router = express.Router();

router.post("", authenticateToken, addRecipe);

router.get("", authenticateToken, getRecipes);

router.get("/my", authenticateToken, getMyRecipes);

router.get("/:recipeId", authenticateToken, getOneRecipe);

router.post("/:recipeId/feedback", authenticateToken, addFeedback);

module.exports = router;
