const { ObjectId } = require("mongodb");

class PublisherService {
    constructor(client) {
        this.Publisher =client.db().collection("publishers");
    }

    extractPublisherData(payload) {
        const publisher = {
            name: payload.name,
            address: payload.address
        
        };
        Object.keys(publisher).forEach(
            (key) => publisher[key] === undefined && delete publisher[key]
        );
        return publisher;
    }

    async create(payload) {
        try {
            const publisher = this.extractPublisherData(payload);
            const existingPublisher = await this.Publisher.findOne({ name: publisher.name });
            if (existingPublisher) {
                const filter = { _id: existingPublisher._id };
                const updateDoc = { $set: publisher };
                await this.Publisher.updateOne(filter, updateDoc);
                return existingPublisher;
            } else {
                const result = await this.Publisher.insertOne(publisher);
                if (result && result.ops && result.ops.length > 0) {
                    return result.ops[0];
                } else {
                    throw new Error("Failed to create publisher");
                }
            }
        } catch (error) {
            console.error("Error creating publisher:", error);
            throw error; 
        }
    }
    

    async find(filter) {
        const cursor = await this.Publisher.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Publisher.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = { _id: ObjectId(id) ? new ObjectId(id) : null };
        const updateDoc = { $set: { ...payload } };
        await this.Publisher.updateOne(filter, updateDoc);
        return await this.findById(id);
    }

    async delete(id) {
        const filter = { _id: ObjectId(id) };
        const result = await this.Publisher.deleteOne(filter);
        return result.deletedCount;
    }

    // Thêm các phương thức khác cần thiết

}

module.exports = PublisherService;
