<template>
    <b-container>
        <b-row class="survey-question">
            <b-col>
                <p><span class="bold">Question {{ index + 1 }}:</span> {{ question.question }}</p>
            </b-col>
        </b-row>

        <b-row class="survey-option">
            <b-col v-for="(option, x) in question.options" 
              :key="x"
              @click="selectOption(x)"
              :class="selectClass(x)">
                <!-- {{ option.img }} -->
                {{ option.desc }}

                <!-- <b-form-checkbox>
                  {{ option.desc }}
                </b-form-checkbox> -->
            </b-col>
        </b-row>

        <b-row>
          <b-col>
            <div class="survey-text">
              <label for="survey-text-response">Are there any other comments you'd like to make on these choices?</label>
              <textarea v-model="surveyText" placeholder="Enter text here" class="form-control" rows="2" ></textarea>
            </div>
          </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-button @click="nextQuestion">Next</b-button>
            </b-col>
        </b-row>
    </b-container>
    
</template>

<script>
import { mapMutations } from 'vuex'
export default { 
  name: 'SurveyQuestion',
  props: {
    question: Object,
    index: Number
  },
  data() {
    return {
      selected: -1,
      surveyText: ""
    }
  },
  computed: {
  },
  methods: {
    ...mapMutations([
    'incrementIndex'
    ]),

    nextQuestion() {
      // Fire off the response to the API
      let session_id = "aASDykeasdACAE34234"
        let payload = {
          q_id: this.index,
          option: this.selected,
          text: this.surveyText,
          s_id: session_id
        }
        console.log(payload)
        this.incrementIndex()
        this.resetSelected()
    },

    selectOption(x) {
      this.selected = x
    },

    resetSelected() {
      // This is potentially redundant as the component gets destroyed
      this.selected = -1
      this.surveyText = ""
    },

    selectClass(x) {
      let selectClass = ''
      if(this.selected === x) {
        selectClass = 'selected'
      }
      // console.log('returning class for', x, selectClass)
      return selectClass
    }
  }
}
</script>

<style scoped lang="scss">

.bold {
    font-weight: bold;
}

.selected {
  background-color: lightblue;
}

</style>