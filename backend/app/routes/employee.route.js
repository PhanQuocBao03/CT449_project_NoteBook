const express = require("express");
const { verifyToken } = require("../middlewares");
const Employee = require("../controllers/employee.controller");

const router = express.Router();

router.use(verifyToken);

router
	.route("/")
	.get(Employee.findAll)
	

// router.route("/flag").get(Employee.findAllFavorite);

router
	.route("/:id")
	.get(Employee.findOne)
	.put(Employee.update)
	.delete(Employee.delete);

module.exports = router;
