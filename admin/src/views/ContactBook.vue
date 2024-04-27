<template>
	<div class="mx-auto">
		<div class="menu-search row justify-content-center">
			<InputSearch v-model="searchText" class="mt-5 text-center col-md-5 input-lg" />
		</div>
		<div class="page row justify-content-center">
			

			<div class="mt-3 text-center">
				<router-link
                    :to="{
                    name: 'contact.add',
                    }"
                >
				<h3 class="text-white rounded-pill border row bg-info" style="width: 100px;">
					<i class="fa-solid fa-plus mt-2 ps-2"></i>
					<p class="m-2" style="font-size: 22px;">Thêm</p>
				</h3>
			</router-link>
				
				<ContactList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex"   @delete:book="deleteBook" />
				<p v-else>Chưa có sách nào.</p>
			</div>
		</div>
	</div>
</template>

<script>
import { swalert } from "@/mixins/swal.mixin";
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import BookService from "@/services/book.service";


export default {
	components: {
		ContactCard,
		InputSearch,
		ContactList,
	},
	data() {
		return {
			books: [],
			activeIndex: -1,
			searchText: "",
		};
	},
	watch: {
		searchText() {
			this.activeIndex = -1;
		},
	},
	computed: {
		bookStrings() {
			return this.books.map((book) => {
				const { title,image, author, price, favorite } = book;
				return [title,image, author, price, favorite].join("");
			});
		},
		filteredBooks() {
			if (!this.searchText) return this.books;
			return this.books.filter((_book, index) =>
				this.bookStrings[index].includes(this.searchText)
			);
		},
		activeBook() {
			if (this.activeIndex < 0) return null;
			return this.filteredBooks[this.activeIndex];
		},
		filteredBooksCount() {
			return this.filteredBooks.length;
		},
	},
	methods: {
		async retrieveBooks() {
			try {
				this.books = await BookService.getAll();
				
				this.books.sort((current, next) =>
					current.title.localeCompare(next.title)
				);
			} catch (error) {
				console.log(error);
			}
		},
		
		refreshList() {
			this.retrieveBooks();
			this.activeIndex = -1;
		},

		async removeAllBooks() {
			swalert
				.fire({
					title: "Xóa tất cả sách",
					icon: "warning",
					text: "Bạn muốn xóa tất cả sách?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await BookService.deleteAll();
							this.refreshList();
						} catch (error) {
							console.log(error);
						}
					}
				});
		},

		async deleteBook(id) {
			swalert
				.fire({
					title: "Xác nhận xóa sách này",
					icon: "warning",
					text: "Xác nhận xóa sách này?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await BookService.delete(id);
							this.refreshList();
						} catch (error) {
							console.log(error);
						}
					}
				});
		},

		goToAddBook() {
			this.$router.push({ name: "book.add" });
		},
	},
	created() {
		this.refreshList();
	},
};
</script>

<style scoped>
.page {
	text-align: left;
	margin-top: 20px;
}

.menu-search {
	max-width: 100%;
	margin-bottom: 20px;
}

/* .menu {
	width: 100%;
}

.tools {
	width: 600px;
}

.btn {
	margin: 0px 10px;
	min-width: 90px;
}
.mt-3 h4 i {
	margin-left: 4px;
} */
</style>
