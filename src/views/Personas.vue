<template>
  <div class="idoc">
    <b-container class="personaMain">
      <b-row v-if="!privacyNotice">
        <welcomeConsent title="Your Journeys" page="journeys" @finishedWelcome="welcomeScreen=false"></welcomeConsent>
      </b-row>
      <b-row>
        <b-col>
          <MainHeader title="Explore Your Journeys" resultMessage></MainHeader>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="introText">Six people and six different journeys that reflect real experiences of travelling on Metro and other trains that people have shared with us*. Step into their shoes, experience the new trains from their points of view, and think about how well they fit their needs. Each journey consists of six video clips with one or more questions after each (not recorded). Pick someone to begin.</b-col>
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
              Step into {{ person.name }}'s shoes:
              {{ person.desc }}
            </p>
            <div class="text-center">
              <b-button :to="`/journeys/${person.name}`" variant="primary" class="followButton">Follow {{ person.name }}'s journey</b-button>
            </div>
          </div>
        </b-row>

      </div>

      <b-row>
        <b-col class="outroText">*These are made-up people based on the experiences of real people.</b-col>
      </b-row>

      <b-row>
        <b-col class="imgCredits">
          Image credits: Jessica: Photo by <a href="https://unsplash.com/@4dgraphic">https://unsplash.com/@4dgraphic</a> | Robert: Photo by <a href="https://unsplash.com/@nathanmcdine">https://unsplash.com/@nathanmcdine</a> | Sanjeev: Photo by <a href="https://unsplash.com/@haadi7">https://unsplash.com/@haadi7</a> | Polly: Photo by <a href="https://unsplash.com/@realbench">https://unsplash.com/@realbench</a> | Desmond: <a href="https://pixnio.com/people/male-men/portrait-of-older-african-man-close-up-face">https://pixnio.com/people/male-men/portrait-of-older-african-man-close-up-face</a> | Mary: <a href="https://pxhere.com/en/photo/807134">https://pxhere.com/en/photo/807134</a>

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
      'getPersonas',
      'getUuid',
      'privacyNotice'
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
      if(this.windowWidth > 764) {
        // url = 'https://cdn.metrofutures.org.uk/personas/images/' + this.getPersonas[personaIndex].name.toLowerCase() + '-square.jpg'
        url = `https://cdn.metrofutures.org.uk/personas/images/${this.images[1].images[personaIndex]}`
      } else {
        url = `https://cdn.metrofutures.org.uk/personas/images/${this.images[0].images[personaIndex]}`
      }
      
      return `url(${url})`
    },
    getSession() {
      this.axios.get(`${process.env.VUE_APP_API_URL}/api/get-session`)
    },
    postGA() {
      // google analytics post request
      const measurementID = process.env.VUE_APP_GA_ID;
      const clientID = this.getUuid;
      const page = this.$route.path;
      const pageName = this.$route.name;
      const documentHost = location.host;

      const fullURL = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=' + measurementID + '&cid=' + clientID + '&t=pageview&dh=' + documentHost + '&dp=' + page + '&dt=' + pageName;
      this.axios.post(fullURL);
    }
  },
  mounted() {
    this.getSession()
    this.postGA()
  }
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
    // background-color: lightgray;
    background-size: cover;
    height: 200px;
    line-height: 20.5em;
    padding-left: 0;
    z-index: 10;
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
    z-index: 100;
    padding-top: 1.5em;
    padding-left: 1.5em;
    padding-right: 1.5em;
    padding-bottom: 1.5em;
    font-family: $font-family-sans-serif;
  }

  .personaDesc {
    padding-left: 1em;
    padding-right: 1em;
    margin-bottom: 1em;
  }

  .followButton {
    font-weight: bold;
    padding-left: 3em;
    padding-right: 3em;
  }

  .personaContainer {
    text-align: left;
  }

  .introText {
    padding: 1em;
  }

  .imgCredits {
    padding-top: 1em;
    padding-bottom: 1.5em;
    font-size: 0.7em;
    font-style: italic;
    & a {
      color: black;
      text-decoration: underline;
    }
  }

  .outroText {
    padding-top: 1em;
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
      height: 100px;
      line-height: 7.9em;
    }

    .personaContainer:last-child {
      margin-bottom: 4em;
    }

    .introText {
      padding: 0.5em 1.75em 1em 1.75em;
    }

    .outroText {
      padding-top: 1em;
      
    }

    .imgCredits {
      padding-bottom: 1.5em;
    }

  }
</style>
