<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
	components: {
		AppHeader,
	},
};
</script>

<template>
	<div id="app">
		<AppHeader />

		<div class="main">
			<router-view />
		</div>
	</div>
</template>

<style>
.page {
	min-width: 1200px;
	margin: 0 auto;
}

.swal2-popup {
	padding: 0 0 1rem 0;
}

.swal2-close {
	padding: 0;
}

.swal2-popup.swal2-toast .swal2-title {
	margin: 1rem 1rem 0 1rem;
}

.swal2-popup.swal2-toast .swal2-html-container {
	margin: 1rem;
}
.main{
    /* max-width:1200px; */
    /* margin: 0 auto; */
	/* background-color: #104E8B; */
	width: 100%;
	height: 100%;
}
</style>
