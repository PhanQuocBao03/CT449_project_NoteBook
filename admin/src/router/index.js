import { createWebHistory, createRouter } from "vue-router";
import UserLogin from "@/views/UserLogin.vue";
import { useAuthStore } from "@/stores/auth.store";

const redirectIfLoggedIn = (_to, _from) => {
	if (useAuthStore().isUserLoggedIn) {
		return {
			name: "profile",
		};
	}
};

const routes = [
	{
		path: "/login",
		name: "login",
		component: UserLogin,
		meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/views/UserRegister.vue"),
		meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
	},
	{
		path: "/profile",
		name: "profile",
		component: () => import("@/views/UserProfile.vue"),
	},
	// {
	// 	path: "/",
	// 	name: "home",
	// 	component: () => import("@/views/Home.vue"),
	// },
	{
		path: "/",
		name: "contactbook",
		component: () => import("@/views/ContactBook.vue"),
	},
	{
		path: "/reader",
		name: "reader",
		component: () => import("@/views/Reader.vue"),
	},
	{
		path: "/",
		name: "home",
		component: () => import("@/views/Home.vue"),
		props:true,
	},
	{
		path: "/users/:id",
		name: "reader.edit",
		component: () => import("@/views/ReaderEdit.vue"),
		props: true,
	},
	{
        path: "/bools/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
	{
		path: "/books/:id",
		name: "bookDetail",
		component: () => import("@/views/BookDetail.vue"),
		props: true,
	},
	{
		path: "/add",
		name: "contact.add",
		component: () => import("@/views/ContactAdd.vue"),
	},
	{
		path: "/addReader",
		name: "user.add",
		component: () => import("@/views/ReaderAdd.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notfound",
		component: () => import("@/views/NotFound.vue"),
	},
	{
		path: "/flag",
		name: "flag",
		component: () => import("@/views/ContactFlagged.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, _from) => {
	const authRequired = !to.meta.publicPage;
	const auth = useAuthStore();

	if (authRequired && !auth.isUserLoggedIn) {
		const query = to.fullPath === "/" ? {} : { redirect: to.fullPath };
		return {
			name: "login",
			query,
		};
	}
});

export default router;
