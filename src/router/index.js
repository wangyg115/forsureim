import Vue from 'vue'
import Router from 'vue-router'
import msg from '@/components/msg'
import work from '@/components/work'
import msger from '@/components/messager'
Vue.use(Router)

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/msg', name: 'msg', component: msg },
    { path: '/work',
      name: 'work',
      component: work,
      children: [
        { path: 'msger', component: msger, name: 'messager', icon: 'zonghe' }
      ]
    }
  ]
})

