import Vue from 'vue';
import Router from 'vue-router';

import Layouts from '@/layouts';

Vue.use(Router);

const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layouts,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '总览' }
    }]
  },
  {
    path: '/current',
    component: Layouts,
    children: [
      {
        path: 'index',
        name: 'Current',
        meta: { title: '舆情监测' },
        component: () => import('@/views/currentInfo/index')
      }
    ]
  },
  {
    path: '/searching',
    component: Layouts,
    children: [
      {
        path: 'index',
        name: 'Searching',
        meta: { title: '全文检索' },
        component: () => import('@/views/searching/index')
      }
    ]
  },
  {
    path: '/bulletin',
    component: Layouts,
    children: [
      {
        path: 'index',
        name: 'Bulletin',
        meta: { title: '舆情简报' },
        component: () => import('@/views/bulletin/index')
      }
    ]
  },
  {
    path: '/setting',
    component: Layouts,
    children: [
      {
        path: 'index',
        name: 'Setting',
        meta: { title: '系统设置' },
        component: () => import('@/views/setting/index')
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
