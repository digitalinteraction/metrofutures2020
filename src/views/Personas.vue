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
          <!-- <b-col class="imgCol" @click="selectPersona(pIndex)" :style="{ backgroundImage: 'url('+')'}"> -->
          <b-col class="imgCol" @click="selectPersona(pIndex)" :style="{ backgroundImage: getBackground(pIndex)}">
          <!-- <b-col class="imgCol" @click="selectPersona(pIndex)" :style="{ background-image: 'url('+getBackground(pIndex)+')'}"> -->
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
      windowWidth: window.innerWidth,
      enabled: false,
      cdnUrl: "https://cdn.metrofutures.org.uk/personas/images/",
      selected: null,
      images: [
        {type: "mob",
        images: [
          "jessica-mob.jpg",
          "sanjeev-mob.jpg",
          "desmond-mob.jpg",
          "polly-mob.jpg",
          "robert-mob.jpg",
          "mary-mob.jpg",
        ]},
        {type: "desk",
        images: [
          "jessica-desktop.jpg",
          "sanjeev-desktop.jpg",
          "desmond-desktop.jpg",
          "polly-desktop.jpg",
          "robert-desktop.jpg",
          "mary-desktop.jpg",
        ]}
      ]
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
    getBackground(personaIndex) {
      let url = ""
      if(this.windowWidth > 700) {
        console.log("Desktop")
        url = `https://cdn.metrofutures.org.uk/personas/images/${this.images[1].images[personaIndex]}`
      } else {
        url = `https://cdn.metrofutures.org.uk/personas/images/${this.images[0].images[personaIndex]}`
      }
      
      return `url(${url})`
    }
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
    // background-image: url("../assets/yourJourneys2Mob.jpg");
    background-color: lightgray;
    background-size: cover;
    height: 100px;
    line-height: 7.9em;
    padding-left: 0;
  }

  .title {
    background-color: rgba($color: #000000, $alpha: 0.55);
    color: white;
    padding: 1em 1em 0.75em 2em ;
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
      // background-image: url("../assets/yourJourneys2Mob.jpg");
    }

    .personaContainer:last-child {
      margin-bottom: 4em;
    }

  }
</style>
