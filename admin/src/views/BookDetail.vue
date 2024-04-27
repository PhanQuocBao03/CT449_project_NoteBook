<template>
    <div class="book-detail">
      <h2>{{ book.title }}</h2>
      <div>
        <img :src="book.image" alt="Book cover" class="book-cover" />
      </div>
      <p><strong>Tác giả:</strong> {{ book.author }}</p>
      <p><strong>Giá tiền:</strong> {{ book.price }}</p>
      <p><strong>Mô tả:</strong> {{ book.description }}</p>
      <button @click="addToCart">Thêm vào giỏ hàng</button>
    </div>
  </template>
  
  <script>
  import BookService from "@/services/book.service";
  
  export default {
    data() {
      return {
        book: {}
      };
    },
    methods: {
      async fetchBookDetails() {
        const bookId = this.$route.params.id;
        try {
          this.book = await BookService.get(bookId);
        } catch (error) {
          console.error("Error fetching book details:", error);
        }
      },
      addToCart() {
        // Xử lý logic khi thêm sách vào giỏ hàng
        console.log("Add book to cart:", this.book);
      }
    },
    created() {
      this.fetchBookDetails();
    }
  };
  </script>
  
  <style scoped>
  .book-detail {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .book-cover {
    max-width: 300px;
    height: auto;
  }
  </style>
  