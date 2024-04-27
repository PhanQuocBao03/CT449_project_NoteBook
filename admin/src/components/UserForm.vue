<template>
    <div class="add-reader mx-auto border border-color-white" style="width: 30%;">
      <Form ref="readerForm" @submit="submitUser" :validation-schema="userFormSchema" class="p-5 pb-2">
        <div class="form-group text-left align-self-center">
          <label class="text-white mb-3" for="firstName"><b>Họ:</b></label>
          <Field name="firstName" type="text" class="form-control" v-model="userLocal.firstName" />
          <ErrorMessage name="firstName" class="error-feedback" />
        </div>
  
        <div class="form-group text-left align-self-center">
          <label class="text-white mb-3" for="lastName"><b>Tên:</b></label>
          <Field name="lastName" type="text" class="form-control" v-model="userLocal.lastName" />
          <ErrorMessage name="lastName" class="error-feedback" />
        </div>
  
        <div class="form-group text-left align-self-center">
          <label class="text-white mb-3" for="email"><b>Email:</b></label>
          <Field name="email" type="email" class="form-control" v-model="userLocal.email" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
  
        <div class="form-group text-left align-self-center">
          <label class="text-white mb-3" for="address"><b>Địa chỉ:</b></label>
          <Field name="address" type="text" class="form-control" v-model="userLocal.address" />
          <ErrorMessage name="address" class="error-feedback" />
        </div>
  
        <div class="form-group text-left align-self-center">
          <label class="text-white mb-3" for="phone"><b>Số điện thoại:</b></label>
          <Field name="phone" type="text" class="form-control" v-model="userLocal.phone" />
          <ErrorMessage name="phone" class="error-feedback" />
        </div>
  
        <div class="form-group text-left align-self-center">
          <label class="text-white mb-3" for="date"><b>Ngày sinh:</b></label>
          <Field name="date" type="date" class="form-control" v-model="userLocal.date" />
          <ErrorMessage name="date" class="error-feedback" />
        </div>
  
        <div class="form-group text-left align-self-center">
          <label class="text-white mb-3"><b>Giới tính:</b></label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="male" value="male" v-model="userLocal.gender" />
            <label class="form-check-label text-white" for="male">Nam</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="female" value="female" v-model="userLocal.gender" />
            <label class="form-check-label text-white" for="female">Nữ</label>
          </div>
          <ErrorMessage name="gender" class="error-feedback" />
        </div>
  
        <div class="form-group text-left align-self-center">
          <label class="text-white mb-3" for="image"><b>Hình đại diện:</b></label>
          <Field name="image" type="text" class="form-control" v-model="userLocal.image" />
          <ErrorMessage name="image" class="error-feedback" />
        </div>
  
        <div class="form-group text-left align-self-center m-3 mb-5">
          <button class="btn btn-success">
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
    emits: ["submit:user"],
    props: {
      user: { type: Object, default: () => ({}) },
    },
    data() {
      const userFormSchema = yup.object().shape({
        firstName: yup.string().required("Họ là bắt buộc"),
        lastName: yup.string().required("Tên là bắt buộc"),
        email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
        image: yup.string(),
      });
  
      return {
        userLocal: { ...this.user },
        userFormSchema,
      };
    },
    methods: {
      submitUser() {
        this.$emit("submit:user", this.userLocal);
        this.$refs.userForm.resetForm();
      },
    },
  };
  </script>
  
  <style scoped>
  @import "@/assets/form.css";
  </style>
  