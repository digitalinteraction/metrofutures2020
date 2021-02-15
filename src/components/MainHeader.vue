<template>
  <div>
    <b-row id="headerRow" align-v="center">
      <b-col >
      <router-link to="/">
      <b-img class="float-left" id="logo" src="../assets/metroLogoTemp.png" fluid alt="Metro logo"></b-img>
      </router-link>
      </b-col>
      <b-col class="dd-menu">
      <h3 class="calvert"> {{ title }}</h3>
      </b-col>
      
      <b-col>
      <MainMenu></MainMenu>
      </b-col>
      
    </b-row>
      
    <b-row class="results-header px-2 px-md-0" v-show="resultMessage">
      <b-col>
        The 2020 public consultation is now closed, click here to see the <router-link to="/findings">findings</router-link>. Images are of 2020 proposed design that are currently being revised.
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue'
export default {
  name: "MainHeader",
  props: {
    title: String,
    resultMessage: Boolean,
  },
  components: {
    MainMenu
  },
  data: function() {
    return {
    }
  }

}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  #headerRow {
    border-bottom: 0.08em solid #dddddd;
  }

.calvert {
  font-family: $font-family-calvert;
}

.navLink {
    border-bottom: 1px solid #FEC600;
    cursor: pointer;
    color: $font-color;
}

.results-header {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  background-color: lightgreen;

  & a {
    color: black;
    text-decoration: underline;
  }
}

// .dd-menu {
//   background-color: $metro-yellow;
// }

</style>