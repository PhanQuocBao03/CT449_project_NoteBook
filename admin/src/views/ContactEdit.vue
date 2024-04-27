<template>
	<div v-if="book" class="page">
		<ContactForm
			:book="book"
			@submit:book="updateBook"
			@delete:book="deleteBook"
		/>
	</div>
</template>

<script>
import { swtoast, swalert } from "@/mixins/swal.mixin";
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
import BookService from "@/services/book.service";


export default {
	components: {
		ContactForm,
	},
	props: {
		id: { type: String, required: true },
	},
	data() {
		return {
			book: null,
		};
	},
	methods: {
		async getBook(id) {
			try {
				this.book = await BookService.get(id);
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

		async updateBook(data) {
			try {
				await BookService.update(this.book._id, data);
				swtoast.success({
					text: "Sách được cập nhật thành công.",
				});
				this.$router.push({path: '/'});
			} catch (error) {
				console.log(error);
				swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
			}
		},

		async deleteBook() {
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
							await BookService.delete(this.book._id);
							swtoast.success({
								text: "Ghi Chú được xóa thành công.",
							});
							this.$router.push({ name: "contactbook" });
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
		this.getBook(this.id);
	},
};
</script>
