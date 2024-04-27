const { ObjectId } = require("mongodb");
const UserService = require("./user.service");
const BookService = require("./books.service");


class BorrowingTrackingService {
    constructor(client) {
        this.BorrowingTracking = client.db().collection("borrowingtracking");
        this.userService = new UserService(client);
        this.bookService = new BookService(client);
    }

    async extractBorrowingTrackingData(payload) {
        const borrowingTracking = {
            borrowDate: payload.borrowDate,
            returnDate: payload.returnDate
        };
    
        // Lấy thông tin người dùng từ UserService
        const user = await this.userService.findById(payload.userId);
        if (user) {
            borrowingTracking.user = {
                _id:  ObjectId(user._id),
                name: user.lastName +" "+ user.firstName,
                phone: user.phone
            };
        }
    
        // Lấy thông tin sách từ BookService
        const book = await this.bookService.findById(payload.bookId);
        if (book) {
            borrowingTracking.book = {
                id: book._id,
                title: book.title
            };
        }
    
        Object.keys(borrowingTracking).forEach(
            (key) => borrowingTracking[key] === undefined && delete borrowingTracking[key]
        );
        return borrowingTracking;
    }
    async create(payload) {
        const borrowingTracking = await this.extractBorrowingTrackingData(payload);
        const result = await this.BorrowingTracking.findOneAndUpdate(
            borrowingTracking,
            { $setOnInsert: borrowingTracking },
            { returnDocument: "after", upsert: true }
        )
        return result.value;
    }
    // Các phương thức khác
    async find(filter) {
		const cursor = await this.BorrowingTracking.find(filter);
		return await cursor.toArray();
	}
    async findByName(name) {
        return await this.book.find({
           name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findOne(filter) {
        return await this.BorrowingTracking.findOne(filter);
    }

    

    async findById(id) {
        return await this.BorrowingTracking.findOne({ _id: ObjectId(id) });
    }
    async findByUserId(userId) {
        const borrowingRecord = await this.BorrowingTracking.findOne({ userid: ObjectId(userId) });
        if (borrowingRecord) {
          return borrowingRecord.user._id; // Extract _id from the user object
        } else {
          return null; // Handle the case when no record is found
        }
      }


    async update(id, payload) {
        const filter = { _id: ObjectId(id) };
        const updateDoc = { $set: { ...payload } };
        await this.BorrowingTracking.updateOne(filter, updateDoc);
        return await this.findById(id);
    }

    async delete(id) {
        const filter = { _id: ObjectId(id) };
        const result = await this.BorrowingTracking.deleteOne(filter);
        return result.deletedCount;
    }

    // Add other methods as needed
}

module.exports = BorrowingTrackingService;
