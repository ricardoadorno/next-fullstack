import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// TODO  logout

// TODO connect with DB
// TODO update profile

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
    const token = jwt.sign({ id: email }, "secret", { expiresIn: 1800 });

    return res.status(200).json({ message: "Login successful", token });
  }
});

// TODO store the token then apply it to the header

// using middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

app.post("/api/users/validate", verifyToken, (req, res) => {
  const { comment } = req.body;
  res.status(200).json({ message: "Token is valid", comment });
});

app.listen(4000, () => {
  console.log("Server is running on port http://localhost:4000");
});
