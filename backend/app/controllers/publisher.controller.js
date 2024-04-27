const PublisherService = require("../services/publisher.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        if (!req.body || !req.body.name || !req.body.address) {
            return res.status(400).json({ error: "Name and address are required" });
        }

        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while creating the publisher"));
    }
};

// Trong hàm findAll của file publisher.controller.js

exports.findAll = async (req, res, next) => {
    try {
        const publisherService = new PublisherService( MongoDB.client);
        const { query } = req.query;
        let documents;
        if (query) {
            documents = await publisherService.findByName(query);
        } else {
            documents = await publisherService.find({});
        }
        return res.send(documents);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while retrieving publishers"));
    }
};


exports.findOne = async (req, res, next) => {
    try {
        const publisherService = new PublisherService( MongoDB.client);
        const document = await publisherService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Publisher not found"));
        }
        return res.send(document);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Error retrieving publisher with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return next(new ApiError(400, "Data to update cannot be empty"));
        }

        const publisherService = new PublisherService(req.userId, MongoDB.client);
        const document = await publisherService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Publisher not found"));
        }
        return res.send({ message: "Publisher was updated successfully" });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Error updating publisher with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const publisherService = new PublisherService( MongoDB.client);
        const document = await publisherService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Publisher not found"));
        }
        return res.send({ message: "Publisher was deleted successfully" });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Could not delete publisher with id=${req.params.id}`));
    }
};
