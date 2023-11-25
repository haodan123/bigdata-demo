// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect:'/page1',
      component: () => import("@/layouts/index.vue"),
      children: [
        {
          path: '/page1',
          name: 'page1',
          component: () => import('@/views/page1/index.vue'),
          meta: {
            title: '页面1'
          }
        }
      ]
    },
    // {
    //   path: '/',
    //   name: 'page1',
    //   component: () => import("@/views/page1/index.vue")
    // },

  ]
})

export default router
