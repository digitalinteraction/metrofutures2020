<template>
  <div class="survey">
    <PrivacyNotice v-if="!privacyNotice"/>

    <b-container class="bv-example-row" v-if="privacyNotice">

      <b-row>
        <b-col>
          <h3>Design Survey</h3>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="surveyBreadcrumb">
          <span class="breadItem breadSelected">Metro</span>
          <span class="breadItem">Seating</span>
          <span class="breadItem">Grabpoles</span>
          <span class="breadItem">Flooring</span>
          <span class="breadItem">Dividers</span>
          <span class="breadItem">Bike Racks</span>
          <span class="breadItem">Summary</span>
        </b-col>
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
      if (this.index < this.questions.length - 1) {
        this.index++
      }
    }
  }
}

</script>

<style lang="scss">

.privacy-text {
  border: 1px solid #000;
}

.surveyBreadcrumb {
  padding-bottom: 0.5em;
}

.breadItem {
  display: inline;
  padding: 0.25em;
  font-style: italic;
  background-color: #eee;
  color: #aaa;
}

.breadItem.breadSelected {
  border-bottom: 2px solid yellow;
  color: black;
}
</style>
