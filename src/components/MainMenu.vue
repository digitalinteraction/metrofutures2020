<template>
  <div>
    <b-dropdown id="dropdown-1" text="Menu" class="m-md-2" variant="primary">
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

<style>

</style>


