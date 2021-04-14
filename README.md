# Recipe

A recipe app backend

## Getting Started

- Clone the repo

- Install all dependencies `yarn install`

- Create a `.env` file and add environment variables from `.env_example`

- Source the environment variables `source .env`

- Start server in dev mode `yarn dev`

- Start server in production mode `yarn start`

- To populate your database with dummy data:

  - Start the server `yarn start`

  - Open another terminal in the same directory and run `node auto/index.js`

## API Routes

- Register User

```js
// Route -> /api/v1/auth/register POST NoAuth
{
  "email": "string, required",
  "username": "string, required",
  "password": "string, required, minLength: 8"
}
```

- Log In

```js
// Route -> /api/v1/auth/login POST NoAuth
{
  "email": "string, required",
  "password": "string, required"
}
```

- Add Recipe

```js
// Route -> /api/v1/recipes POST Auth
// Auth -> { Authorization: 'Bearer <accessToken>' }
{
  "title": "string, required",
  "description": {
    "ingridients": [{ "item": "string, required", "quantity": "string" }], // This array can't be empty
    "directions": ["string, required"] // This array can't be empty
  }
}
```

- Get All Recipes

```js
// Route -> /api/v1/recipes GET Auth
// Auth -> { Authorization: 'Bearer <accessToken>' }
```

- Get My Recipes

```js
// Route -> /api/v1/recipes/my GET Auth
// Auth -> { Authorization: 'Bearer <accessToken>' }
```

- Get A Recipe

```js
// Route -> /api/v1/recipes/:recipeId GET Auth
// Auth -> { Authorization: 'Bearer <accessToken>' }
```

- Add Feedback to Recipe

```js
// Route -> /api/v1/recipes/:recipeId/feedback POST Auth
// Auth -> { Authorization: 'Bearer <accessToken>' }
{
  "description": "string, required"
}
```
