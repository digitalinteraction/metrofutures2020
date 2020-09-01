import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import PrivacyNotice from '../components/PrivacyNotice.vue'
// import Terms from '../components/Terms.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Metro Futures'
    }
  },
  // {
  //   path: '/privacy',
  //   name: 'Privacy',
  //   component: PrivacyNotice,
  //   meta: {
  //     title: 'Metro Futures Privacy Policy'
  //   }
  // },
  // {
  //   path: '/terms',
  //   name: 'Terms',
  //   component: Terms,
  //   meta: {
  //     title: 'Metro Futures Terms and Conditions'
  //   }
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: () => import(/* webpackChunkName: "Signup" */ '../views/Signup.vue')
  // },
  // {
  //   path: '/survey',
  //   name: 'Survey',
  //   component: () => import(/* webpackChunkName: "survey" */ '../views/Survey.vue')
  // },
  // {
  //   path: '/idoc',
  //   name: 'Interactive Documentary',
  //   component: () => import(/* webpackChunkName: "idoc" */ '../views/InteractiveDocumentary.vue')
  // },
  // {
  //   path: '/walkthrough',
  //   name: 'Metro Walkthroughs',
  //   component: () => import(/* webpackChunkName: "walthrough" */ '../views/Walkthrough.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
