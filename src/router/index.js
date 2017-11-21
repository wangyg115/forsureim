import Vue from 'vue'
import Router from 'vue-router'
import msg from '@/components/msg'
import work from '@/components/work'
import roster from '@/components/roster'
// import msger from '@/components/messager'
import login from '@/components/login'
import index from '@/components/index'
Vue.use(Router)

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', name: 'login', component: login },
    { path: '/msg',
      // name: 'msg',
      component: index,
      children: [
        { path: '', component: msg, name: 'messager' }
      ]
    },
    { path: '/roster',
      // name: 'work',
      component: index,
      children: [
        { path: '', component: roster }
      ]
    },
    { path: '/work',
      // name: 'work',
      component: index,
      children: [
        { path: '', component: work }
      ]
    }
  ]
})

