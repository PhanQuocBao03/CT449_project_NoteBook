import { createApiClient } from "./api.service";

class UserService {
	constructor(baseUrl = "/api/users") {
		this.api = createApiClient(baseUrl, true);
	}

	async getAll() {
		return (await this.api.get("/")).data;
	}

	async findByName(name) {
		return (await this.api.get(`/?name=${name}`)).data;
	}

	async create(data) {
		return (await this.api.post("/", data)).data;
	}

	async deleteAll() {
		return (await this.api.delete("/")).data;
	}

	async findAllFlagged() {
		return (await this.api.get("/flagged")).data;
	}

	async get(id) {
		return (await this.api.get(`/${id}`)).data;
	}

	async update(id, data) {
		return (await this.api.put(`/${id}`, data)).data;
	}

	async delete(id) {
		return (await this.api.delete(`/${id}`)).data;
	}
}

export default new UserService();
