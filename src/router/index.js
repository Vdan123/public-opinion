import Vue from 'vue';
import Router from 'vue-router';

import Layouts from '@/layouts';

Vue.use(Router);

const constantRoutes = [
  {
    path: '/',
    component: Layouts,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '总览', icon: 'dashboard' }
    }]
  },
  {
    path: '/current',
    component: Layouts,
    children: [
      {
        path: 'index',
        name: 'Current',
        meta: { title: '舆情监测', icon: 'order' },
        component: () => import('@/views/currentInfo/index')
      }
    ]
  }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
