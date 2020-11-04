<template>
  <div class="dropdown-container">
    <div class="dropdown-full">
      <b-dropdown id="dropdown-1" class="m-md-2 menu" variant="outline-primary" aria-expanded="false"> 
        <template v-slot:button-content>
        Menu
        </template>
        <b-dropdown-item to="/">Home</b-dropdown-item>
        <b-dropdown-item to="/results">Results</b-dropdown-item>
        <b-dropdown-item to="/explore">Explore</b-dropdown-item>
        <b-dropdown-item to="/configure">Configure</b-dropdown-item>
        <b-dropdown-item to="/journeys">Journeys</b-dropdown-item>
        <b-dropdown-item to="/about">About</b-dropdown-item>
        <b-dropdown-item href="#" v-b-modal.terms-modal>Terms and Conditions</b-dropdown-item>
        <b-dropdown-item href="#" v-b-modal.privacy-modal>Privacy Policy</b-dropdown-item>
      </b-dropdown>
     </div>

    <div class="dropdown-mob">
      <b-dropdown id="dropdown-1" class="m-md-2 menu" variant="outline-primary" aria-expanded="false"> 
        <template v-slot:button-content>
        ☰
        </template>
        <b-dropdown-item to="/">Home</b-dropdown-item>
        <b-dropdown-item to="/results">Results</b-dropdown-item>
        <b-dropdown-item to="/explore">Explore</b-dropdown-item>
        <b-dropdown-item to="/configure">Configure</b-dropdown-item>
        <b-dropdown-item to="/journeys">Journeys</b-dropdown-item>
        <b-dropdown-item to="/about">About</b-dropdown-item>
        <b-dropdown-item href="#" v-b-modal.terms-modal>Terms and Conditions</b-dropdown-item>
        <b-dropdown-item href="#" v-b-modal.privacy-modal>Privacy Policy</b-dropdown-item>
      </b-dropdown>
     </div>
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
    .btn {
      padding-top: 0.45rem;
      color: black;
      border-color: black;
    }
  }

  .menu a {
    color: $font-color;
  }

  .menu li:hover {
    border-left: 5px solid $metro-yellow;
    border-right: 5px solid $metro-yellow;
  }

  .dropdown-container {
    text-align: right;
  }

  .dropdown-mob {
    display: none;
  }


@media all and (max-width: 765px) {
  .dropdown-mob {
    display: block;
    position: relative;
    padding-right: 1em;
  }

  .dropdown-full{
    display: none;
  }
}

</style>


