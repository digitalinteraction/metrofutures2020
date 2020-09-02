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
          <b-col class="firstMenuCol breadItem breadSelected">Metro</b-col>
          <b-col class="breadItem">Seating Design</b-col>
          <b-col class="breadItem">Priority Seating</b-col>
          <b-col class="breadItem">Grab Pole & Doors</b-col>
          <b-col class="breadItem">Centre Poles</b-col>
          <b-col class="breadItem">Bike Racks</b-col>
          <b-col class="breadItem">Side Walls</b-col>
          <b-col class="lastMenuCol breadItem">Summary</b-col>
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
import { mapState, mapGetters } from 'vuex'

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
      'index'
    ]),
    ...mapGetters([
      'privacyNotice'
    ])   
  },
  methods: {
    next: function() {
      // todo update classes to make breadcrumbs move along
      if (this.index < this.questions.length - 1) {
        this.index++
      }
    }
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
