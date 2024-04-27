<template>
	<nav class="navbar navbar-expand bg-info">
	  <a href="/" class="navbar-brand col-md-3"><img class="navbar navbar-logo" src="../assets/logo.png"></a>
  
	  <!-- <div class="input-group col-md-3  menu-search">
		<input
			type="text"
			class="form-control"
			placeholder="Nhập thông tin cần tìm"
			:value="modelValue"
			@input="updateModelValue"
			@keyup.enter="submit"
		/>
		<div class="input-group-append">
			<button
				class="btn btn-outline-secondary text-white bg-primary"
				type="button"
				@click="submit"
			>
				<i class="fas fa-search"></i> Tìm kiếm
			</button>
		</div>
	</div> -->
  
	  <div v-if="!currentUser" class="navbar-nav ml-auto col-md-3">
		<li class="nav-item">
		  <router-link :to="{ name: 'register' }" class="nav-link">Đăng ký</router-link>
		</li>
		<li class="nav-item">
		  <router-link :to="{ name: 'login' }" class="nav-link">Đăng nhập</router-link>
		</li>
	  </div>
  
	  <div v-if="currentUser" class="navbar-nav ml-auto justify-conten-between col-md-9">
		<li class="nav-item col-md-7 d-flex">
		  <router-link :to="{ name: 'home' }" class="nav-link col-md-1 pt-2">
			<i class="fa-solid fa-house text-white"></i>
		</router-link>
		<router-link :to="{ name: 'contactbook' }" class="nav-link text-white h5 col-md-2 pt-3">
			<p>Tìm sách</p>
		</router-link>
		</li>
		<div class=" row justify-conten-end col-md-5 offset-md-3">
			<li class="nav-item">
			<router-link :to="{ name: 'flag' }" class="nav-link"><i class="fa-solid fa-heart " style="color: orangered;"></i></router-link>
			</li>
			<li class="nav-item">
			<router-link :to="{ name: 'profile' }" class="nav-link "><img :src="currentUser.image" alt="" class="rounded-circle " style="width: 30px;"></router-link>
			</li>
		</div>
	  </div>
	</nav>
  </template>
  
  <script>
  import { mapState, mapActions } from "pinia";
  import { useAuthStore } from "@/stores/auth.store";
  
  export default {
	props: {
		modelValue: { type: String, default: "" },
	},
	emits: ["submit", "update:modelValue"],
	computed: {
	  ...mapState(useAuthStore, {
		currentUser: "user",
	  }),
	},
	methods: {
	  ...mapActions(useAuthStore, ["logout", "loadAuthState"]),
  
	  handleLogout() {
		if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng?")) {
		  this.logout();
		  alert("Bạn đã đăng xuất thành công!"); // Display logout success message
		  this.$router.push({ name: "login" });
		}
	  },
	  updateModelValue(e) {
			var value = e.target.value;
			this.$emit("update:modelValue", value);
		},
		submit() {
			this.$emit("submit");
		},
	},
	created() {
	  this.loadAuthState();
	},
	
  };
  </script>
  
  <style>
  .navbar .navbar-logo{
	  width:150px;
	  height:60px;
	  padding: 0;
  }
  .nav-item{
	  font-size:20px;
	  cursor: pointer;
  }
  </style>
  