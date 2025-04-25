import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '@/components/UserList.vue'
import UserForm from '@/components/UserForms.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'users',
      component: UserList
    },
    {
      path: '/users/create',
      name: 'createUser',
      component: UserForm
    },
    {
      path: '/users/:id/edit',
      name: 'editUser',
      component: UserForm
    }
  ]
})

export default router
