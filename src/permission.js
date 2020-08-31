import router from './router';
import store from './store';
import { checkStorage } from '@/utils/localStorage';
import getPageTitle from '@/utils/get-page-title';

router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title);

  const hasUser = checkStorage('loginState');

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (hasUser !== 1) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      await store.dispatch('user/getUserDetails');
      next();
    }
  } else {
    next();
  }
});
