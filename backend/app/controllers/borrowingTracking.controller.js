const BorrowingTrackingService = require("../services/borrowingtracking.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Create a new borrowing tracking record
exports.create = async (req, res, next) => {
    try {
        // Kiểm tra xem req.body có tồn tại và các trường bắt buộc không
        if (!req.body) {
            return res.status(400).json({ error: "ReaderId, BookId, and BorrowDate are required" });
        }

        // Kiểm tra tính hợp lệ của ngày mượn
        const borrowDate = new Date(req.body.borrowDate);
        if (borrowDate < new Date()) {
            return res.status(400).json({ error: "BorrowDate must be a date in the present or future" });
        }


        // Kiểm tra tính hợp lệ của ngày hẹn trả (nếu có)
        if (req.body.returnDate) {
            const returnDate = new Date(req.body.returnDate);
            if (returnDate <= borrowDate) {
                return res.status(400).json({ error: "Ngày trả phải sau ngày mượn" });
            }
            // Các kiểm tra bổ sung dựa trên yêu cầu của hệ thống của bạn
        }

        // Kiểm tra số lượng sách có sẵn
        // if (book.quantityAvailable <= 0) {
        //     return res.status(400).json({ error: "The book is not available for borrowing" });
        // }
        const borrowingTrackingService = new BorrowingTrackingService(MongoDB.client);
        const userId = req.body.userId

        const previousBorrowings = await borrowingTrackingService.findByUserId({userId });
        if (previousBorrowings.length > 0) {
            return res.status(400).json({ error: "User has unreturned books" });
        }

        // // Kiểm tra số lượng sách mượn không quá 3 cuốn
        // const currentBorrowings = await borrowingTrackingService.findByUserId({ userId}).countDocuments();
        // if (currentBorrowings >= 3) {
        //     return res.status(400).json({ error: "User has borrowed the maximum number of books" });
        // }

        // Cập nhật trạng thái của sách
        // book.quantityAvailable--; // Giảm số lượng sách có sẵn
        // await book.save();

        // Tạo một bản ghi mới trong bảng BorrowingTracking
        const document = await borrowingTrackingService.create(req.body);
        
        // Trả về kết quả thành công
        return res.status(201).json(document);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while creating the borrowing tracking record"));
    }
};


// Retrieve all borrowing tracking records
exports.findAll = async (req, res, next) => {
    try {
        const borrowingTrackingService = new BorrowingTrackingService(MongoDB.client);
        const documents = await borrowingTrackingService.find({});
        return res.status(200).json(documents);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while retrieving borrowing tracking records"));
    }
};

// Find a single borrowing tracking record by id
exports.findOne = async (req, res, next) => {
    try {
        const borrowingTrackingService = new BorrowingTrackingService(MongoDB.client);
        const document = await borrowingTrackingService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Borrowing tracking record not found"));
        }
        return res.status(200).json(document);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Error retrieving borrowing tracking record with id=${req.params.id}`));
    }
};

// Update a borrowing tracking record by id
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const borrowingTrackingService = new BorrowingTrackingService(MongoDB.client);
        const document = await borrowingTrackingService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Borrowing tracking record not found"));
        }
        return res.status(200).json({ message: "Borrowing tracking record was updated successfully" });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Error updating borrowing tracking record with id=${req.params.id}`));
    }
};

// Delete a borrowing tracking record by id
exports.delete = async (req, res, next) => {
    try {
        const borrowingTrackingService = new BorrowingTrackingService(MongoDB.client);
        const deletedCount = await borrowingTrackingService.delete(req.params.id);
        if (deletedCount === 0) {
            return next(new ApiError(404, "Borrowing tracking record not found"));
        }
        return res.status(200).json({ message: "Borrowing tracking record was deleted successfully" });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Could not delete borrowing tracking record with id=${req.params.id}`));
    }
};
