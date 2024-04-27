const BookService = require("../services/books.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { query } = require("express");

// Create and Save a new Book
exports.create = async (req, res, next) => {
    if (!req.body || !req.body.title) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const existingBook = await bookService.findByName(req.body.title);
        if (existingBook.length > 0) {
            const updatedBook = await bookService.update(existingBook[0]._id, { quantity: existingBook[0].quantity + 1 });
            return res.send(updatedBook);

        } else {
            // Nếu sách chưa tồn tại, thêm mới vào cơ sở dữ liệu
            const newBook = await bookService.create(req.body);
            return res.send(newBook);
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while creating the book"));
    }
};


// Retrieve all books or by title
exports.findAll = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const { query } = req.query;
        let documents;
        if (query) {
            documents = await bookService.findByName(query);
        } else {
            documents = await bookService.find({});
        }
        return res.send(documents);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while retrieving books"));
    }
};

// Find a single book by id
exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving book with id=${req.params.id}`));
    }
};

// Update a book by id
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send({ message: "Book was updated successfully" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error updating book with id=${req.params.id}`));
    }
};

// Delete a book by id
exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const deletedCount = await bookService.delete(req.params.id);
        if (deletedCount === 0) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send({ message: "Book was deleted successfully" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Could not delete book with id=${req.params.id}`));
    }
};
