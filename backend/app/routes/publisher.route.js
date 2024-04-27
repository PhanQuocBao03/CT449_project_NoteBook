const express = require("express");
const { verifyToken } = require("../middlewares");
const Publisher = require("../controllers/publisher.controller");

const router = express.Router();

router.use(verifyToken);

router
	.route("/")
	.get(Publisher.findAll)
	.post(Publisher.create)
	// .delete(Publisher.deleteAll);

// router.route("/flag").get(Publisher.findAllFavorite);

router
	.route("/:id")
	.get(Publisher.findOne)
	.put(Publisher.update)
	.delete(Publisher.delete);

module.exports = router;
