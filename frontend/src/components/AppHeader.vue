<template>
	<nav class="navbar navbar-expand navbar-dark bg-info">
		<a href="/" class="navbar-brand"><img class="navbar navbar-logo" src="../assets/logo.png"></a>
		<div v-if="!currentUser" class="navbar-nav ml-auto">
			<li class="nav-item">
				<router-link :to="{ name: 'register' }" class="nav-link"
					>Đăng ký</router-link
				>
			</li>
			<li class="nav-item">
				<router-link :to="{ name: 'login' }" class="nav-link"
					>Đăng nhập</router-link
				>
			</li>
		</div>

		<div v-if="currentUser" class="navbar-nav ml-auto">
			<li class="nav-item">
				<router-link :to="{ name: 'contactbook' }" class="nav-link">Tất cả</router-link>
			</li>
			<li class="nav-item">
				<router-link :to="{ name: 'flag' }" class="nav-link">Yêu thích</router-link>
			</li>
			<li class="nav-item">
				<router-link :to="{ name: 'profile' }" class="nav-link">{{
					currentUser.username
				}}</router-link>
			</li>
			<li class="nav-item">
				<a class="nav-link" @click.prevent="handleLogout">Đăng xuất</a>
			</li>
		</div>
	</nav>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

export default {
	computed: {
		...mapState(useAuthStore, {
			currentUser: "user",
		}),
	},
	methods: {
		...mapActions(useAuthStore, ["logout", "loadAuthState"]),

		handleLogout() {
			if(confirm("Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng?") == true) {
				this.logout();
				this.$router.push({ name: "login" });
			}
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