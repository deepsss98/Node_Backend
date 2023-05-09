import express from "express";
import { genPassword ,createUser, getUserByName } from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    console.log(username,password);
    //validate user
  const isUserExist = await getUserByName(username);
  console.log(isUserExist);
  
  if (isUserExist) {
    res.status(404).send({ message: "Username Already Taken" });
    return;
  }
  if (
    !/^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[#!@%&]).{8,}$/g.test(password)
  ) {
    res.status(404).send({ message: "Password pattern does not match" });
    return;
  }

    const hashedPassword = await genPassword(password);
    const result = await createUser(username, hashedPassword);
    res.send(result);
  });

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    //validate user
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);
    if (!userFromDB) {
      res.status(404).send({ message: "Invalid Credentials" });
      return;
    }
    const storedDbPassword = userFromDB.password;
    //match password
    const isPasswordMatch = await bcrypt.compare(password, storedDbPassword);
    if (!isPasswordMatch) {
      res.status(404).send({ message: "Invalid Credentials" });
      return;
    }
    const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
    res.send({ message: "Successfull Login", token: token });
  });

export const usersRouter = router;
