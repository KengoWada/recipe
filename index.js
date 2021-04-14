const express = require("express");
const bodyParser = require("body-parser");

const {} = require("./database");
const auth = require("./routes/auth");
const recipes = require("./routes/recipes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/recipes", recipes);

app.get("/", (req, res) => {
  const response = { message: "Done", status: 200 };
  return res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
