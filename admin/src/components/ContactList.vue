<template>
	<div>
	  <table class="table bg-white">
		<thead>
		  <tr>
			<th scope="col">Tên sách</th>
			<th scope="col">Tác giả</th>
			<th scope="col">NXB</th>
			<th scope="col">Số lượng</th>
			<th scope="col">Năm</th>
			<th scope="col">Thao tác</th>
		  </tr>
		</thead>
		<tbody>
		  <tr v-for="(book, index) in paginatedBooks" :key="book._id">
			<td>
			  <div class="d-flex align-items-center">
				<img :src="book.image" alt="" class="book-image mr-2">
				<span>{{ book.title }}</span>
			  </div>
			</td>
			<td>{{ book.author }}</td>
			<td>{{ book.publisher }}</td>
			<td>{{ book.quantity }}</td>
			<td>{{ book.yearPublished }}</td>
			<td>
				<router-link
                    :to="{
                    name: 'contact.edit',
                    params: { id: book._id },
                    }"
                >
			  <button class="btn btn-link" >
				<i class="fas fa-edit text-primary" style="font-size: 20px;"></i>
			  </button>
			</router-link>
			  <button class="btn btn-link" @click="deleteBook(book)">
				<i class="fas fa-trash-alt text-danger" style="font-size: 20px;"></i>
			  </button>
			</td>
		  </tr>
		</tbody>
	  </table>
	  
	  <!-- Pagination controls -->
	  <nav aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
		  <li class="page-item" :class="{ disabled: currentPage === 1 }">
			<button class="page-link" @click="prevPage" :disabled="currentPage === 1"><i class="fa-solid fa-chevron-left"></i></button>
		  </li>
		  <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
			<button class="page-link" @click="gotoPage(page)">{{ page }}</button>
		  </li>
		  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
			<button class="page-link" @click="nextPage" :disabled="currentPage === totalPages"><i class="fa-solid fa-chevron-right"></i></button>
		  </li>
		</ul>
	  </nav>
	</div>
  </template>
  
  <script>
import { swalert } from "@/mixins/swal.mixin";
import BookService from "@/services/book.service";


  import PublisherService from "@/services/publisher.service";
  
  export default {
	props: {
	  books: { type: Array, default: () => [] },
	},
	data() {
	  return {
		publisherNames: {}, // Store resolved publisher names here
		currentPage: 1,
		pageSize: 6, // Adjust as needed
	  };
	},
	computed: {
	  totalPages() {
		return Math.ceil(this.books.length / this.pageSize);
	  },
	  paginatedBooks() {
		const startIndex = (this.currentPage - 1) * this.pageSize;
		const endIndex = startIndex + this.pageSize;
		return this.books.slice(startIndex, endIndex);
	  },
	},
	
	methods: {
	  
	  toggleFavorite(book) {
		book.favorite = !book.favorite;
	  },
	  addToCart(book) {
		console.log("Add book to cart:", book);
	  },
	  
	async  deleteBook(book) {
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
							await BookService.delete(book._id);
							this.refreshList();
						} catch (error) {
							console.log(error);
						}
					}
				});
	  },
	  prevPage() {
		if (this.currentPage > 1) {
		  this.currentPage--;
		}
	  },
	  nextPage() {
		if (this.currentPage < this.totalPages) {
		  this.currentPage++;
		}
	  },
	  gotoPage(page) {
		this.currentPage = page;
	  },
	},
  };
  </script>
  
  <style>
  .book-image {
	max-width: 50px;
	max-height: 70px;
	object-fit: cover;
  }
  </style>
  