const express = require("express");
const { verifyToken } = require("../middlewares");
const User = require("../controllers/user.controller");

const router = express.Router();

router.use(verifyToken);

router
	.route("/")
	.get(User.findAll)
	

// router.route("/flag").get(User.findAllFavorite);

router
	.route("/:id")
	.get(User.findOne)
	.put(User.update)
	.delete(User.delete);

module.exports = router;
