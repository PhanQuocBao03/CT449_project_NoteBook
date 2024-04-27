const express = require("express");
const { verifyToken } = require("../middlewares");
const BorrowingTracking = require("../controllers/borrowingTracking.controller");

const router = express.Router();

router.use(verifyToken);

router
	.route("/")
	.get(BorrowingTracking.findAll)
	.post(BorrowingTracking.create)
	// .delete(BorrowingTracking.deleteAll);

// router.route("/flag").get(BorrowingTracking.findAllFavorite);

router
	.route("/:id")
	.get(BorrowingTracking.findOne)
	.put(BorrowingTracking.update)
	.delete(BorrowingTracking.delete);

module.exports = router;
