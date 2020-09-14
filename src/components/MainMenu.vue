<template>
  <div>
    <b-dropdown id="dropdown-1" text="Metro Futures" class="m-md-2 menu" variant="primary">
      <b-dropdown-item><router-link to="/about">About Metro Futures</router-link></b-dropdown-item>
      <b-dropdown-item><router-link to="/explore">Your Metro</router-link></b-dropdown-item>
      <b-dropdown-item><router-link to="/configure">Your Choices</router-link></b-dropdown-item>
      <!-- <b-dropdown-item><router-link to="/journeys">Your Journeys</router-link></b-dropdown-item> -->
      <a href="#" v-b-modal.terms-modal><b-dropdown-item>Terms and Conditions</b-dropdown-item></a>
      <a href="#" v-b-modal.privacy-modal><b-dropdown-item>Privacy Policy</b-dropdown-item></a>
    </b-dropdown>
    <!-- Compontents for modals -->
        <Privacy/>
        <Terms/>
  </div>
</template>

<script>

  import Privacy from "@/components/Privacy";
  import Terms from "@/components/Terms";

  export default {
    name: "MainMenu",
    components: {
            Privacy,
            Terms
        }
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


