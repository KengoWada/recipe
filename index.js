const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const response = { message: "Done", status: 200 };
  return res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
