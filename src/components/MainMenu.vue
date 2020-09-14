<template>
  <div>
    <b-dropdown id="dropdown-1" text="Metro Futures" class="m-md-2 menu" variant="primary">
      <b-dropdown-item><router-link to="/about">About Metro Futures</router-link></b-dropdown-item>
      <b-dropdown-item><router-link to="/explore">Explore Your Metro</router-link></b-dropdown-item>
      <b-dropdown-item><router-link to="/configure">Configure Your Metro</router-link></b-dropdown-item>
      <!-- <b-dropdown-item><router-link to="/journeys">Your Journeys</router-link></b-dropdown-item> -->
      <b-dropdown-item>Terms and Conditions</b-dropdown-item>
      <b-dropdown-item>Privacy Policy</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "MainMenu",
}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  .menu {
    font-family: $font-family-calvert;
  }

  .menu a {
    color: $font-color;
  }

  .menu li:hover {
    border-left: 5px solid $metro-yellow;
    border-right: 5px solid $metro-yellow;
  }
  
</style>


