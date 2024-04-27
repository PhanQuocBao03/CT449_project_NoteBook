<template>
	<div class="page" style="background-color: rgb(2, 2, 48);">
		<div >
			<h4 class="title-add-note  text-white p-5">Thêm Sách</h4>
			<hr>
			<ContactForm :book="{}" :resetAfterSubmit="false" @submit:book="saveBook" />
		</div>
	</div>
</template>

<script>
import { swtoast } from "@/mixins/swal.mixin";
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
import BookService from "@/services/book.service";

export default {
	components: {
		ContactForm,
	},
	methods: {
		async saveBook(data) {
			try {
				await BookService.create(data);
				swtoast.success({
					text: "Sách được thêm thành công.",
				});
				this.$router.push({ path: '/' });
			} catch (error) {
				console.log(error);
				swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
			}
		},
	},
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
