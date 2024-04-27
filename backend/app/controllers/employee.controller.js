const EmployeeService = require("../services/employee.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { query } = require("express");


exports.findAll = async (req, res, next) => {
    try {
        const employee = new EmployeeService(MongoDB.client);
        const { query } = req.query;
        let documents;
        if (query) {
            documents = await employee.findByName(query);
        } else {
            documents = await employee.find({});
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
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.findById(req.params.id);
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
        const employee = new EmployeeService(MongoDB.client);
        const document = await employee.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "employee not found"));
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
        const employee = new EmployeeService(MongoDB.client);
        const deletedCount = await employee.delete(req.params.id);
        if (deletedCount === 0) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send({ message: "Book was deleted successfully" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Could not delete book with id=${req.params.id}`));
    }
};
