const express = require("express");
const { verifyToken } = require("../middlewares");
const Book = require("../controllers/book.controller");

const router = express.Router();

router.use(verifyToken);

router
	.route("/")
	.get(Book.findAll)
	.post(Book.create)
	// .delete(Book.deleteAll);

// router.route("/flag").get(Book.findAllFavorite);

router
	.route("/:id")
	.get(Book.findOne)
	.put(Book.update)
	.delete(Book.delete);

module.exports = router;
