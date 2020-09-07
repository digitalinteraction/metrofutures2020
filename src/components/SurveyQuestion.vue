<template>
    <b-container fluid>
        <b-row class="survey-question">
<!--image column-->
            <b-col cols="">
<!--                 todo image should change with each question-->
                <b-img fluid src="../assets/Sample.png"></b-img>
            </b-col>

<!--            interaction column-->
            <b-col cols="3">
                <b-row>
                    <b-col>
                        <p id="backOption" @click="previousQuestion"><b-icon-chevron-left></b-icon-chevron-left>Back</p>
                    </b-col>
                </b-row>
<!--                Question-->
                <b-row id="questionTextRow">
                    <p class="calvert"><span class="bold">{{ question.question }}</span></p>
                </b-row>

<!--Options-->
                <b-row class="survey-option">
                    <b-col>
                        <b-row align-v="center" v-for="(option, x) in question.options"
                           :key="x"
                           @click="selectOption(x)"
                           :class="selectClass(x)">
<!--                            todo replace with appropriate choices per question using {{ option.img }}-->
                        <b-img class="optionImg" fluid src="../assets/metroLogoTemp.png"></b-img>
                            <p class = "surveyOptionText">{{ option.desc }}</p>

                        <!-- <b-form-checkbox>
                          {{ option.desc }}
                        </b-form-checkbox> -->
                            </b-row>
                    </b-col>
                </b-row>

<!--                feedback section-->
                <b-row>
                    <b-col>
                        <div class="surveyFreeText">
                            <label class="calvert" for="survey-text-response">Leave Feedback (optional) </label>
                            <textarea v-model="surveyText" placeholder="Got something to say? Let us know..." class="form-control" rows="2" ></textarea>
                        </div>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-button block variant="outline-secondary" @click="nextQuestion">Continue</b-button>
                    </b-col>
                </b-row>

                <b-row v-if="displayError">
                    <b-col>
                        <p>Please select an option to continue</p>
                    </b-col>
                </b-row>

            </b-col>
        </b-row>


    </b-container>
    
</template>

<script>
    import {mapMutations, mapGetters} from 'vuex'
export default { 
  name: 'SurveyQuestion',
  props: {
    question: Object,
    index: Number
  },
  data() {
    return {
      selected: -1,
      surveyText: "",
      displayError : false
    }
  },
  computed: {
      ...mapGetters([
          'getConfigAnswers'
          ])
  },
  methods: {
    ...mapMutations([
    'incrementIndex',
        'reduceIndex',
        'addConfigAnswer',
        'lastQuestion'
    ]),

    nextQuestion() {
        // prevent navigation without answering (and if no stored answer)
        const answerStored = this.getConfigAnswers[this.index]
         if (this.selected !== -1 ||  answerStored !== undefined) {
             // you've answered now or in the past

             if (this.selected !== -1) {
                 //send new answer
                 let payload = {
                     q_id: this.index,
                     option: this.selected,
                     text: this.surveyText
                 }


                 this.axios.post(`${process.env.VUE_APP_API_URL}/api/send-response`, {
                     headers: {
                         Cookie: this.$cookies.get('mfsid')
                     },
                     payload
                 })
                     .then(response => {
                         console.log(response);
                     })
                     .catch(error => error.response ? console.log(error.response.data) : console.log(error))

                 // update stored answers
                 this.addConfigAnswer(payload);

                 console.log(payload)
             }

             // move to next question and be ready to accept next answers unless all questions have been completed
             this.incrementIndex()
             this.resetSelected()
             this.displayError = false;

             if (this.lastQuestion()) {
                 // todo display summary
                 console.log('last q complete');
             }

         } else {
             //you haven't answered
             console.log('error');
             this.displayError = true;
         }
    },

      previousQuestion() {
        console.log('go back to previous question')
        this.reduceIndex();
        this.resetSelected();
        this.displayError = false;
      },

    selectOption(x) {
      this.selected = x
      this.displayError = false;
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
 /*todo for smaller screens stack image and question columns and make image clickable to go horizontal full screen*/
    .survey-question {
        width: 100%;
    }

 #questionTextRow {
     border-bottom: 2px solid #FEC600;
     & p {
         padding: 2em;
     }
 }

 .calvert {
     font-family: Calvert, serif;
 }

.bold {
    font-weight: bold;
}
#backOption {
    cursor: pointer;
    text-decoration: none;
}

.selected {
  /*   todo add tick to image*/
  background-color: #DDDDDD;
    & img {
        border-right: 2px solid black;
    }
}

    .surveyOptionText {
        padding-left: 2em;
    }

    .surveyFreeText {
    text-align: left;
    padding: 1em;
        font-weight: bold;
        font-size: small;
    }

</style>
