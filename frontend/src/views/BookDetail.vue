<template>
    <div class="bg-white">

        <div class="book-details-container mx-auto ">
            <div class="d-flex m-5 justify-content-between">
                
                <div class="image-container col-4">
                    <img :src="book ? book.image : ''" alt="Book cover">
                </div>
            <div class="text-left book-info">

            <h3 class="mb-3">{{ book ? book.title : "Loading..." }}</h3>
            <p class="h6 mb-3"><span class="text-secondary">Tác giả:</span> {{ book ? book.author : "Loading..." }}</p>
            <p class="h6 mb-3"><span class="text-secondary">Năm:</span> {{ book ? book.yearPublished : "Loading..." }}</p>
            <p class="h6 mb-3"><span class="text-secondary">Số lượng:</span> {{ book ? book.quantity : "Loading..." }}</p>
            <p class="h6 mb-3"><span class="text-secondary">Giá tiền:</span> {{ book ? book.price : "Loading..." }}</p>
            <div class="d-flex justify-content-start align-items-center  mb-3">
                <div class="row">
                    
                    <button class="btn btn-link" @click.stop="toggleFavorite(book)">
                        <i v-if="book.favorite" class="fas fa-heart text-danger" style="font-size: 24px"></i>
                        <i v-else class="far fa-heart h4" style="color: orangered; font-size: 24px"></i>
                    </button>
                    <div class="quantity-container">
                        <button @click="decrementQuantity" class="iconQuantity text-">-</button>
                        <span>{{ quantity }} </span>
                        <button @click="incrementQuantity" class="iconQuantity">+</button>
                    </div>
                    <button class="btn btn-link rounded rounded-full" @click.stop="addToCart(book)">
                        <i class="fas fa-shopping-cart text-success h4"></i>
                    </button>
                </div>
            </div>
            <div class="text-left"><h4>Giới thiệu tác phẩm:</h4> <p class="conten-description">{{ book ? book.description : "Loading..." }}</p></div>
        </div>

        </div>
    </div>
</div>
</template>

<script>
import bookService from "@/services/book.service";

export default {
    data() {
        return {
            book: null,
            quantity:1
        };
    },
    created() {
        const bookId = this.$route.params.id; // Nhận ID của sách từ params
        console.log("Book ID:", bookId); // Kiểm tra xem ID sách có đúng không
        // Gửi yêu cầu API hoặc tìm sách trong dữ liệu của bạn bằng ID
        bookService.get(bookId)
            .then(response => {
                console.log("Book details:", response); // Hiển thị thông tin sách nhận được từ API
                this.book = response; // Gán thông tin sách vào biến book
            })
            .catch(error => {
                console.error('Error fetching book details:', error); // Hiển thị lỗi nếu có
            });
    },
    methods: {
        incrementQuantity() {
            this.quantity++;
        },
        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        toggleFavorite() {
            if (this.book) {
                this.book.favorite = !this.book.favorite;
            }
        },
        addToCart() {
            // Xử lý logic khi thêm vào giỏ hàng
        }
    }
};
</script>

<style scoped>
.book-details-container {
    text-align: center;
    background-color: aliceblue;
    /* width: 40%; */
    display: flex;
    justify-content: center;
}

.image-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.image-container img {
    width: 100%;
    height: auto;
}
.quantity-container {
    display: flex;
    align-items: center;
    border-radius: 20%;
    border: 2px #2c2a2ab7 solid;
}

.iconQuantity{
    margin: 0 5px;

    font-size: 22px;
    border: none;
    background-color: aliceblue;


}
.conten-description{
    text-align: justify;
    /* padding:0 25px 0 25px ; */
}
.book-info{
    margin-left: 15px;
}
.book-info p{
    font-size: 18px;
    /* line-height: 2px; */
}
</style>
