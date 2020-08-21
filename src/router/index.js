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
    path: '/404',
    component: () => import('@/views/error_page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layouts,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: { title: '总览', requiresAuth: true }
    }]
  },
  {
    path: '/current',
    component: Layouts,
    children: [
      {
        path: '',
        name: 'Current',
        meta: { title: '舆情监测', requiresAuth: true },
        noShowingChildren: true,
        component: () => import('@/views/currentInfo/index'),
        children: [
          {
            name: 'Project',
            path: 'search',
            meta: { requiresAuth: true },
            component: () => import('@/views/currentInfo/components/Project'),
            props: (route) => ({ query: route.query.q })
          },
          {
            path: 'detail/:id(\\d+)',
            meta: { requiresAuth: true },
            component: () => import('@/views/currentInfo/components/Detail')
          }
        ]
      }
    ]
  },
  {
    path: '/newEdition',
    meta: { requiresAuth: true },
    component: Layouts,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'newEdition',
        component: () => import('@/views/new_edition/index')
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
        meta: { title: '全文检索', requiresAuth: true },
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
        meta: { title: '舆情简报', requiresAuth: true },
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
        meta: { title: '用户管理', requiresAuth: true },
        component: () => import('@/views/setting/index')
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
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
