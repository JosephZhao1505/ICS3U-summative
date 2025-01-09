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
    { path: '/', component: LandingPage },
    { path: '/register', component: RegisterView },
    { path: '/login', component: LoginView },
    { path: '/home', component: HomeView },
    { path: '/genresearch', component: GenreSearch },
    { path: '/movies/:id', component: DetailView },
    { path: '/cart', component: CartView },
    { path: '/tos', component: TOSView },
    { path: '/privacypolicy', component: PrivacyPolicyView },
    { path: '/contactus', component: ContactUsView },
    { path: '/settings', component: SettingsView },
    { path: '/:pathMatch(.*)*', meta: { auth: false }, component: ErrorView, },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    userAuthorized.then(() => {
      const store = useStore();
  
      if (!store.user && to.meta.auth) {
        next("/login");
      } else {
        next();
      }
    });
  });  

export default router;