<template>
  <div class="idoc">
    <b-container class="bv-example-row">
      <b-row v-if="welcomeScreen">
        <welcomeConsent title="Your Journeys" page="journeys" @finishedWelcome="welcomeScreen=false"></welcomeConsent>
      </b-row>
      <b-row><b-col><MainHeader title="Your Journeys"></MainHeader></b-col></b-row>
      <b-row>
        <b-col><h3 class="centered">Coming Soon</h3></b-col>
      </b-row>
      <b-row v-show="enabled"><b-col>
          <p>Below you will find our interactive documentary where you can explore how design choices in the new Metro carriages will impact on different users.</p>  
      </b-col></b-row>
      <b-row v-show="enabled">
        <b-col cols="1"></b-col>
        <b-col>
          <div id="idoc">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/7wnRi3Sclm8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>

    </b-container>

    
  </div>
</template>

<script>
// @ is an alias to /src
import MainHeader from '@/components/MainHeader.vue'
import welcomeConsent from "../components/WelcomeConsent";
export default {
  name: 'Personas',
  data() {
    return {
      welcomeScreen: true,
      enabled: false
    }
  },
  components: {
    welcomeConsent,
    MainHeader
  }
}
</script>

<style lang="css">
  .centered {
    text-align: center;
    font-style: italic;
  }
</style>
