<template>
  <div class="idoc">
    <b-container class="bv-example-row">
      <b-row v-if="welcomeScreen">
        <welcomeConsent title="Your Journeys" page="journeys" @finishedWelcome="welcomeScreen=false"></welcomeConsent>
      </b-row>
      <b-row>
        <b-col>
          <MainHeader title="Explore Your Journeys"></MainHeader>
        </b-col>
      </b-row>

      <b-row 
        v-for="(person, pIndex) in this.getPersonas" 
        :key="pIndex"
        class="personaContainer"
      >
        <b-col >
          <div class="mainCard">
            <router-link :to="`/journeys/${person.name}`">
              {{ person.name }}
            </router-link>
            <img :src="cdnUrl + person.img" alt="">
          </div>
          <div class="moreInfo">{{ person.desc }}</div>
        </b-col>
      </b-row>

    </b-container>

    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MainHeader from '@/components/MainHeader.vue'
import welcomeConsent from "../components/WelcomeConsent";

export default {
  name: 'Personas',
  data() {
    return {
      welcomeScreen: true,
      enabled: false,
      cdnUrl: "https://cdn.metrofutures.org.uk/personas/images/"
    }
  },
  components: {
    welcomeConsent,
    MainHeader,
  },
  computed: {
    ...mapGetters([
      'getPersonas'
    ])
  },
}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  .centered {
    text-align: center;
    font-style: italic;
  }

  .personaContainer {
    text-align: left;
    height: 10vh;
    border: 1px solid black;
  }

  .personaContainer img {
    height: 10vh;
  }
</style>
