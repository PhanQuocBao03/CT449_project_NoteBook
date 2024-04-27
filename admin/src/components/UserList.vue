<template>
    <div>
      <table class="table bg-white">
        <thead>
          <tr>
            <th scope="col">Họ tên</th>
           
            <th scope="col">Email</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Giới tính</th>
           
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in paginatedUsers" :key="user._id">
            <td>
                <img :src="user.image" alt="user Image" style="max-width: 50px; max-height: 50px;"> 
                {{ user.lastName }} 
                {{ user.firstName }}
            </td>
           
            <td>{{ user.email }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.date }}</td>
            <td>{{ user.gender }}</td>
            
            <td>
              <router-link
                :to="{
                  name: 'reader.edit',
                  params: { id: user._id },
                }"
              >
                <button class="btn btn-link">
                  <i class="fas fa-edit text-primary" style="font-size: 20px;"></i>
                </button>
              </router-link>
              <button class="btn btn-link" @click="deleteUser(user)">
                <i class="fas fa-trash-alt text-danger" style="font-size: 20px;"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="prevPage" :disabled="currentPage === 1"><i class="fa-solid fa-chevron-left"></i></button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
            <button class="page-link" @click="gotoPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages"><i class="fa-solid fa-chevron-right"></i></button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  import UserService from "@/services/user.service";
  import { swalert } from "@/mixins/swal.mixin";
  
  export default {
    props: {
      users: { type: Array, default: () => [] }
    },
    data() {
      return {
        publisherNames: {}, // Store resolved publisher names here
        currentPage: 1,
        pageSize: 6, // Adjust as needed
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.users.length / this.pageSize);
      },
      paginatedUsers() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.users.slice(startIndex, endIndex);
      },
    },
    methods: {
      async deleteUser(user) {
        swalert.fire({
          title: "Xác nhận xóa sách này",
          icon: "warning",
          text: "Xác nhận xóa sách này?",
          showCloseButton: true,
          showCancelButton: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await UserService.delete(user._id);
              this.refreshList();
            } catch (error) {
              console.log(error);
            }
          }
        });
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      gotoPage(page) {
        this.currentPage = page;
      },
    },
  };
  </script>
  
  <style>
  /* Add your table styling here */
  </style>
  