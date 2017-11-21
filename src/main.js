import Vue from 'vue';
import iView from 'iview';
import store from './store'
import router from './router';

// import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  const realname = store.state.user.realname;
  if (realname === '' && to.path !== '/') {
    next('/');
  } else if (realname !== '' && to.path === '/') {
    next('/msg');
    iView.LoadingBar.finish();
  } else {
    next();
  }
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  // window.scrollTo(0, 0);
});



new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
