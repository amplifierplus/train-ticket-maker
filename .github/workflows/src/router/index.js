import { createRouter, createWebHashHistory } from 'vue-router'
import TrainTicketGengrate from '@/views/TrainTicketGengrate.vue'

const routes = [
  {
    path: '/',
    name: 'TrainTicketGengrate',
    component: TrainTicketGengrate,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
