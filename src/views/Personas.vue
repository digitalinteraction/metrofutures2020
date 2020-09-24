<template>
  <div class="idoc">
    <b-container class="personaMain">
      <b-row v-if="welcomeScreen">
        <welcomeConsent title="Your Journeys" page="journeys" @finishedWelcome="welcomeScreen=false"></welcomeConsent>
      </b-row>
      <b-row>
        <b-col>
          <MainHeader title="Explore Your Journeys"></MainHeader>
        </b-col>
      </b-row>

      <div
        v-for="(person, pIndex) in getPersonas" 
        :key="pIndex"
        class="personaContainer"
      >
        <b-row>
          <b-col class="imgCol" @click="selectPersona(pIndex)">
              <div class="mainCard" >
                <span class="title">{{ person.name }}'s journey</span>
                <!-- <img :src="cdnUrl + person.img" alt=""> -->
                <span class="chevron">
                  <b-icon font-scale="1" icon="chevron-down" v-show="selected !== pIndex"></b-icon>
                  <b-icon font-scale="1" icon="chevron-up" v-show="selected === pIndex"></b-icon>
                </span>
              </div>
          </b-col>
        </b-row>

        <b-row>
          <div class="subCard" v-show="selected === pIndex"> 
            <p class="personaDesc">
              {{ person.desc }}
            </p>
            <div class="text-center">
              <b-button :to="`/journeys/${person.name}`" variant="primary" class="followButton">Follow {{ person.name }}'s journey</b-button>
            </div>
          </div>
        </b-row>

      </div>

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
      cdnUrl: "https://cdn.metrofutures.org.uk/personas/images/",
      selected: null,
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
  methods: {
    selectPersona(personaIndex) {
      if (this.selected === personaIndex) {
        this.selected = null;
      } else {
        this.selected = personaIndex;
      }
    },
  },
}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  .centered {
    text-align: center;
    font-style: italic;
  }

  .mainCard {
    font-family: $font-family-calvert;
    padding-right: 1em;
    padding-top: 1em;
    // padding-bottom: 0.5em;
    // background-color: lightgray
  }

  .imgCol {
    background-image: url("../assets/yourJourneys2Mob.jpg");
    background-color: lightgray;
    height: 100px;
    line-height: 7.9em;
  }

  .title {
    background-color: rgba($color: #000000, $alpha: 0.55);
    color: white;
    padding: 1em 1em 0.75em 1.6em ;
    margin-right: 0.5em;
  }

  .chevron {
    text-align: right;
    color: white;
  }

  .subCard {
    padding-top: 1.5em;
    padding-left: 1.5em;
    padding-right: 1.5em;
    padding-bottom: 1.5em;
    font-family: $font-family-sans-serif;
  }

  .personaDesc {
    padding-left: 1em;
    padding-right: 1em;
  }

  .followButton {
    font-weight: bold;
    padding-left: 3em;
    padding-right: 3em;
  }

  .personaContainer {
    text-align: left;
  }

  // .personaContainer img {
  //   height: 10vh;
  // }

  // Media rule for phones screens
  @media only screen and (max-width: $media-small) {
    .personaMain {
      max-width: 100%;
      padding-left: 0;
      padding-right: 0;
    }

    .imgCol {
      background-image: url("../assets/yourJourneys2Mob.jpg");
    }

  }
</style>
