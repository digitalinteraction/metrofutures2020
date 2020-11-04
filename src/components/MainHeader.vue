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
      
    <b-row class="results-header" v-show="resultMessage">
      <b-col>
        Consultation is now closed, click here to see the <router-link to="/results">results</router-link>.
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
}

// .dd-menu {
//   background-color: $metro-yellow;
// }

</style>