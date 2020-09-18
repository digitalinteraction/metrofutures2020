<template>
  <div id="app">
    
    <b-alert variant="warning" v-if="incompatible()" show>We've detected you are using an old version of your web browser. You may not get the best experience, and some features may not work correctly. Please update your browser, or use a recent version of Google Chrome or Mozilla Firefox. {{ this.$browserDetect.name }}</b-alert>
    <router-view/>
  </div>
</template>

<script>
//import Header from '@/components/Header.vue'


export default {
  name: 'App',
  components: {
    // Header
  },
  metaInfo: {
    meta: [
      { title: "Metro Futures"},
      { charset: 'utf-8' },
      { name: 'description', content: 'Consultation on the new Tyne and Wear Metro train design.' },
      { name: 'og:title', content: 'Metro Futures' }
    ]
  },
  watch: {
      $route: {
          immediate: true,
          handler(to) {
              document.title = to.meta.title || 'Metro Futures';
          }
      },
  },
  methods: {
    incompatible() {
      if(this.$browserDetect.isSafari && this.$browserDetect.meta.version < 11) {
        return true
      } 
      if (this.$browserDetect.isIE) {
        return true
      }

      if(this.$browserDetect.isFirefox && this.$browserDetect.meta.version < 77) {
        return true
      } 

      if(this.$browserDetect.isChrome && this.$browserDetect.meta.version < 83) {
        return true
      } 
      
      // Otherwise
      return false
      
    },
  },
}

</script>

<style lang="scss">
    @import './assets/custom.scss';
    /*@import '../node_modules/bootstrap/scss/bootstrap.scss';*/

    @font-face {
        font-family: "Open Sans";
        src: url("./fonts/OpenSans-Regular.ttf") format("truetype")
    }

    @font-face {
        font-family: "Calvert";
        src: url("./fonts/CalvertMTStd.otf") format("opentype");
    }
body {
  /*  overflow: hidden;*/
  text-align: center;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: black;
  overflow: hidden;
}


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


</style>
