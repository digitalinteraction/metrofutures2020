<template>
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
</template>

<script>
import MainMenu from '@/components/MainMenu.vue'
export default {
  name: "MainHeader",
  props: {
    title: String
  },
  components: {
    MainMenu
  }

}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

.calvert {
  font-family: $font-family-calvert;
}

.navLink {
    border-bottom: 1px solid #FEC600;
    cursor: pointer;
    color: $font-color;
}

// .dd-menu {
//   background-color: $metro-yellow;
// }

</style>