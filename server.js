import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// TODO rubust DB functions
// TODO create a dashboard, comment section
// TODO update profile

// TODO captcha

// TODO send email
// TODO verify email
// TODO forgot password, reset password

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

const users = JSON.parse(fs.readFileSync("./db.json")).users;

// register route
app.post("/api/users/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // check if user exists on db
  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // hash password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // create new user
  const newUser = {
    id: users.length + 1,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    comments: [],
  };

  // save user to db
  users.push(newUser);
  fs.writeFileSync("./db.json", JSON.stringify({ users: users }));

  // send response
  res.status(201).json({ message: "User created successfully" });
});

// login route
app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;

  // check if user exists on db
  const userExists = users.find((user) => user.email === email);

  if (!userExists) {
    return res.status(400).json({ message: "User does not exist" });
  }

  // check if password is correct
  const isPasswordCorrect = bcryptjs.compareSync(password, userExists.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  } else {
    const token = jwt.sign({ user: userExists }, "secret", { expiresIn: "1h" });

    return res.status(200).json({ message: "Login successful", token });
  }
});

// * middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
};

// validate token
app.get("/api/users/validate-token", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

// add comments
app.post("/api/users/add-comments", verifyToken, (req, res) => {
  const { comment } = req.body;

  users.map((user) => {
    if (user.id === user.id) {
      user.comments.push(comment);
    }
  });

  fs.writeFileSync("./db.json", JSON.stringify({ users: users }));

  res.status(200).json({ res: "change done" });
});

// get comments
app.get("/api/users/get-comments", verifyToken, (req, res) => {
  // get only comments and first name
  const commentsList = users.map((user) => {
    return {
      firstName: user.firstName,
      comments: user.comments,
    };
  });

  res.status(200).json({ commentsList });
});

app.listen(4000, () => {
  console.log("Server is running on port http://localhost:4000");
});
