import router from './router';
import { checkStorage } from '@/utils/localStorage';
import getPageTitle from '@/utils/get-page-title';

router.beforeEach((to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title);

  const hasUser = checkStorage('userInfo');

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!hasUser) {
      next(`/login?redirect=${to.path}`);
    } else {
      next();
    }
  } else {
    next();
  }
});
