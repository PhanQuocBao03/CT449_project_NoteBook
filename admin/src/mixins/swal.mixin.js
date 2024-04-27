import Swal from "sweetalert2";

const swToastInstance = Swal.mixin({
	position: "top",
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true,
	toast: true,
});

export const swalert = Swal.mixin({
	confirmButtonText: " Chấp nhận",
	cancelButtonText: "<i class='fas fa-xmark'></i> Hủy bỏ",
	confirmButtonColor: "#FF0000", // Adjust confirm button color here
	cancelButtonColor: "#00FF00", // Adjust cancel button color here
});

export const swtoast = {
	fire(config) {
		swToastInstance.fire({
			...config,
			toast: true,
		});
	},

	success(config) {
		swToastInstance.fire({
			icon: "success",
			...config,
			toast: true,
		});
	},

	error(config) {
		swToastInstance.fire({
			icon: "error",
			color: "#f00",
			...config,
			toast: true,
		});
	},
};