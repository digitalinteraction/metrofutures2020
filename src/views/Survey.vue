<template>
  <div class="survey">

     <b-container fluid align="center">

      <b-row id="headerRow" align-v="center">
        <b-col >
          <router-link to="/">
            <b-img class="float-left" id="logo" src="../assets/metroLogoTemp.png" fluid alt="Metro logo"></b-img>
          </router-link>
        </b-col>
          <h3 class="calvert">Your Choices</h3>

        <b-col>
<!--           todo add link here-->
          <MainMenu class="text-right"></MainMenu>
          <!-- <p v-on:click="goTo('/journeys')" class="float-right personasLink" >Explore some of our Metro users?</p> -->
        </b-col>
      </b-row>

      <b-row class="surveyBreadcrumb fullScreenMenu" align-v="center">
          <b-col id="breadcrumb0" v-bind:class="[checkSelected(0), checkCompleted(0)]" class="firstMenuCol breadItem" v-on:click="clickBreadcrumb(0)" >Floor, seats and glass partitions</b-col>
          <b-col id="breadcrumb1" v-bind:class="[checkSelected(1), checkCompleted(1)]" class="breadItem" v-on:click="clickBreadcrumb(1)">Doors, grab poles and floor markings</b-col>
          <b-col id="breadcrumb3" v-bind:class="[checkSelected(2), checkCompleted(2)]" class="breadItem" v-on:click="clickBreadcrumb(2)">Centre grab poles</b-col>
          <b-col id="breadcrumb4" v-bind:class="[checkSelected(3), checkCompleted(3)]" class="breadItem" v-on:click="clickBreadcrumb(3)">Bike racks</b-col>
          <b-col id="breadcrumb5" v-bind:class="[checkSelected(4), checkCompleted(4)]" class="breadItem" v-on:click="clickBreadcrumb(4)">Seats</b-col>
          <b-col id="breadcrumb6" v-bind:class="[checkSelected(5), checkCompleted(5)]" class="breadItem" v-on:click="clickBreadcrumb(5)">Lower side wall</b-col>
          <b-col id="breadcrumb7" v-bind:class="[checkSelected(6), checkCompleted(6)]" class="breadItem" v-on:click="clickBreadcrumb(6)">Side wall design</b-col>
          <b-col id="breadcrumb8" v-bind:class="[checkSelected(7), checkCompleted(7)]" class="lastMenuCol breadItem" v-on:click="clickSummaryBreadcrumb(7)">Summary</b-col>
      </b-row>

         <b-row class="surveyBreadcrumb mobileMenu" align-v="center">
<!--             <b-col @click="moveMobileMenuL()">Left</b-col>-->
             <b-col id="mobileBreadcrumb1" v-bind:class="[ checkSelected(0), checkCompleted(0), checkCentreMobile(0)] " class="breadItem mobileBread" v-on:click="clickBreadcrumb(0)" >Floor, seats and glass partitions</b-col>
             <b-col id="mobileBreadcrumb2"  v-bind:class="[ checkSelected(1), checkCompleted(1) , checkCentreMobile(1)]" class="breadItem mobileBread" v-on:click="clickBreadcrumb(1)">Doors, grab poles and floor markings</b-col>
             <b-col  id="mobileBreadcrumb3" v-bind:class="[ checkSelected(2), checkCompleted(2), checkCentreMobile(2)]" class="breadItem mobileBread" v-on:click="clickBreadcrumb(2)">Centre grab poles</b-col>
             <b-col  id="mobileBreadcrumb4" v-bind:class="[ checkSelected(3),checkCompleted(3), checkCentreMobile(3)]" class="breadItem mobileBread" v-on:click="clickBreadcrumb(3)">Bike racks</b-col>
             <b-col  id="mobileBreadcrumb5" v-bind:class="[ checkSelected(4),checkCompleted(4), checkCentreMobile(4)]" class="breadItem mobileBread" v-on:click="clickBreadcrumb(4)">Seats</b-col>
             <b-col id="mobileBreadcrumb6" v-bind:class="[ checkSelected(5),checkCompleted(5), checkCentreMobile(5)]" class="breadItem mobileBread" v-on:click="clickBreadcrumb(5)">Lower side wall</b-col>
             <b-col id="mobileBreadcrumb7" v-bind:class="[ checkSelected(6),checkCompleted(6), checkCentreMobile(6)]" class="breadItem mobileBread" v-on:click="clickBreadcrumb(6)">Side wall design</b-col>
             <b-col id="mobileBreadcrumb8" v-bind:class="[ checkSelected(7), checkCompleted(7), checkCentreMobile(7)]" class="breadItem mobileBread" v-on:click="clickSummaryBreadcrumb(7)">Summary</b-col>
<!--             <b-col @click="moveMobileMenuR()">Right</b-col>-->
         </b-row>

        <b-row v-if="welcomeScreen">
            <SurWelcome @finishedWelcome="welcomeScreen=false"></SurWelcome>
        </b-row>

      <span v-if="!summary && !welcomeScreen">
        <b-row 
          v-for="(question, qindex) in this.questions"
          :key="qindex"
          v-show="screens[qindex]"
        >
          <SurveyQuestion
          :question="question"
          :index="qindex"
          :answers="configAnswers"
          ></SurveyQuestion>

        </b-row>
      </span>

        <b-row v-if="summary && !welcomeScreen">
            <SurSummary></SurSummary>
      </b-row>


        
    </b-container>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

// @ is an alias to /src
import SurveyQuestion from '@/components/SurveyQuestion.vue'
// import PrivacyNotice from '@/components/PrivacyNotice.vue'
  import SurSummary from '@/components/SurSummary.vue'
  import router from "../router";
  import SurWelcome from "../components/SurWelcome";
  import MainMenu from '@/components/MainMenu.vue';

export default {
  name: 'Home',
  components: {
      SurWelcome,
    SurveyQuestion,
    // PrivacyNotice,
      SurSummary,
      MainMenu,
  },
  data() {
    return {
      selections: [],
      welcomeScreen: true,
      screens: [
        true, 
        false, 
        false, 
        false, 
        false, 
        false,
        false
      ]
    }
  },
  computed: {
    ...mapState([
      'questions',
      'index',
      'configAnswers'
    ]),
    ...mapGetters([
      'privacyNotice',
        'getConfigAnswers'
    ]),
      summary: function() {
        // view summary when question index shows the user has passed the final question
        return this.index >= this.questions.length;
      }
  },
  methods: {
    ...mapMutations([
      'setIndex'
    ]),
    toggleScreen(qindex) {
      this.screens[qindex] = !this.screens[qindex]
    },
    nextScreen(qindex) {
      if(qindex >= this.screens.length-1) {
        console.log("Can't increment as:", qindex, this.screens.length-1)
      } else {
        this.toggleScreen(qindex)
        this.toggleScreen(qindex+1)
      }
    },
    prevScreen(qindex) {
      if (qindex > 0) {
        this.toggleScreen(qindex)
        this.toggleScreen(qindex-1)
      } else {
        console.log("Can't decrement as:", qindex)
      }
    },
      moveMobileMenul(breadcrumbIndex) {
        if (breadcrumbIndex !== 0) {
            // make currently highlighted breadcrumb disapear

            // show previous breadcrumb
        }

      },
    goToScreen(qindex) {
      // Disable all other screens and enable specified screen
      let i, n = this.screens.length
      for (i = 0; i < n; ++i) {
        this.screens[i] = false
      }
      this.screens[qindex] = true
    },
    checkSelected: function(breadcrumbIndex) {
      if (breadcrumbIndex === 7 && this.summary === true) {
          //highlight summary
          return 'breadSelected';  // Delicious :-D
      }
      // don't highlight first breadcrumb until welcome screen is completed
        else if (breadcrumbIndex === 0 && this.welcomeScreen === false && this.index === breadcrumbIndex) {
          return 'breadSelected';
      } else if (breadcrumbIndex !== 0 && this.index === breadcrumbIndex) {
            return 'breadSelected';
        }
    },
    checkCompleted: function(breadcrumbIndex) {
      const answers = this.getConfigAnswers;
      // if answer is stored, apply different class to breadcrumb item
        if (answers[breadcrumbIndex] !== undefined) {
            return 'qAnswered';
        }
    },
      checkCentreMobile(breadcrumbIndex) {
          if (breadcrumbIndex === 7 && this.summary === true) {
              //highlight summary
              return 'displayBread';  // Delicious :-D
          }
          // don't highlight first breadcrumb until welcome screen is completed
          else if (breadcrumbIndex === 0 && this.welcomeScreen === false && this.index === breadcrumbIndex) {
              return 'displayBread';
          } else if (breadcrumbIndex !== 0 && this.index === breadcrumbIndex) {
              return 'displayBread';
          }
      },
    clickBreadcrumb(breadcrumbIndex) {
        console.log(breadcrumbIndex)
      // navigate to previously completed questions but not current index or uncompleted questions
        if (breadcrumbIndex !== this.index && this.configAnswers[breadcrumbIndex] !== undefined) {
            this.setIndex(breadcrumbIndex);
            this.goToScreen(breadcrumbIndex)
        }
    },
    clickSummaryBreadcrumb() {
        console.log('survey clicked');
      // Navigate to summary if the user has answered all questions
        if (this.surveyComplete()) {
            this.setIndex(this.questions.length);
        }
    },
      surveyComplete() {
          for ( const answer in this.getConfigAnswers) {
              if (Object.prototype.hasOwnProperty.call(this.getConfigAnswers, answer)) {
                  if (this.getConfigAnswers[answer] === undefined) {
                      console.log('survey incomplete');
                      return false;
                  }
              }
          }
          console.log('survey complete');
          return true;
      },
      goTo(route) {
          router.push(route);
      }
  },

  async mounted() {
    this.axios.get(`${process.env.VUE_APP_API_URL}/api/get-session`)
            .then(response => {
              console.log(response);
            })

    // google analytics post

    const measurementID = process.env.VUE_APP_GA_ID;
    const clientID = this.$cookies.get('mfsid');
    const page= this.$route.path;
    const pageName = this.$route.name;
    const documentHost = location.host;

    const fullURL = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=' + measurementID + '&cid=' + clientID + '&t=pageview&dh=' + documentHost + '&dp=' + page + '&dt=' + pageName;
    this.axios.post(fullURL);
  }
}

</script>

<style lang="scss">

  #logo {
    height: 4em;
  }
  .calvert {
    font-family: Calvert, serif;
  }


.privacy-text {
  border: 1px solid #000;
}

.surveyBreadcrumb {
 // padding: 1em;
    background-color: #00000029;
    font-size: small;
}

// for mobiles, only show current breadcrumb in screen centre
  .mobileBread {
      display: none;
  }

  .displayBread {
display: flex;
}

.hideBread {
    display: none;
}

.breadItem {
  font-family: "Open Sans", sans-serif;
    padding: 1em;
    color: grey;
}

.personasLink {
    border-bottom: 1px solid #FEC600;
    cursor: pointer;
}

.breadItem.breadSelected {
  /*  todo remove space between yellow line and bottom edge of grey bar*/
  border-bottom: 4px solid #FEC600;
  color: black;
    font-weight: bold;
}

/*class to add to breadcrumb items to show question has been completed so is now clickable*/
.qAnswered {
    color: black;
    cursor: pointer;
}

.mobileMenu {
    display: flex;
}

  @media only screen and (max-width: 764px) {
  .fullScreenMenu {
      display: none;
  }

  }

  @media only screen and (min-width: 765px) {
    /*centre menu columns on larger screens*/
    .firstMenuCol {
      margin-left: 4em;
    }

    .lastMenuCol {
      margin-right: 4em;
    }
      .mobileMenu {
          display: none;
      }


  }
</style>
