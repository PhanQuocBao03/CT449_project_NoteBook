<template>
    <Form
        @submit="submitUser"
        :validation-schema="userFormSchema"
    >
		<div class="form-group">
            <label for="lastName">Họ</label>
            <Field
                name="lastName"
                type="text"
                class="form-control"
                v-model="userLocal.lastName"
            />
            <ErrorMessage name="lastName" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="firstName">Tên</label>
            <Field
                name="firstName"
                type="text"
                class="form-control"
                v-model="userLocal.firstName"
            />
            <ErrorMessage name="firstName" class="error-feedback" />
        </div>
        <div class="form-group">
                <label for="email">E-mail</label>
            <Field
                name="email"
                type="email"
                class="form-control"
                v-model="userLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="userLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field
                name="phone"
                type="tel"
                class="form-control"
                v-model="userLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hình đại điện</label>
            <Field
                name="image"
                type="tel"
                class="form-control"
                v-model="userLocal.image"
            />
            <ErrorMessage name="image" class="error-feedback" />
        </div>
		
        
        <div class="form-group">
            <button class="btn btn-primary" type="submit"  @click="submitUser">Lưu</button>
            <button
                v-if="userLocal._id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="deleteUser"
            >
                Xóa
            </button>
        </div>
    </Form>
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
	emits: ["submit:user", "delete:user"],
	props: {
		user: { type: Object, required: true },
		resetAfterSubmit: { type: Boolean, default: false },
	},
	data() {
            const userFormSchema = yup.object().shape({
                firstname: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
				lastname: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                email: yup
                    .string()
                    .email("E-mail không đúng.")
                    .max(50, "E-mail tối đa 50 ký tự."),
                address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
                phone: yup
                    .string()
                    .matches(
                    /((01|09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                    ),
            });
            return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // contactLocal để liên kết với các input trên form
            // 
                userLocal: this.user,
                userFormSchema,
            };
        },
	methods: {
		submitUser() {
			this.$emit("submit:user", this.userLocal);
			if (this.resetAfterSubmit) {
				this.$refs.userForm.resetForm();
				this.$router.push({path: '/'});
			}
		},
		deleteUser() {
			this.$emit("delete:user", this.userLocal._id);
		},
	},
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
