<script>
import { swtoast } from "@/mixins/swal.mixin";
import BorrowService from "@/services/borrow.service";
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from "yup";
import { useAuthStore } from "@/stores/authStore"; // Import your auth store

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:borrow"],
  props: {
    bookId: { type: String, required: true },
  },
  setup() {
    const authStore = useAuthStore(); // Access your auth store
    const borrowFormSchema = yup.object().shape({
      returnDate: yup.string().required("Vui lòng chọn ngày trả."),
      borrowDate: yup.string().required("Vui lòng chọn ngày mượn."),
    });

    return {
      borrowFormSchema,
      authStore,
    };
  },
  data() {
    return {
      borrowLocal: {
        bookId: this.bookId,
        userId: "", // Will be filled in mounted hook
        borrowDate: "", // Initialize borrowDate here if needed
        returnDate: "", // Initialize returnDate here if needed
      },
      errors: {},
    };
  },
  mounted() {
    this.borrowLocal.userId = this.authStore.currentUser.id; // Get userId from auth store
  },
  methods: {
    async submitBorrow() {
      try {
        await this.$refs.bookForm.validate();
        this.$emit("submit:borrow", { ...this.borrowLocal });
        this.$refs.bookForm.resetForm();
      } catch (err) {
        this.errors = err.errors;
        console.error(err);
      }
    },
    async saveBorrow(data) {
      try {
        await BorrowService.create(data);
        swtoast.success({
          text: "Sách được thêm thành công.",
        });
        this.$router.push({ path: '/' });
      } catch (error) {
        console.error(error);
        swtoast.error({
          text: "Đã có lỗi xảy ra.",
        });
      }
    },
  },
};
</script>
