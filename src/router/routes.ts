import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@/layouts/auth.vue'),
    meta: {
      guest: true
    },
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('@/views/auth/login-page.vue'),
        meta: {
          guest: true
        }
      }
    ]
  },
  {
    path: '/',
    name: 'activeMapLinks',
    meta: {
      requireAuth: true
    },
    component: () => import('@/views/activeMapLinks.vue')
  }
];

export default routes;
