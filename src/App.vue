<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <Header msg="Welcome"/>-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link> |-->
<!--      <router-link to="/survey">Survey</router-link> |-->
<!--      <router-link to="/idoc">Documentary</router-link> |-->
<!--      <router-link to="/walkthrough">Walkthroughs</router-link>-->
<!--    </div>-->
    <router-view/>
  </div>
</template>

<script>
//import Header from '@/components/Header.vue'


export default {
  name: 'App',
  components: {
    // Header
  }
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
        src: url("./fonts/CalvertMT.ttf") format("truetype"),
        url("./fonts/CalvertMTW04Regular.woff") format("woff")
    }
body {
  overflow: hidden;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

/* todo implement responsive font sizing*/
</style>
