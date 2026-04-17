import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { authService } from '@/services/auth.service';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();

  if (to.meta.requireAuth && !isAuthenticated && to.name !== 'auth.login') {
    next('/auth/login');
  } else if (to.meta.guest && isAuthenticated && to.name !== 'dashboard') {
    next('/');
  } else {
    next();
  }
});

export default router;
