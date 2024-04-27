<template>
	<ul class="d-flex justify-content-center">
    <li class="list-group-item rounded mx-2" v-for="(book, index) in books" :key="book._id">
      <router-link :to="{ name: 'bookDetail', params: { id: book._id } }">
        <div>
          <img :src="book.image" alt="" class="book-image">
          <h6 class="title" style="width: 180px;">{{ book.title }}</h6>
        </div>
      </router-link>
		<p class="content">Tác giả: {{ book.author }}</p>
		<div class="d-flex justify-content-between align-items-center">
		  <button class="btn btn-link" @click.stop="toggleFavorite(book)">
			<i v-if="book.favorite" class="fas fa-heart text-danger" style="font-size: 24px"></i>
			<i v-else class="far fa-heart h4" style="color: orangered; font-size: 24px"></i>
		  </button>

      <router-link
                    :to="{
                    name: 'borrow',
                    params: { bookId: book._id },
                    }"
                >
		  
		  <button class="btn btn-link rounded rounded-full">
			Mượn
		  </button>
    </router-link>
		</div>
	  </li>
	</ul>
  </template>
  
  <script>
import BookService from "@/services/book.service";

export default {
  props: {
    books: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    async toggleFavorite(book) {
  try {
    const response = await BookService.update(book._id, { favorite: !book.favorite });
    book.favorite = !book.favorite;
  } catch (error) {
    console.error("Có lỗi xảy ra khi gửi yêu cầu cập nhật:", error);
  }
},
    addToCart(book) {
      // Xử lý thêm sách vào giỏ hàng
      console.log("Thêm sách vào giỏ hàng:", book);
    },
    navigateToBookDetail(bookId) {
      // Chuyển hướng đến trang chi tiết sách khi người dùng nhấp vào sách
      this.$router.push({ name: "bookDetail", params: { id: bookId } });
    },
  },
};
</script>
  <style>
  .book-image {
	max-width: 100%;
	max-height: 150px;
	object-fit: contain;
  }
  .list-group-item {
	background-color: #fff;
	height: auto;
	width: auto;
	box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
	transition: background-color 0.3s ease;
  }
  .list-group-item.active {
	background-color: #f4f6f7;
  }
  .list-group {
	margin-top: 16px;
	width: auto;
	max-width: 1200px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	grid-column-gap: 1em;
	grid-row-gap: 2em;
	flex-wrap: wrap;
  }
  .title {
	margin: 0;
  }
  .content {
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	word-wrap: break-word;
	white-space: normal;
	overflow: hidden;
	display: -webkit-box;
  }
  </style>
  