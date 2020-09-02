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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // Routing title solution from: https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();
  else { 
    document.title = previousNearestWithMeta.meta.title
  }

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router
