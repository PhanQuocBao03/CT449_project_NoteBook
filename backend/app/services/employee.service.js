const { ObjectId } = require("mongodb");

class EmployeeService {
    constructor(client) {
        this.Employee = client.db().collection("employees");
    }
    extractEmployeeData(payload) {
        const employee = {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            fullName: payload.fullName,
            position: payload.position,
            address: payload.address,
            phone: payload.phone,
            role:payload.role
        };
        Object.keys(employee).forEach(
            (key) => employee[key] === undefined && delete employee[key]
        );
        return employee;
    }

    async create(payload) {
        const result = await this.Employee.findOneAndUpdate(
			payload,
			{ $set: payload },
			{ returnDocument: "after", upsert: true }
		);
		const { password, ...employee } = result.value;
		return employee;
    }
    async find(filter) {
		const cursor = await this.Employee.find(filter,{ projection: { password: 0 }});
		return await cursor.toArray();
	}
    async findOne(filter) {
        return await this.Employee.findOne(filter);
    }

    async findById(id) {
        return await this.Employee.findOne({ _id: ObjectId(id) },{ projection: { password: 0 }});
    }
    async findByName(name) {
		return await this.find({
			$or: [
				{ fullName: { $regex: new RegExp(name), $options: "i" } },
				{ phone: { $regex: new RegExp(name), $options: "i" } }
			]
		},{ projection: { password: 0 }});
	}

    async update(id, payload) {
        const filter = { _id: ObjectId(id) };
        const updateDoc = { $set: { ...payload } };
        await this.Employee.updateOne(filter, updateDoc);
        return await this.findById(id);
    }

    async delete(id) {
        const filter = { _id: ObjectId(id) };
        const result = await this.Employee.deleteOne(filter);
        return result.deletedCount;
    }

    // Add other methods as needed
}

module.exports = EmployeeService;
