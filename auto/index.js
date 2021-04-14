const axios = require("axios");

const { users, recipes, comments } = require("./data");

const BASE_URL = "http://localhost:3000/api/v1";

const validUsers = Object.values(users);
validUsers.pop();

const validRecipes = Object.values(recipes);
validRecipes.pop();

const registerUsers = async (users) => {
  for (let user of users) {
    await axios
      .post(`${BASE_URL}/auth/register`, user)
      .catch((err) =>
        console.log(
          "Failed to create ",
          user.username,
          ". Status: ",
          err.response.status
        )
      );
  }
};

const loginUsers = async (users) => {
  let loggedInUsers = [];

  for (let user of users) {
    const username = user.username;
    const data = user;
    delete data.username;
    await axios
      .post(`${BASE_URL}/auth/login`, data)
      .then((res) => {
        loggedInUsers.push({
          username: username,
          accessToken: `Bearer ${res.data.data.accessToken}`,
        });
      })
      .catch((err) => console.log(err.response.data));
  }

  return loggedInUsers;
};

const addRecipes = async (recipes, users) => {
  const recipeUsers = [
    { user: users[0], recipe: recipes.slice(0, 4) },
    { user: users[1], recipe: recipes.slice(4, 6) },
    { user: users[2], recipe: recipes.slice(6, 9) },
  ];
  for (let recipe of recipeUsers[0].recipe) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: users[0].accessToken,
    };

    await axios
      .post(`${BASE_URL}/recipes`, recipe, { headers })
      .catch((err) => console.log(err.response.data));
  }

  for (let recipe of recipeUsers[1].recipe) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: users[1].accessToken,
    };

    await axios
      .post(`${BASE_URL}/recipes`, recipe, { headers })
      .catch((err) => console.log(err.response.data));
  }

  for (let recipe of recipeUsers[2].recipe) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: users[2].accessToken,
    };

    await axios
      .post(`${BASE_URL}/recipes`, recipe, { headers })
      .catch((err) => console.log(err.response.data));
  }
};

const addComments = async (feeback, users, recipeIds) => {
  for (let i of recipeIds) {
    const numOfComments = Math.floor(Math.random() * 5 + 1);

    for (let j = 0; j <= numOfComments; j++) {
      const user = users[Math.floor(Math.random() * 5 + 0)];
      const comment = feeback[Math.floor(Math.random() * 4 + 0)];

      const headers = {
        "Content-Type": "application/json",
        Authorization: user.accessToken,
      };
      const url = `${BASE_URL}/recipes/${i}/feedback`;

      await axios
        .post(url, comment, { headers })
        .catch((err) => console.log(err.response.data));
    }
  }
};

(async function () {
  console.log("Registering dummy users...");
  await registerUsers(validUsers);

  console.log("Logging in dummy users...");
  const loggedInUsers = await loginUsers(validUsers);

  console.log("Adding dummy recipes...");
  await addRecipes(validRecipes, loggedInUsers.slice(0, 3));
  const recipeIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  console.log("Adding dummy feedback...");
  await addComments(comments, loggedInUsers, recipeIds);
})();
