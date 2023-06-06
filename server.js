// load .env data into process.env
require("dotenv").config();

const { chat } = require("./lib/openAI");

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");


const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["TaskMaster"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const userApiRoutes = require("./routes/users-api");
const itemApiRoutes = require("./routes/items-api");
const categoryApiRoutes = require("./routes/categories-api");
const aiApiRoutes = require("./routes/open-ai");
const usersRoutes = require("./routes/users");
const { getUserByEmail } = require("./helpers");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use("/api/users", userApiRoutes);
app.use("/api/items", itemApiRoutes);
app.use("/api/categories", categoryApiRoutes);
app.use("/api/open-ai", aiApiRoutes);
app.use("/users", usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

const users = []; // Placeholder for user data

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  console.log("here: ", users);
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw new Error("Missing required fields");
    }
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
    const newUser = {
      name,
      email,
      password: hashedPassword, // Store the hashed password
    };
    users.push(newUser);
    console.log("Updated users: ", users);
    req.session.user_id = newUser.id;
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/login", (req, res) => {
  const userId = req.session.user_id;
  if (userId) {
    return;
  }
  const templateVars = {
    username: null,
  };
  res.render("login", templateVars);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email, users);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    console.log("Invalid email or password:", user);
    res.status(403).send("Invalid email or password");
    return;
  }
  
  req.session.user_id = user.id;
  console.log("Login successful:", user);
  res.json({ message: "Login successful", user });
});

app.post("/logout", (req, res) => {
  req.session = null;
});

app.get("/openai", (req, res) => {
  res.render("openai");
});

app.post("/openai", (req, res) => {
  chat(req.body.text)
    .then((aiResponse) => {
      console.log(req.body);
      res.json(aiResponse);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
