<template>
  <div class="survey">
    <PrivacyNotice v-if="!privacyNotice"/>

    <b-container fluid align="center" v-if="privacyNotice">

      <b-row id="headerRow" align-v="center">
        <b-col >
          <b-img id="logo" src="../assets/metroLogoTemp.png" fluid alt="Metro logo"></b-img>
        </b-col>
        <b-col>
          <h3 class="calvert">Configure your Metro</h3>
        </b-col>
        <b-col>
<!--           todo add link here-->
          <p>Explore some of our Metro users?</p>
        </b-col>
      </b-row>

      <b-row class="surveyBreadcrumb" align-v="center">
          <b-col id="breadcrumb0" v-bind:class="checkSelected(0)" class="firstMenuCol breadItem" v-on:click="clickBreadcrumb(0)" >Metro</b-col>
          <b-col id="breadcrumb1" v-bind:class="checkSelected(1)" class="breadItem" v-on:click="clickBreadcrumb(0)">Seating Design</b-col>
          <b-col id="breadcrumb2" class="breadItem" v-on:click="clickBreadcrumb(1)">Priority Seating</b-col>
          <b-col id="breadcrumb3" class="breadItem" v-on:click="clickBreadcrumb(2)">Grab Pole & Doors</b-col>
          <b-col id="breadcrumb4" class="breadItem" v-on:click="clickBreadcrumb(3)">Centre Poles</b-col>
          <b-col id="breadcrumb5" class="breadItem" v-on:click="clickBreadcrumb(4)">Bike Racks</b-col>
          <b-col id="breadcrumb6" class="breadItem" v-on:click="clickBreadcrumb(5)">Side Walls</b-col>
          <b-col id="breadcrumb7" class="lastMenuCol breadItem" v-on:click="clickSummaryBreadcrumb()">Summary</b-col>
      </b-row>

      <b-row>
        <b-col>
          <SurveyQuestion :question="this.questions[index]" :index="index" />
        </b-col>
      </b-row>
        
    </b-container>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

// @ is an alias to /src
import SurveyQuestion from '@/components/SurveyQuestion.vue'
import PrivacyNotice from '@/components/PrivacyNotice.vue'

export default {
  name: 'Home',
  components: {
    SurveyQuestion,
    PrivacyNotice
  },
  data() {
    return {
      selections: [],
      summary: false
    }
  },
  computed: {
    ...mapState([
      'questions',
      'index',
      'configAnswers'
    ]),
    ...mapGetters([
      'privacyNotice'
    ])
  },
  methods: {
    ...mapMutations([
      'setIndex'
    ]),
      checkSelected: function(breadcrumbIndex) {
          if (this.index === breadcrumbIndex) {
              console.log('found');
              return 'breadSelected';
          }
      },
    // next: function() {
    //   if (this.index < this.questions.length - 1) {
    //     this.index++
    //   }
    // },
    clickBreadcrumb(breadcrumbIndex) {
      // navigate to previously completed questions but not current index or uncompleted questions
        if (breadcrumbIndex !== this.index && this.configAnswers[breadcrumbIndex] !== undefined) {
            this.setIndex(breadcrumbIndex);
        }
    },
    clickSummaryBreadcrumb() {
      // todo nav to summary only if user has answered all questions
    }
  },
  async mounted() {
    this.axios.get(`${process.env.VUE_APP_API_URL}/api/get-session`)
            .then(response => {
              console.log(response);
            })
    console.log(this.selected);


    // google analytics post

    const measurementID = "UA-85374573-24";
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
  padding: 1em;
  background-color: #00000029;
  font-size: small;
}


.breadItem {
  font-family: "Open Sans", sans-serif;
}

.breadItem.breadSelected {
  border-bottom: 2px solid #FEC600;
  color: #FEC600;
}



  @media only screen and (min-width: 768px) {
    /*centre menu columns on larger screens*/
    .firstMenuCol {
      margin-left: 4em;
    }

    .lastMenuCol {
      margin-right: 4em;
    }

  }
</style>
