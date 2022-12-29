import express from "express";
import bodyParser from "body-parser";
import bcryptjs from "bcryptjs";
import fs from "fs";

// TODO login
// TODO register
// TODO  logout

// TODO connect with DB
// TODO update profile

// TODO send email
// TODO verify email
// TODO forgot password, reset password

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const users = JSON.parse(fs.readFileSync("./db.json")).users;

// register route
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

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
    name,
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
app.post("/login", (req, res) => {
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
    return res.status(200).json({ message: "Login successful" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port http://localhost:4000");
});
