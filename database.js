const Pool = require("pg").Pool;

const dbCredentials = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
};

const pool = new Pool(dbCredentials);

const createUserTable = `CREATE TABLE IF NOT EXISTS users(
                            id SERIAL NOT NULL PRIMARY KEY,
                            username VARCHAR(255) UNIQUE,
                            email VARCHAR UNIQUE,
                            password TEXT
                        )`;
const createRecipeTable = `CREATE TABLE IF NOT EXISTS recipes(
                            id SERIAL NOT NULL PRIMARY KEY,
                            title TEXT NOT NULL,
                            description TEXT NOT NULL,
                            user_id INTEGER REFERENCES users(id) NOT NULL
                          )`;
const createFeebackTable = `CREATE TABLE IF NOT EXISTS feedback(
                              id SERIAL NOT NULL PRIMARY KEY,
                              description TEXT NOT NULL,
                              recipe_id INTEGER REFERENCES recipes(id) NOT NULL,
                              user_id INTEGER REFERENCES users(id) NOT NULL
                            )`;

const createTables = async () => {
  await pool.query(createUserTable).catch((err) => console.log(err.message));

  await pool.query(createRecipeTable).catch((err) => console.log(err.message));

  await pool.query(createFeebackTable).catch((err) => console.log(err.message));
};

// TODO: Uncomment when running app for the first time
// createTables();

const createUser = async (user) => {
  const query = `INSERT INTO
                    users(username, email, password)
                  VALUES(
                      '${user.username}',
                      '${user.email}',
                      '${user.password}'
                    )`;

  try {
    await pool.query(query);
    return { isValid: true, error: null };
  } catch (err) {
    return { isValid: false, error: err.message };
  }
};

const getUser = async (userId) => {
  const query = `SELECT * FROM users WHERE id='${userId}'`;

  try {
    const result = await pool.query(query);
    if (result.rowCount <= 0) {
      return { isValid: false, error: "Invalid user id", user: null };
    }

    return { isValid: true, error: null, user: result.rows[0] };
  } catch (err) {
    return { isValid: false, error: err.message, user: null };
  }
};

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email='${email}'`;

  try {
    const result = await pool.query(query);
    if (result.rowCount <= 0) {
      return { isValid: false, error: "Invalid user email", user: null };
    }

    return { isValid: true, error: null, user: result.rows[0] };
  } catch (err) {
    return { isValid: false, error: err.message, user: null };
  }
};

const createRecipe = async (recipe) => {
  const query = `INSERT INTO
                  recipes(title, description, user_id)
                VALUES(
                    '${recipe.title}',
                    '${recipe.description}',
                    '${recipe.userId}'
                )`;
  await pool.query(query).catch((err) => {
    return { isValid: false, error: err.message };
  });

  return { isValid: true, error: null };
};

const getRecipeSimple = async (recipe_id) => {
  const query = `SELECT * FROM recipes WHERE id=${recipe_id}`;
  const result = await pool.query(query).catch((err) => {
    return { isValid: false, error: err.message, recipe: null };
  });

  if (result.rowCount <= 0) {
    return { isValid: false, error: "Invalid recipe id", recipe: null };
  }

  return { isValid: true, error: null, recipe: result.rows[0] };
};

const getRecipe = async (recipe_id) => {
  let query = `SELECT
                  recipes.id,
                  recipes.title,
                  recipes.description,
                  recipes.user_id,
                  users.username
                FROM
                  recipes
                  INNER JOIN users ON recipes.user_id = users.id
                WHERE
                  recipes.id = '${recipe_id}'`;
  let result = await pool.query(query).catch((err) => {
    return { isValid: false, error: err.message, recipe: null };
  });

  if (result.rowCount <= 0) {
    return { isValid: false, error: "Invalid recipe id", recipe: null };
  }

  const recipe = {
    id: result.rows[0].id,
    title: result.rows[0].title,
    description: JSON.parse(result.rows[0].description),
    user: { id: result.rows[0].user_id, username: result.rows[0].username },
    comments: [],
    numComments: 0,
  };

  query = `SELECT
            feedback.id,
            feedback.description AS message,
            feedback.user_id,
            users.username
          FROM
            feedback
            INNER JOIN users ON users.id = feedback.user_id
          WHERE
            feedback.recipe_id = 0
          ORDER BY
            feedback.id ASC`;
  result = await pool.query(query).catch((err) => {
    return { isValid: false, error: err.message, recipe: null };
  });

  recipe.numComments = result.rowCount;
  for (let row of result.rows) {
    const comment = {
      id: row.id,
      comment: row.message,
      user: { id: row.user_id, username: row.username },
    };
    recipe.comments.push(comment);
  }

  return { isValid: true, error: null, recipe };
};

const getRecipesByUser = async (user_id) => {
  const query = `SELECT
                  recipes.id,
                  recipes.title,
                  recipes.description,
                  recipes.user_id,
                  users.username,
                  COUNT(feedback.id) AS num_comments
                FROM
                  recipes
                  LEFT JOIN feedback ON recipes.id = feedback.recipe_id
                  INNER JOIN users ON recipes.user_id = users.id
                WHERE
                  recipes.user_id = '${user_id}'
                GROUP BY
                  recipes.id,
                  users.username`;
  const result = await pool.query(query).catch((err) => {
    return { isValid: false, error: err.message, recipes: [] };
  });

  let recipes = [];
  for (let row of result.rows) {
    const recipe = {
      id: row.id,
      title: row.title,
      description: JSON.parse(row.description),
      user: { id: row.user_id, username: row.username },
      numOfComments: parseInt(row.num_comments, 10),
    };
    recipes.push(recipe);
  }

  return { isValid: true, error: null, recipes };
};

const createFeedback = async (feedback) => {
  const query = `INSERT INTO
                  feedback(description, recipe_id, user_id)
                VALUES(
                    '${feedback.description.replace(/'/g, "''")}',
                    '${feedback.recipeId}',
                    '${feedback.userId}'
                  )`;
  const res = await pool.query(query).catch((err) => {
    return { isValid: false, error: err.message };
  });

  return { isValid: true, error: null };
};

// (async function () {
//     const user = {
//       username: "Kengo",
//       email: "kengo@email.com",
//       password: "password",
//     };
//     const res = await createUser(user);

//   const res = await getUser(2);

//   const recipe = {
//     title: "My delicious recipe",
//     description: JSON.stringify({ ingridients: [], directions: [] }),
//     userId: 1,
//   };

//   const res = await createRecipe(recipe);

//   const res = await getRecipe(1);

//   const res = await getRecipesByUser(1);

//   const feedback = {
//     userId: 1,
//     recipeId: 2,
//     description: "I don't see something nice",
//   };

//   const res = await createFeedback(feedback);

//   console.log(res);
// })();

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  createFeedback,
  getRecipe,
  createRecipe,
  getRecipeSimple,
  getRecipesByUser,
};
