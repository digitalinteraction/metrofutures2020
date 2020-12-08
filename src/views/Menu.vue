<template>
  <div class="menu">
    <b-container>
      <b-row v-if="getWelcome">
        <welcomeConsent title="Consultation Now Closed" page="menu" @finishedWelcome="disableWelcomeModal()"></welcomeConsent>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col align="center">
          <b-img id="metroLogo" src="../assets/metroLogoTemp.png" fluid alt="Metro logo"></b-img>
        </b-col>
        <b-col>
          <MainMenu class="text-right" ></MainMenu>
          <!-- <p id="aboutText" v-on:click="goTo('/about')">
            About Metro Futures
            <b-icon-chevron-down variant="primary"></b-icon-chevron-down>
          </p> -->
        </b-col>
      </b-row>

      <!--todo what happens instead of hover on touch screens?-->
      <!--Desktop-->
      <b-row class="menu-row">
        <!--                --------------- Your Metro option-->
        <b-col
          v-on:click="goTo('/explore')"
          @mouseover="hoverYourMetro = true"
          @mouseleave="hoverYourMetro = false"
          class="menuCol"
        >
          <div v-show="!hoverYourMetro">
            <b-img class="menuImg" src="../assets/yourMetro.png" fluid alt="image of inside of carriage"></b-img>
            <h3 class="imgTitles">Explore Your Metro</h3>
          </div>

          <div v-show="hoverYourMetro" class="hoveredImg">
            <b-img class="enlargeImg" src="../assets/yourMetro.png" fluid alt="image of inside of carriage"></b-img>
            <div class="moreInfo w-100">
              <h3>Explore Your Metro</h3>
              <p>Explore features of the new trains in 360 degrees.</p>
            </div>
          </div>
        </b-col>

        <!--                --------------- Your Choice option-->
        <b-col
          @click="goTo('/configure')"
          @mouseover="hoverYourChoice = true"
          @mouseleave="hoverYourChoice = false"
          class="menuCol"
        >
          <div v-show="!hoverYourChoice">
            <b-img class="menuImg" src="../assets/yourChoiceTemp.png" fluid alt="image of train front"></b-img>
            <h3 class="imgTitles">Configure Your Metro</h3>
          </div>

          <div v-show="hoverYourChoice" class="hoveredImg">
            <b-img
              class="enlargeImg"
              src="../assets/yourChoiceTemp.png"
              fluid
              alt="image of train front"
            ></b-img>
            <div class="moreInfo w-100">
              <h3>Configure Your Metro</h3>
              <p>Explore and configure the internal options of the future Metro.</p>
            </div>
          </div>
        </b-col>

        <b-col
          @click="goTo('/journeys')"
          @mouseover="hoverYourJourney = true"
          @mouseleave="hoverYourJourney = false"
          class="menuCol"
        >
          <div v-show="!hoverYourJourney">
            <b-img class="menuImg" src="../assets/yourJourneys2.jpg" fluid alt="image of example metro passenger"></b-img>
            <h3 class="imgTitles text-left">Your Journeys</h3>
          </div>

          <div v-show="hoverYourJourney" class="hoveredImg">
            <b-img class="enlargeImg" src="../assets/yourJourneys2.jpg" fluid alt="image of example metro passenger"></b-img>
            <div class="moreInfo w-100">
              <h3>Your Journeys</h3>
              <p>New trains need to work for different people and different journeys. Put yourself in someone else’s shoes to explore.</p>
            </div>
          </div>
        </b-col>
      </b-row>
      <!--/Desktop-->

      <!--Mobile Version-->
      <div class="menu-col-wrapper">
        <div class="mobile-option" v-on:click="goTo('/explore')">
          <div class="mobile-header">
            <b-img class="menuImg w-100" src="../assets/yourMetroMob.png" fluid alt="image of inside of carriage"></b-img>
            <div class="moreInfo">
              <h3>Explore Your Metro</h3>
            </div>
          </div>
          <p>Explore features of the new trains in 360 degrees.</p>
        </div>

        <div class="mobile-option" @click="goTo('/configure')">
          <div class="mobile-header">
            <b-img class="menuImg w-100" src="../assets/yourChoiceMob.png" fluid alt="image of train front"></b-img>
            <div class="moreInfo">
              <h3>Configure Your Metro</h3>
            </div>
          </div>
          <p>Explore and configure the internal options of the future Metro.</p>
        </div>
        
       <div class="mobile-option" @click="goTo('/journeys')">
          <div class="mobile-header">
            <b-img class="menuImg w-100" src="../assets/yourJourneys2Mob.jpg" fluid alt="image of example metro passenger"></b-img>
            <div class="moreInfo">
              <h3>Your Journeys</h3>
            </div>
          </div>
          <p>New trains need to work for different people and different journeys. Put yourself in someone else’s shoes to explore.</p>
        </div>

      </div>

      <!--/Mobile-->

      <br />
      <!-- <br /> -->
      <b-row>
        <b-col class="consultation-banner">
          The 2020 public consultation is now closed, click here to see the <router-link to="/findings">findings</router-link>.
        </b-col>
      </b-row>

      <b-row>
        <Footer></Footer>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations } from "vuex";
import Footer from "@/components/Footer";
import router from "../router";
import welcomeConsent from "../components/WelcomeConsent";
import MainMenu from '@/components/MainMenu.vue';

export default {
  name: "Menu",
  components: {
    welcomeConsent,
    Footer,
    MainMenu
  },
  data() {
    return {
      welcomeScreen: true,
      hoverYourMetro: false,
      hoverYourChoice: false,
      hoverYourJourney: false
    };
  },
  computed: {
    ...mapGetters(["getWelcome", "getUuid"])
  },
  methods: {
    ...mapMutations(["disableWelcomeModal"]),
    goTo(route) {
      router.push(route);
    },
  },
  async mounted() {
    this.axios
      .get(`${process.env.VUE_APP_API_URL}/api/get-session`)

    this.windowHeight = window.innerHeight;

    // google analytics post
    const measurementID = process.env.VUE_APP_GA_ID;
    const clientID = this.getUuid;
    const page = this.$route.path;
    const pageName = this.$route.name;
    const documentHost = location.host;

    const fullURL =
      "https://www.google-analytics.com/collect?v=1&t=pageview&tid=" +
      measurementID +
      "&cid=" +
      clientID +
      "&t=pageview&dh=" +
      documentHost +
      "&dp=" +
      page +
      "&dt=" +
      pageName;
    this.axios.post(fullURL);
  }
};
</script>

<style lang="scss">
/*todo -  on horizontal smaller screens the footer overlaps menu items */

.menu-col-wrapper {
  display: none;
}

#aboutText {
  color: black;
  float: right;
  margin-top: 3em;
  cursor: pointer;
  border-bottom: 1px solid #fec600;
  padding-bottom: 0.8em;
  text-align: right;
}

.text-right {
  color: black;
  float: right;
  margin-top: 3em;
  cursor: pointer;
  padding-bottom: 0.8em;
  text-align: right;

}

.menuCol {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.imgTitles {
  position: absolute;
  color: #ffffff;
  bottom: 8px;
  padding-left: 1.1em;
  /*font-size: xx-large;*/
  font-family: Calvert, serif;
}

/*todo this box should animate to rise from the bottom on hover rather than just appear*/
.moreInfo {
  position: absolute;
  color: #ffffff;
  bottom: 0;
  left: 0;
  background-color: rgba(black, 0.5);
  font-family: "Open Sans", sans-serif;
  text-align: left;

  & p {
    margin: 1.5em 2em 2em 2em;
    color: white;
  }

  & h3 {
    font-family: Calvert, serif;
    margin-left: 1.1em;
    margin-top: 1em;
  }
}
#metroLogo {
  text-decoration: none;
  position: relative;
  z-index: 10;
  top: 20px;
}
.menuImg {
  z-index: 3;
}
.hoveredImg {
  cursor: pointer;
  transform: scale(1.1);
  transform-origin: right;
  z-index: 5;
}

.mobile-header {
  position: relative;

  .moreInfo {
    h3 {
      font-family: Calvert, serif;
      margin-right: 1.1em;
      margin-top: 1em;
    }
  }


}

.mobile-option{
  position: relative;
  p{
    margin: 1em 2em 2em 2em;
    font-size: smaller;
    font-family: "Open Sans", sans-serif;}
}

.consultation-banner {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  background-color: lightgreen;
  z-index: 0;

  & a {
    color: black;
    text-decoration: underline;
  }
}




@media all and (max-width: 765px) {
  .menu-col-wrapper {
    display: block;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .menu-row {
    display: none;
  }
}
</style>
