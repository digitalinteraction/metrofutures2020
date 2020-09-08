<template>
    <b-container fluid>
        <b-row class="survey-question">
<!--image column-->
            <b-col class="largeImgColumn">
<!--                 todo image should change with each question-->
<!--                todo stadler logo over image-->
<!--                todo day and night option-->
                <b-img fluid :src="fetchImage()"></b-img>
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
                    <b-col >
                        <b-row class="optionRow" align-v="center" v-for="(option, x) in question.options"
                           :key="x"
                           @click="selectOption(x)"
                           :class="selectClass(x)">
<!--                            todo replace with appropriate choices per question using {{ option.img }}-->
                            <b-col class="optionImg" >
                                <b-img class="float-left" fluid src="../assets/metroLogoTemp.png"></b-img>
                            </b-col>
                            <b-col class="optionText">
                                <p>{{ option.desc }}</p>
                            </b-col>
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
            displayError: false,
            image: ''
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
            'addConfigAnswer'
        ]),

        nextQuestion() {
            // prevent navigation without answering (and if no stored answer)
            const answerStored = this.getConfigAnswers[this.index]
            if (this.selected !== -1 || answerStored !== undefined) {

                // you've answered now or in the past

                if (this.selected !== -1) {
                    //send new answer
                    let payload = {
                        type: 0,
                        qid: this.index,
                        resp: this.selected,
                        comment: this.surveyText
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
            if (this.selected === x) {
                selectClass = 'selected'
            }
            // console.log('returning class for', x, selectClass)
            return selectClass
        },
        async fetchImage() {
            console.log('fetch image for index: ' + this.index);
            // todo get any answers stored and replace any undefined with 1
            let o1 = 1;
            let o2 = 2;
            let o3 = 3;
            let o4 = 1;
            let o5 = 'ON';
            let o6 = 1;
            let o7 = 1; // todo set time of day



            //camera angle
            let cam = 1;
            if (this.index === 1) {
                //todo pole, door and floor markings camera angle
                cam = 1;
            } else if (this.index === 2) {
                // pole design
                cam = 2;
            } else if (this.index === 3) {
                // bike stand
                cam = 4;
            } else if (this.index === 4 || this.index === 5) {
                // priority seats
                cam = 14;
            }

            const payload = {
                cam,
                o1,
                o2,
                o3,
                o4,
                o5,
                o6,
                o7,
            }

            console.log(payload);


            return await this.axios.get('https://cdn.metrofutures.org.uk/conf/Camera1_1_1_0_0_0_1_1.jpg', {
                responseType: 'arraybuffer'
            })
            .then(response => Buffer.from(response.data, 'binary').toString('base64'))
        }
    }
}

</script>

<style scoped lang="scss">
 /*todo for smaller screens stack image and question columns and make image clickable to go horizontal full screen*/
    .survey-question {
        width: 100%;
    }

 .optionImg {
     padding-right: 0;
     padding-left: 0;

 }

 .largeImgColumn {
     padding-right: 0;
 }

 #questionTextRow {
     & p {
         padding-top: 2em;
         padding-left: 1.5em;
     }
 }

 /*Fix to make a half border under question*/
 #questionTextRow:after {
     content: "";
     display: block;
     width: 40%;
     padding-top: 1em;
     margin-bottom: 1.5em;
     border-bottom: 2px solid #FEC600;
 }

 .calvert {
     font-family: Calvert, serif;
 }

.optionText {
    padding-left: 0;
}

.optionRow {
    padding-bottom: 0.3em;
}

.bold {
    font-weight: bold;
}
#backOption {
    cursor: pointer;
    text-decoration: none;
    padding-top: 1em;
}

.selected {
  /*   todo add tick to image*/
  background-color: #DDDDDD;
    & img {
        border-right: 2px solid black;
    }
}



    .surveyFreeText {
    text-align: left;
    padding: 1em;
        font-weight: bold;
        font-size: small;
    }

</style>
