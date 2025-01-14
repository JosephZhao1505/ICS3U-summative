import { createWebHistory, createRouter } from 'vue-router'
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import DetailView from '../views/DetailView.vue';
import CartView from '../views/CartView.vue';
import LandingPage from '../views/LandingPage.vue';
import GenreSearch from '../views/GenreSearch.vue';
import HomeView from '../views/HomeView.vue';
import TOSView from '../views/TOSView.vue';
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue';
import ContactUsView from '../views/ContactUsView.vue';
import SettingsView from '../views/SettingsView.vue';
import ErrorView from '@/views/ErrorView.vue';
import { userAuthorized, useStore } from '../store';

const routes = [
    { path: '/', meta: { auth: false }, component: LandingPage },
    { path: '/register', meta: { auth: false }, component: RegisterView },
    { path: '/login', meta: { auth: false }, component: LoginView },
    { path: '/home', meta: { auth: true }, component: HomeView },
    { path: '/genresearch', meta: { auth: true }, component: GenreSearch },
    { path: '/movies/:id', meta: { auth: true }, component: DetailView },
    { path: '/cart', meta: { auth: true }, component: CartView },
    { path: '/tos', meta: { auth: false }, component: TOSView },
    { path: '/privacypolicy', meta: { auth: false }, component: PrivacyPolicyView },
    { path: '/contactus', meta: { auth: false }, component: ContactUsView },
    { path: '/settings', meta: { auth: false }, component: SettingsView },
    { path: '/:pathMatch(.*)*', meta: { auth: false }, component: ErrorView, },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
  try {
    await userAuthorized;

    const store = useStore();

    if (!store.user && to.meta.auth) {
      next("/login");
    } else {
      next();
    }
  } catch (error) {
    console.error("Error during user authorization:", error);
    next("/login");
  }
});

export default router;