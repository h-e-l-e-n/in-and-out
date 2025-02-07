import { createRouter, createWebHistory } from 'vue-router'
import StocksView from '@/views/StocksView.vue'
import OrderView from '@/views/OrderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'restock',
      component: () => import('../views/RestockView.vue'),
    },
    {
      path: '/stock',
      name: 'stock',
      component: StocksView
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView
    }
  ],
})

export default router
