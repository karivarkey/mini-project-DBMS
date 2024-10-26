const express = require("express");
const monogodb = require("mogodb");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>HELLO this is /</h1>");
});

app.post("/add", (req, res) => {
  //print the request value
  let x = "10";
  const y = 10;
  console.log(x + y);

  res.send("<h1>HELLO this is ADD </h1>");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
