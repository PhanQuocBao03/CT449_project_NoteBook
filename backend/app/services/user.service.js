const { ObjectId } = require("mongodb");

class UserService {
	constructor(client) {
		this.User = client.db().collection("users");
	}
	extractUserData(payload) {
        const user = {
			username: payload.username,
			email:payload.email,
			password: payload.password,
            lastName: payload.lastName,
            firstName: payload.firstName,
            date: payload.date,
            gender: payload.gender,
            address: payload.address,
            phone: payload.phoneNumber,
			image:payload.image,
			role:payload.role
        };
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return book;
    }

	async create(payload) {
		const result = await this.User.findOneAndUpdate(
			payload,
			{ $set: payload },
			{ returnDocument: "after", upsert: true }
		);
		const { password, ...user } = result.value;
		return user;
	}
	async find(filter) {
		const cursor = await this.User.find({
			...filter,
			
		});
		return await cursor.toArray();
	}

	async findOne(filter) {
        return await this.User.findOne(filter);
    }
	async findById(id) {
		return await this.User.findOne({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
	}
	async update(id, payload) {
		const { _id, ...update } = payload;
		const filter = { _id: ObjectId(id) ? new ObjectId(id) : null };
		const updateDoc = { $set: { ...update } }; // Sử dụng biến 'update' thay vì 'payload'
		await this.User.updateOne(filter, updateDoc);
		return await this.findById(id);
	}
	
	async findByName(name) {
		return await this.find({
			$or: [
				{ firstName: { $regex: new RegExp(name), $options: "i" } },
				{ lastName: { $regex: new RegExp(name), $options: "i" } }
			]
		});
	}
	async delete(id) {
        const filter = { _id: ObjectId(id) };
        const result = await this.User.deleteOne(filter);
        return result.deletedCount;
    }
	
}

module.exports = UserService;
