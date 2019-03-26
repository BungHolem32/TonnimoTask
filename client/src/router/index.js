import Vue from 'vue'
import Router from 'vue-router'
import Tasks from '../components/tasks'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user/:user_id/tasks',
      name: 'Tasks',
      component: Tasks
    }
  ]
})
