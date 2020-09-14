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

    <b-col>
      <div>
        <b-dropdown id="dropdown-1" text="Menu" class="m-md-2">
          <b-dropdown-item><router-link to="/about">About Metro Futures</router-link></b-dropdown-item>
          <b-dropdown-item><router-link to="/explore">Explore Your Metro</router-link></b-dropdown-item>
          <b-dropdown-item><router-link to="/configure">Configure Your Metro</router-link></b-dropdown-item>
          <!-- <b-dropdown-item><router-link to="/journeys">Your Journeys</router-link></b-dropdown-item> -->
          <b-dropdown-item>Terms and Conditions</b-dropdown-item>
          <b-dropdown-item>Privacy Policy</b-dropdown-item>
        </b-dropdown>
      </div>
    </b-col>


    
  </b-row>
</template>

<script>
export default {
  name: "MainHeader",
  props: {
    title: String
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