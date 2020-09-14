<template>
  <b-row id="headerRow" align-v="center">
    <b-col >
      <router-link to="/">
        <b-img class="float-left" id="logo" src="../assets/metroLogoTemp.png" fluid alt="Metro logo"></b-img>
      </router-link>
    </b-col>
    <b-col>
      <h3 class="calvert"> {{ title }}</h3>
    </b-col>

    <b-col v-if="linkType === 'journeys'">
      <router-link to="/journeys" class="float-right navLink">Explore some of our Metro users?</router-link>
      <!-- <p v-on:click="goTo('/idoc')" class="float-right personasLink" ></p> -->
    </b-col>
    <b-col v-if="linkType === 'configurator'">
      <router-link to="/journeys" class="float-right navLink">Customise your Metro</router-link>
      <!-- <p v-on:click="goTo('/idoc')" class="float-right personasLink" ></p> -->
    </b-col>

    <b-col v-if="!linkType">
      <router-link to="/about" class="float-right navLink">About Metro Futures</router-link>
    </b-col>

    
  </b-row>
</template>

<script>
export default {
  name: "MainHeader",
  props: {
    title: String,
    linkType: String
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

</style>