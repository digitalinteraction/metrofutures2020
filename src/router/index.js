import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import Menu from '../views/Menu.vue'

Vue.use(VueRouter)
Vue.use(Meta)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Menu,
    meta: {
      title: 'Metro Futures'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About Metro Futures'
    },
  },
  {
    path: '/configure',
    name: 'Survey',
    component: () => import(/* webpackChunkName: "configure" */ '../views/Survey.vue'),
    meta: {
      title: 'Metro Futures - Configure Your Choices'
    }
  },
  {
    path: '/journeys',
    name: 'Personas',
    component: () => import(/* webpackChunkName: "personas" */ '../views/Personas.vue'),
    meta: {
      title: 'Metro Futures - Experience Your Journeys'
    }
  },
  {
    path: '/journeys/:persona',
    name: 'Journey',
    component: () => import(/* webpackChunkName: "persona" */ '../components/PersonaViewer.vue'),
    meta: {
      title: 'Metro Futures - Experience Your Journeys'
    }
  },
  {
    path: '/explore',
    name: 'Metro Futures - Explore Your Metro',
    component: () => import(/* webpackChunkName: "explore" */ '../views/Pano.vue')
  },
  {
    path: '/findings',
    name: 'Findings',
    component: () => import(/* webpackChunkName: "results" */ '../views/Findings.vue'),
    meta: {
      title: 'Metro Futures - Findings'
    }
  },
  // {
  //   path: '/workshops',
  //   name: 'Workshops',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Workshops.vue'),
  //   meta: {
  //     title: 'Metro Futures - Workshops'
  //   },
  // },
  // Catch all route at the end just dumps you back at the start
  {
    path: '*',
    component: Menu,
    meta: {
      title: 'Metro Futures'
    }
  }
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
