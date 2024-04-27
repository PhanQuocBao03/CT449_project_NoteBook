<template>
	<div class="add-book mx-auto border border-color-white" style="width: 30%;">
	  <Form ref="bookForm" @submit="submitBook" :validation-schema="bookFormSchema" class="p-5 pb-2">
		<div class="form-group text-left align-self-center">
		  <label class="text-white mb-3" for="title"><b>Tiêu đề:</b></label>
		  <Field name="title" type="text" class="form-control" v-model="bookLocal.title" />
		  <ErrorMessage name="title" class="error-feedback" />
		</div>
		
		<div class="form-group text-left align-self-center">
		  <label class="text-white mb-3" for="author"><b>Tác giả</b></label>
		  <Field name="author" type="text" class="form-control" v-model="bookLocal.author" />
		  <ErrorMessage name="author" class="error-feedback" />
		</div>
	
		<div class="form-group text-left align-self-center">
		  <label class="text-white mb-3" for="publisher"><b>Nhà suất bản</b></label>
		  <Field name="publisher" type="text" class="form-control" v-model="bookLocal.publisher" />
		  <ErrorMessage name="publisher" class="error-feedback" />
		</div>
		
		<div class="form-group text-left align-self-center">
		  <label class="text-white mb-3" for="yearPublished"><b>Năm</b></label>
		  <Field name="yearPublished" type="text" class="form-control" v-model="bookLocal.yearPublished" />
		  <ErrorMessage name="yearPublished" class="error-feedback" />
		</div>
		<!-- <div class="form-group text-left align-self-center">
		  <label class="text-white mb-3" for="address"><b>Năm xuất bản</b></label>
		  <Field name="address" type="text" class="form-control" v-model="bookLocal.address" />
		  <ErrorMessage name="address" class="error-feedback" />
		</div> -->
	
		<div class="form-group text-left align-self-center">
		  <label class="text-white mb-3" for="quantity"><b>Số lượng</b></label>
		  <Field name="quantity" type="number" class="form-control" v-model="bookLocal.quantity" />
		  <ErrorMessage name="quantity" class="error-feedback" />
		</div>
	
		<!-- Description field -->
		<div class="form-group text-left align-self-center">
		  <label class="text-white mb-3" for="description"><b>Giới thiệu tác phẩm</b></label>
		  <Field name="description" as="textarea" class="form-control" v-model="bookLocal.description" />
		  <ErrorMessage name="description" class="error-feedback" />
		</div>
	
		<div class="form-group text-left align-self-center">
		  <label class="text-white mb-3" for="image"><b>Hình</b></label>
		  <Field name="image" type="text" class="form-control" v-model="bookLocal.image" />
		  <ErrorMessage name="image" class="error-feedback" />
		</div>
	
		<div class="form-group text-left align-self-center m-3 mb-5">
		  <button class="btn btn-success" @click="submitBook">
			<i class="fas fa-save"></i> Lưu
		  </button>
		</div>
	  </Form>
	</div>
  </template>
  
  <script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  
  export default {
	components: {
	  Form,
	  Field,
	  ErrorMessage,
	},
	emits: ["submit:book"],
	props: {
	  book: { type: Object, default: () => ({}) },
	},
	data() {
	  const bookFormSchema = yup.object().shape({
		title: yup
		  .string()
		  .required("Title is required")
		  .max(50, "Title cannot exceed 50 characters"),
		author: yup
		  .string()
		  .required("Author is required")
		  .max(50, "Author cannot exceed 50 characters"),
		publisher: yup
		  .string()
		  .required("Publisher is required")
		  .max(50, "Publisher cannot exceed 50 characters"),
		address: yup.string().required("Address is required"),
		quantity: yup
		  .number()
		  .required("Quantity is required")
		  .min(0, "Quantity cannot be negative"),
		description: yup.string(),
		image: yup.string(),
	  });
	  return {
		bookLocal: { ...this.book },
		bookFormSchema,
	  };
	},
	methods: {
	  submitBook() {
		this.$emit("submit:book", this.bookLocal);
		this.$refs.bookForm.resetForm();
	  },
	},
  };
  </script>
  
  <style scoped>
  @import "@/assets/form.css";
  </style>
  