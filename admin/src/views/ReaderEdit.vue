<template>
	<div v-if="user" class="page">
		<UserForm
			:user="user"
			@submit:user="updateUser"
			@delete:user="deleteUser"
		/>
	</div>
</template>

<script>
import { swtoast, swalert } from "@/mixins/swal.mixin";
import UserForm from "@/components/userForm.vue";
import UserService from "@/services/user.service";
// import BookService from "@/services/book.service";


export default {
	components: {
		UserForm,
	},
	props: {
		id: { type: String, required: true },
	},
	data() {
		return {
			user: null,
		};
	},
	methods: {
		async getUser(id) {
			try {
				this.user = await UserService.get(id);
			} catch (error) {
				console.log(error);
				this.$router.push({
					name: "notfound",
					params: { pathMatch: this.$route.path.split("/").slice(1) },
					query: this.$route.query,
					hash: this.$route.hash,
				});
			}
		},

		async updateUser(data) {
			try {
				await UserService.update(this.user._id, data);
				swtoast.success({
					text: "Đọc giả được cập nhật thành công.",
				});
				this.$router.push({path: '/reader'});
			} catch (error) {
				console.log(error);
				swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
			}
		},

		async deleteUser() {
			swalert
				.fire({
					title: "Xóa Ghi Chú",
					icon: "warning",
					text: "Bạn muốn xóa Ghi chú này?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await UserService.delete(this.user._id);
							swtoast.success({
								text: "Ghi Chú được xóa thành công.",
							});
							this.$router.push({ name: "reader" });
						} catch (error) {
							console.log(error);
							swtoast.error({
								text: "Đã có lỗi xảy ra.",
							});
						}
					}
				});
		},
	},
	created() {
		this.getUser(this.id);
	},
};
</script>
