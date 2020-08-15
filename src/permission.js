import router from './router';
import { checkStorage } from '@/utils/localStorage';

router.beforeEach((to, from, next) => {
  const hasUser = checkStorage('userInfo');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!hasUser) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
