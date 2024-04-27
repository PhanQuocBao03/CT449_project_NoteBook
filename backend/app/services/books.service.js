const { ObjectId } = require("mongodb");

class BookService {
    constructor(client) {
        this.Book = client.db().collection("books");
    }
    extractBookData(payload) {
        
        const book = {
            title: payload.title,
            price: payload.price,
            quantity: payload.quantity,
            yearPublished: payload.yearPublished,
            // publisherId: ObjectId(payload.publisherId),
            favorite: payload.favorite,
            image: payload.image,
            publisher:payload.publisher,
            address:payload.address,
            description:payload.description,
            author: payload.author
        };
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }
    async create(payload) {
        const book = this.extractBookData(payload);
        const result = await this.Book.findOneAndUpdate(
            book,
            { $set: { favorite: book.favorite === true } },
            { returnDocument: "after", upsert: true }
        )
        return result.value;
    }
    
    
   

    async find(filter) {
		const cursor = await this.Book.find({
			...filter,
			
		});
		return await cursor.toArray();
	}

	async findFavorite() {
		return await this.find({
			favorite: true,
			
		});
	}

	async findByName(title) {
		return await this.find({
            title: { $regex: new RegExp(title), $options: "i" },
			
		});
	}

	async findById(id) {
		return await this.Book.findOne({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
			ownerId: this.ownerId,
		});
	}

    

    async update(id, payload) {
		const { _id, ...update } = payload;
		const filter = { _id: ObjectId(id) ? new ObjectId(id) : null };
		const updateDoc = { $set: { ...update } }; // Sử dụng biến 'update' thay vì 'payload'
		await this.Book.updateOne(filter, updateDoc);
		return await this.findById(id);
	}

    async delete(id) {
        const filter = { _id: ObjectId(id) ? new ObjectId(id) : null, };
        const result = await this.Book.deleteOne(filter);
        return result.deletedCount;
    }

    // Add other methods as needed
}

module.exports = BookService;
