const express = require("express");
const cors = require("cors");
const multer = require("multer");
const contactsRouter = require("./app/routes/contact.route");
const authRouter = require("./app/routes/auth.route");
const ApiError = require("./app/api-error");
const publisherRouter = require("./app/routes/publisher.route");
const bookRouter = require("./app/routes/book.route");
const userRouter = require("./app/routes/user.route");
const employeeRouter = require("./app/routes/employee.route");
const borrowTrackingRouter = require("./app/routes/borrowTracking.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);
app.use("/api/publishers", publisherRouter);
app.use("/api/books", bookRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/borrowTrackings", borrowTrackingRouter);

// handle 404 response
app.use((req, res, next) => {
	return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
	return res.status(error.statusCode || 500).json({
		message: error.message || "Internal Server Error",
	});
});

const fileFilter = (req, file, cb) => {
	const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
	if (!allowedTypes.includes(file.mimetype)) {
	  const error = new Error("Incorrect file");
	  error.code = "INCORRECT_FILETYPE";
	  return cb(error, false);
	}
	cb(null, true);
};
const upload = multer({
	dest: "./app/uploads",
	fileFilter,
	limits: {
	  fileSize: 1000000,
	},
});
// const PORT = "3000" || process.env.PORT;
app.post("/upload", upload.single("file"), (req, res) => {
	res.json({ file: req.file });
  });
  
  app.use((err, req, res, next) => {
	if (err.code === "INCORRECT_FILETYPE") {
	  res.status(422).json({ error: "Only images are allowed" });
	  return;
	}
	if (err.code === "LIMIT_FILE_SIZE") {
	  res.status(422).json({ error: "Allowed file size is 1000KB" });
	  return;
	}
});


module.exports = app;
