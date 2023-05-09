import { client } from "./index.js";
import bcrypt from "bcrypt";

export async function getBookById(id) {
  return await client.db("example").collection("books").findOne({ id: id });
}

export async function getAllBooks(req) {
  return await client
    .db("example")
    .collection("books")
    .find(req.query)
    .toArray();
}

export async function deleteBookById(id) {
  return await client
    .db("example")
    .collection("books")
    .deleteOne({ id: id });
}

export async function addBooks(newBook) {
  return await client
    .db("example")
    .collection("books")
    .insertMany(newBook);
}

export async function updateBookById(id,updatedBook) {
  return await client
    .db("example")
    .collection("books")
    .updateOne({ id: id }, { $set: updatedBook });
  }

//gen password
export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(no. of rounds)
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
}

export async function createUser(username,hashedPassword) {
  return await client
    .db("example")
    .collection("users")
    .insertOne({ username: username, password: hashedPassword });
  }

  export async function getUserByName(username) {
    return await client
      .db("example")
      .collection("users")
      .findOne({ username: username });
  }  