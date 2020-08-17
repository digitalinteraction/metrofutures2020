import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/survey',
    name: 'Survey',
    component: () => import(/* webpackChunkName: "survey" */ '../views/Survey.vue')
  },
  {
    path: '/idoc',
    name: 'Interactive Documentary',
    component: () => import(/* webpackChunkName: "idoc" */ '../views/InteractiveDocumentary.vue')
  },
  {
    path: '/walkthrough',
    name: 'Metro Walkthroughs',
    component: () => import(/* webpackChunkName: "walthrough" */ '../views/Walkthrough.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
