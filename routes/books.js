import { getBookById, getAllBooks, deleteBookById, addBooks ,updateBookById} from "../helper.js";
import express from "express";
import { auth } from "../middleware/auth.js";
const router = express.Router();


router.get("/:id",async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const book = await getBookById(id);
  res.send(book);
});

router.get("/",async (req, res) => {
  console.log(req.query);
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const book = await getAllBooks(req);
  res.send(book);
});
//delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const book = await deleteBookById(id);
  res.send(book);
});
//Add books
//inbuild middleware
//say data is in json
router.post("/", async (req, res) => {
  const newBook = req.body;
  console.log(newBook);
  const result = await addBooks(newBook);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const updatedBook = req.body;
  console.log(updatedBook);
  const result = await updateBookById(id, updatedBook);
  res.send(result);
});

export const booksRouter = router;
