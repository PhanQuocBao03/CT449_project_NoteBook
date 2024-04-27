<template>
	<div class="container">
		<div >
			<h2 class="mb-5 text-center">Thông tin cá nhân</h2>
		</div>
		<hr>
		<div class="row">
			<div class="col-md-4">
				<img :src="user.image" alt="" class="img-fluid rounded" />
			</div>
			<div class="col-md-8">
				<h3>{{ user ? user.firstName : "Loading..." }} {{ user ? user.lastName : "Loading..." }}</h3>
				<div>
					<p><cite title="San Francisco, USA">{{ user.address }} <i class="bi bi-geo-alt"></i></cite></p>

					<p><i class="fa-regular fa-envelope"></i> <span style="margin-left: 5px;">{{ user ? user.email : "Loading..." }}</span></p>
					
					<p><i class="fa-solid fa-phone-volume"></i><span style="margin-left: 5px;"> {{ user ? user.phone : "Loading..." }}</span></p>

					
					<p><i class="fa-regular fa-calendar"></i> <span style="margin-left: 5px;">{{ user ? user.date : "Loading..." }}</span></p>
				</div>
				<div class="btn-group me-2">
					<button class="logout-button btn btn-sm btn-success" style="margin-right: 5px;">
						<a class="nav-link" @click.prevent="handleLogout">Đăng xuất</a>
					</button>

					<router-link
						:to="{
						name: 'user.edit',
						params: { id: user._id },
						}"
					>

						<button class="logout-button btn btn-sm btn-primary ">
							<a class="nav-link">Chỉnh sửa</a>
						</button>
					</router-link>
					
				</div>
			</div>
		</div>
	</div>
</template>

	
	<script>
	import { mapState, mapActions } from "pinia";
	import { useAuthStore } from "@/stores/auth.store";
	import userService from "../services/user.service";
import { RouterLink } from "vue-router";
	
	export default {
		data() {
			return {
			user: null // Đảm bảo khởi tạo thuộc tính 'user'
			};
		},
		computed: {
			...mapState(useAuthStore, {
				currentUser: "user",
				users: null
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
			const userId = this.currentUser._id
			userService.get(userId).then(response => {
				// console.log('check',response)
				this.user = response;
			}).catch(error => {
				console.error('Error fetching user details:', error);
			});
	
			if (!this.currentUser) {
				this.$router.push({ name: "login" });
			}
		},
	};
	</script>
	
	<style scoped>
	.user-infor {
		display: inline-block;
		width: 100%;
		background-color: rgb(235 253 255);
		border-radius: 10px;
		position: relative;
		box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
	}
	
	strong {
		line-height: 30px;
		display: block;
		padding-top: 8px;
	}
	
	.logout-button:hover {
		background-color: #3aa4a2;
		color: #fff;
	}
	
	.profile-img-card{
		float: left;
		display: block;
		width: 120px;
		margin: 40px 20px ;
	}
	
	.infomation{
		margin: 20px 20px ;
		display: block;
		float: left;
	}
	
	.nav-link{
		color: rgb(255, 255, 255);
	}
	
	.container{
		background-color: whitesmoke;
		padding-top: 50px;
		padding-bottom: 50px;
		width: 40%;
	
	}
	.container p{
		font-size: 18px;
	}
	
	</style>
	