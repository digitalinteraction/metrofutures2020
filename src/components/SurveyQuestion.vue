<template>
    <b-container fluid>
        <b-row class="survey-question">
            <!--image column-->

            <b-col class="largeImgColumn col-lg-9 col-12">

                <!--                todo stadler logo over image-->
                <!--                todo day and night option-->



                <!--                Survey questions changing images -->
                <b-img fluid  v-bind:src="image"></b-img>

                <!--               day/night switch-->
                <b-form-group id="dayNightToggle">
                    <b-form-radio-group
                            id="btn-radios-1"
                            buttons
                            name="radios-btn-default" button-variant="outline-dark"
                    >
                        <b-form-radio v-model="lighting" checked=true value=1>
                            <b-icon-sun></b-icon-sun>
                        </b-form-radio>
                        <b-form-radio  v-model="lighting" value=2>
                            <b-icon-moon></b-icon-moon>
                        </b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
            </b-col>


            <!--            interaction column-->


            <!--            survey-->
            <b-col class="col-lg-3 col-12">
                <b-row>
                    <!--                    todo either hide back on 1st question or go back to local authority-->
                    <b-col>
                        <p id="backOption" @click="previousQuestion">
                            <b-icon-chevron-left></b-icon-chevron-left>
                            Back
                        </p>
                    </b-col>
                </b-row>
                <!--                Question-->
                <b-row class="questionTextRow">
                    <p class="calvert"><span class="bold">{{ question.question }}</span></p>
                </b-row>

                <!--Options-->
                <b-row class="survey-option">
                    <b-col>
                        <b-row class="optionRow" align-v="center" v-for="(option, x) in question.options"
                               :key="x"
                               @click="selectOption(x)"
                               :class="selectClass(x)">
                            <!--                            todo replace with appropriate choices per question using {{ option.img }}-->
                            <b-col class="optionImg">
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
                            <textarea v-model="surveyText" placeholder="Got something to say? Let us know..."
                                      class="form-control" rows="2"></textarea>
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
                image: 'https://cdn.metrofutures.org.uk/conf/Camera1_1_1_0_0_0_1_1.jpg', //image from CDN
                survey: false, //flag to show LA question is complete so survey can begin,

                otherLA: false, // flag to show user has selected free text option
                LAOtherText: '',
                lighting: '',
                frontImg:'' //image of front of train for local authority question
            }

        },
        watch: {
            lighting: function() {
                // // change what URL is used for image accordingly
                // if (this.lighting === 1) {
                //     this.image = this.imageDay;
                // } else if (this.lighting === 2) {
                //     this.image = this.imageNight;
                // }
                this.fetchImage();
            },
             index: function() {
                 // this.imageDay = this.nextImageURLDay;
                 // this.imageNight = this.nextImageURLNight;
                 // if (this.lighting === 1) {
                 //     this.image = this.imageDay;
                 // } else if (this.lighting === 2) {
                 //     this.image = this.imageNight;
                 // }

                 this.fetchImage();
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

                        this.axios.post(`${process.env.VUE_APP_API_URL}/api/response/survey`, {
                            headers: {
                                Cookie: this.$cookies.get('mfsid')
                            },
                            params: payload
                        })
                            .then(response => {
                                console.log('get image response: ' + response);
                            })
                            .catch(error => error.response ? console.log(error.response.data) : console.log(error))

                        // update stored answers
                        this.addConfigAnswer(payload);
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

                this.reduceIndex();
                this.resetSelected();
                this.displayError = false;
            },

            selectOption(x) {
                this.selected = x
                this.displayError = false;
                // this.generateURLForNextImage();
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
            generateURLForNextImage() {
                const answers = this.getConfigAnswers;

                // get any answers stored and replace any undefined with 1
                let o1 = answers[0] !== undefined ? answers[0]+1 : 1;
                let o2 = answers[1] !== undefined ? answers[1]+1 : 1;
                let o3 = answers[2] !== undefined ? answers[2]+1 : 1;
                let o4 = answers[3] !== undefined ? answers[3]+1 : 1;
                let o5 = answers[4] !== undefined ? answers[4]+1 : 1;
                let o6 = answers[5] !== undefined ? answers[5]+1 : 1;



                //camera angle
                let cam = 1;
                if (this.index+1 === 1) {
                    cam = 2;
                } else if (this.index+1 === 2) {
                    // pole design
                    cam = 3;
                } else if (this.index+1 === 3) {
                    // bike stand
                    cam = 4;
                } else if (this.index+1 === 4 || this.index+1 === 5) {
                    // priority seats
                    cam = 14;
                }

                const day = {
                    cam,
                    o1,
                    o2,
                    o3,
                    o4,
                    o5,
                    o6,
                    o7: 1,
                }

                const night = {
                    cam,
                    o1,
                    o2,
                    o3,
                    o4,
                    o5,
                    o6,
                    o7: 2,
                }
                // line up day time URL
                 this.axios.get(`${process.env.VUE_APP_API_URL}/api/images/image`, {
                        headers: {
                            Cookie: this.$cookies.get('mfsid')
                        },
                        params: day
                    })
                        .then(response => {

                            this.nextImageURLDay = response.data;
                        })
                        .catch(error => error.response ? console.log('fetch image error' + error.response.data) : console.log(error))

                // line up night time URL
                this.axios.get(`${process.env.VUE_APP_API_URL}/api/images/image`, {
                    headers: {
                        Cookie: this.$cookies.get('mfsid')
                    },
                    params: night
                })
                    .then(response => {

                        this.nextImageURLNight = response.data;
                    })
                    .catch(error => error.response ? console.log('fetch image error' + error.response.data) : console.log(error))
                console.log(this.nextImageURLDay);
                console.log(this.nextImageURLNight);
            },

            async fetchImage() {
                 const answers = this.getConfigAnswers;

                // get any answers stored and replace any undefined with 1
                let o1 = answers[0] !== undefined ? answers[0]+1 : 1;
                let o2 = answers[1] !== undefined ? answers[1]+1 : 1;
                let o3 = answers[2] !== undefined ? answers[2]+1 : 1;
                let o4 = answers[3] !== undefined ? answers[3]+1 : 1;
                let o5 = answers[4] !== undefined ? answers[4]+1 : 1;
                let o6 = answers[5] !== undefined ? answers[5]+1 : 1;
                let o7 = this.lighting ? parseInt(this.lighting) : 1;


                //camera angle
                let cam = 1;
                if (this.index === 1) {
                    cam = 2;
                } else if (this.index === 2) {
                    // pole design
                    cam = 3;
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
                this.imageAPICall(payload);
            },
            async imageAPICall(payload) {
                console.log('requesting image with this payload: ');
                console.log(payload);

                this.axios.get(`${process.env.VUE_APP_API_URL}/api/images/image`, {
                    headers: {
                        Cookie: this.$cookies.get('mfsid')
                    },
                    params: payload
                })
                    .then(response => {

                       this.image = response.data;
                       })
                    .catch(error => error.response ? console.log('fetch image error' + error.response.data) : console.log(error))
            }
        },
        mounted() {
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

    #localAuthority {
        padding-left: 1em;
        padding-top: 2em;

        & p:after {
            content: "";
            display: block;
            width: 40%;
            padding-top: 1em;
            margin-bottom: 1.5em;
            border-bottom: 2px solid #FEC600;
        }
    }

    .largeImgColumn {
        padding-right: 0;
    }

    .questionTextRow {
        & p {
            padding-top: 2em;
            padding-left: 1.5em;
        }
    }

    /*Fix to make a half border under question*/
    .questionTextRow:after {
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

    #LATextDiv {
        width: 100%;
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

    #textarea {
        margin-top: 1em;

    }

    #dayNightToggle {
        position: absolute;
        top: 5%;
        left: 5%;

        & .btn {
            background-color: white;
        }

        & svg {
            fill: black;
        }
    }

    .surveyFreeText {
        text-align: left;
        padding: 1em;
        font-weight: bold;
        font-size: small;

    }


    #LAButton {
        margin-top: 1em;
    }

    /* Medium devices */
    @media only screen and (max-width: 600px) {
        .optionImg {
            width: 70px;
            height: auto;
        }
    }



</style>
