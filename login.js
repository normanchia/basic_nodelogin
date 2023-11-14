const fs = require("fs");
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

// Read users from file
let users = [];
fs.readFile("users.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading users file:", err);
    return;
  }
  // Assuming each line is a user with 'username,password'
  users = data.split("\n").map((line) => {
    const [username, password] = line.split(",");
    return { username, password };
  });
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

app.post("/auth", function (request, response) {
  let username = request.body.username;
  let password = request.body.password;

  if (username && password) {
    // Find user in the array
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      request.session.loggedin = true;
      request.session.username = username;
      response.redirect("/home");
    } else {
      response.send("Incorrect Username and/or Password!");
    }
    response.end();
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

const server = app.listen(3000, () =>
  console.log("Server started on port 3000")
);

module.exports = app;
