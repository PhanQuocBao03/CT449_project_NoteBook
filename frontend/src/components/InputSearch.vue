<script>
export default {
	props: {
		modelValue: { type: String, default: "" },
	},
	emits: ["submit", "update:modelValue"],
	methods: {
		updateModelValue(e) {
			var value = e.target.value;
			this.$emit("update:modelValue", value);
		},
		submit() {
			this.$emit("submit");
		},
	},
};
</script>

<template>
	<div class="input-group input-group-lg"> <!-- Thêm lớp input-group-lg để tăng kích thước -->
		<input
			type="text"
			class="form-control form-control-lg" 
			placeholder="Nhập thông tin cần tìm"
			:value="modelValue"
			@input="updateModelValue"
			@keyup.enter="submit"
		/>
		<div class="input-group-append">
			<button
				class="btn btn-outline-secondary btn-lg bg-white" 
				type="button"
				@click="submit"
			>
				<i class="fas fa-search"></i> Tìm kiếm
			</button>
		</div>
	</div>
</template>
