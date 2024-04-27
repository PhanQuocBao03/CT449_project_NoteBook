<template>
	<div class="mx-auto">
		<div class="menu-search row justify-content-center">
			<InputSearch v-model="searchText" class="mt-5 text-center col-md-5 input-lg" />
		</div>
		<div class="page row justify-content-center">
			

			<div class="mt-3 text-center">
				<router-link
                    :to="{
                    name: 'user.add',
                    }"
                >
				<h3 class="text-white rounded-pill border row bg-info" style="width: 100px;">
					<i class="fa-solid fa-plus mt-2 ps-2"></i>
					<p class="m-2" style="font-size: 22px;">Thêm</p>
				</h3>
			</router-link>
				
				<UserList v-if="filteredUsersCount > 0" :users="filteredUsers" v-model:activeIndex="activeIndex"   @delete:user="deleteUser" />
				<p v-else>Chưa có sách nào.</p>
			</div>
		</div>
	</div>
</template>

<script>
import { swalert } from "@/mixins/swal.mixin";
// import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/UserList.vue";
// import BookService from "@/services/book.service";
import UserService from "@/services/user.service";



export default {
	components: {
        UserList,
		
		InputSearch,
	
	},
	data() {
		return {
			users: [],
			activeIndex: -1,
			searchText: "",
		};
	},
	watch: {
		searchText() {
			this.activeIndex = -1;
		},
	},
	computed: {
		userStrings() {
			return this.users.map((user) => {
				const { firstName,lastName,email,image } = user;
				return [firstName,lastName,email,image].join("");
			});
		},
		filteredUsers() {
			if (!this.searchText) return this.users;
			return this.users.filter((_user, index) =>
				this.userStrings[index].includes(this.searchText)
			);
		},
		activeUser() {
			if (this.activeIndex < 0) return null;
			return this.filteredUsers[this.activeIndex];
		},
		filteredUsersCount() {
			return this.filteredUsers.length;
		},
	},
	methods: {
		async retrieveUsers() {
			try {
				this.users = await UserService.getAll();
				
				this.users.sort((current, next) =>
					current.firstName.localeCompare(next.firstName)
				);
			} catch (error) {
				console.log(error);
			}
		},
		
		refreshList() {
			this.retrieveUsers();
			this.activeIndex = -1;
		},

		async removeAllUsers() {
			swalert
				.fire({
					title: "Xóa tất cả sách",
					icon: "warning",
					text: "Bạn muốn xóa tất cả sách?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await UserService.deleteAll();
							this.refreshList();
						} catch (error) {
							console.log(error);
						}
					}
				});
		},

		async deleteUser(id) {
			swalert
				.fire({
					title: "Xác nhận xóa sách này",
					icon: "warning",
					text: "Xác nhận xóa sách này?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await UserService.delete(id);
							this.refreshList();
						} catch (error) {
							console.log(error);
						}
					}
				});
		},

		goToAddUser() {
			this.$router.push({ name: "user.add" });
		},
	},
	created() {
		this.refreshList();
	},
};
</script>

<style scoped>
.page {
	text-align: left;
	margin-top: 20px;
}

.menu-search {
	max-width: 100%;
	margin-bottom: 20px;
}

/* .menu {
	width: 100%;
}

.tools {
	width: 600px;
}

.btn {
	margin: 0px 10px;
	min-width: 90px;
}
.mt-3 h4 i {
	margin-left: 4px;
} */
</style>
