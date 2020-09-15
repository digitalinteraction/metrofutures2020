<template>
    <b-container fluid id="surveyqContainer">
        <b-row class="survey-question text-left">
            <!--image column-->

            <b-col class="largeImgColumn col-lg-9 col-12 ">

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
                <b-row v-if="this.index !== 0">

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
                                <b-img class="float-left" v-bind:src="'/squares/' + option.img"></b-img>
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


<!--               <&#45;&#45; 2 different buttons depending on if q has previously been completed or not&ndash;&gt;-->
                <b-row>
                <b-col>
                    <b-button v-bind:class="displayContinue()" block variant="outline-secondary" @click="nextQuestion">Continue</b-button>
                </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-button v-bind:class="displayUpdate()" block variant="outline-secondary" @click="nextQuestion">Update</b-button>
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
            index: Number,
            answers: Object  // Used for the watch, passes in current answers
        },
        data() {
            return {
                selected: 0,  // It looks weird if 1st option isn't selected - but maybe this will screw with our data?
                surveyText: "",
                displayError: false,
                image: 'https://cdn.metrofutures.org.uk/conf/Camera1_1_1_0_0_0_1_1.jpg', // default placeholder image from CDN
                // optionImages: [], // Store all our URLs here
                optionImages: {
                    day: [],
                    night: []
                },
                lighting: "1",
                questionPreviouslyAnswered: false
            }

        },
        watch: {
            lighting: function() {
                if (this.lighting === "1") {
                    // console.log("Setting to daylight")
                    this.image = this.optionImages.day[this.selected]

                } else if (this.lighting === "2") {
                    this.image = this.optionImages.night[this.selected]
                }
            },
            answers: {
                // This causes quite a lot of loading simultaneously. Could rejig somewhere so that only daytime next images are loaded immediately, with a small delay on the others. Breadcrumbs tend to be navigated to before you submit (or not long after) - you rarely submit and then go backwards with a breadcrumb a long way

                // handler: function (newAnswers, oldAnswers) {  // You can see the old and new objects, but don't really need this
                handler: function () {

                    if (this.index === 6) {
                        // do alternate API call for final question
                        console.log(`Q${this.index} (final question): Detected answers changed, fetching new URLs`)
                        this.generateOptionURLsFinalQ();
                    } else {
                        console.log(`Q${this.index}: Detected answers changed, fetching new URLs`)
                        this.generateOptionURLs()
                    }
                },
                deep: true,  // Without this the watcher doesn't look at answers.[anything], so doesn't run
            },
        },
        computed: {
            ...mapGetters([
                'getConfigAnswers',
                'getIndex'
            ]),
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

                        if (this.index !== 6) {

                        this.axios.post(`${process.env.VUE_APP_API_URL}/api/response/survey`, {
                            headers: {
                                Cookie: this.$cookies.get('mfsid')
                            },
                            params: payload
                        })
                            .then(response => {
                                console.info('Survey response: ' + response);
                            })
                            .catch(error => error.response ? console.log(error.response.data) : console.log(error))

                    } else {
                            console.log('save new question');
                            // question 6 endpoint
                            // todo add in new endpoint here
                            // this.axios.post(`${process.env.VUE_APP_API_URL}/api/response/survey`, {
                            //     headers: {
                            //         Cookie: this.$cookies.get('mfsid')
                            //     },
                            //     params: payload
                            // })
                            //     .then(response => {
                            //         console.info('Survey response: ' + response);
                            //     })
                            //     .catch(error => error.response ? console.log(error.response.data) : console.log(error))
                        }

                        // update stored answers
                        this.addConfigAnswer(payload);
                    // move to next question
                    this.incrementIndex()

                    this.$parent.nextScreen(this.index)  // Trigger parent to render next question screen
                } else {
                    //you haven't answered
                    // console.log('error');
                    this.displayError = true;
                }
                }
            },
            displayContinue() {
                const answers = this.getConfigAnswers;
                // if answer is not stored, show
                if (answers[this.index] === undefined) {
                    return 'display';
                } else {
                    return 'hide';
                }
            },
            displayUpdate() {
                const answers = this.getConfigAnswers;
                // if answer is stored, show
                if (answers[this.index] !== undefined) {
                    return 'display';
                } else {
                    return 'hide';
                }
            },
            previousQuestion() {
                this.reduceIndex();
                this.$parent.prevScreen(this.index)  // Trigger parent to render previous question screen
                this.displayError = false;
            },

            selectOption(x) {
                // Maybe find a way to trigger the next item to load based on this?
                this.selected = x
                this.displayError = false;
                if(this.lighting === "1") {
                    this.image = this.optionImages.day[x]
                } else {
                    this.image = this.optionImages.night[x]
                }
            },
            selectClass(x) {
                let selectClass = ''
                if (this.selected === x) {
                    selectClass = 'selected'
                }
                return selectClass
            },

            async generateOptionURLs() {
                // Fetch all day and night URLs for our current index
                // Get a clean "basic" set of answers to generate
                let payload = this.sanitiseConfigAnswers()
                payload.qindex = this.index+1
                // Get day and night option image Urls and store in respective arrays
                this.allUrlsAPICall(payload)
                   
            },
            async generateOptionURLsFinalQ() {
                // Fetch all day and night URLs for our current index
                // Get a clean "basic" set of answers to generate
                let payload = this.sanitiseConfigAnswers()
                payload.qindex = this.index+1
                // Get day and night option image Urls and store in respective arrays
                this.allUrlsAPICallFinalQ(payload)

            },
            sanitiseConfigAnswers() {
                // Get and sanitise (remove undefined) the answers
                let answers = this.getConfigAnswers;

                // get any answers stored and replace any undefined with 1
                let o1 = answers[0] !== undefined ? answers[0]+1 : 1;
                let o2 = answers[1] !== undefined ? answers[1]+1 : 1;
                let o3 = answers[2] !== undefined ? answers[2]+1 : 1;
                let o4 = answers[3] !== undefined ? answers[3]+1 : 1;
                let o5 = answers[4] !== undefined ? answers[4]+1 : 1;
                let o6 = answers[5] !== undefined ? answers[5]+1 : 1;

                let cleanAnswers = {
                    cam: this.mapCameraByIndex(),
                    o1,
                    o2,
                    o3,
                    o4,
                    o5,
                    o6,
                    o7: this.lighting !== "" ? parseInt(this.lighting) : 1 // defaults to daylight otherwise
                }

                return cleanAnswers
            },
            mapCameraByIndex() {
                // Return the current camera ID based on question this.index
                // Camera angle 1 is the default view
                // WE NEED TO BE SUPER CAREFUL WITH CAMERA ID HERE
                let cam = 1;  
                if (this.index+1 === 2) {  
                    cam = 2;
                } else if (this.index+1 === 3) {
                    // pole design
                    cam = 3;
                } else if (this.index+1 === 4) {
                    // bike stand
                    cam = 4;
                } else if (this.index+1 === 5) {
                    // priority seats
                    cam = 5;
                } else if(this.index+1 === 6 || this.index+1 === 7) {
                    // side wall

                    cam = 6;
                }
                return cam
            },
            async allUrlsAPICall(payload) {
                // console.log('requesting image with this payload:', payload);

                // this.axios.get(`${process.env.VUE_APP_API_URL}/api/images/optionUrls`, {
                this.axios.get(`/api/images/optionUrls`, {
                    headers: {
                        Cookie: this.$cookies.get('mfsid')
                    },
                    params: payload
                })
                    .then(response => {
                        // Store the response in array for later use
                        // Maybe wrap this in a try as o7 might not be there (although it is always specified in the API)
                        if(response.data) {
                            this.optionImages.day = response.data.day
                            this.optionImages.night = response.data.night
                            // Unless we have already selected one
                            if (this.selected !== 0 && this.selected < response.data.day.length) {
                                this.setFirstImage(response.data.day[this.selected])
                            } else {
                                this.setFirstImage(response.data.day[0])
                            }
                        } else {
                            console.log("no options returned:", response.data)
                        }
                    })
                    .catch(error => error.response ? console.log('fetch image error',error.response.data, "payload", payload) : console.log('fetch image error',error,"payload", payload))
            },
            async allUrlsAPICallFinalQ(payload) {
                // console.log('requesting image with this payload:', payload);

                // this.axios.get(`${process.env.VUE_APP_API_URL}/api/images/optionUrls`, {
                this.axios.get(`/api/images/endwall`, {
                    headers: {
                        Cookie: this.$cookies.get('mfsid')
                    },
                    params: payload
                })
                    .then(response => {
                        // Store the response in array for later use
                        // Maybe wrap this in a try as o7 might not be there (although it is always specified in the API)
                        if(response.data) {
                            this.optionImages.day = response.data.day
                            this.optionImages.night = response.data.night
                            // Unless we have already selected one
                            if (this.selected !== 0 && this.selected < response.data.day.length) {
                                this.setFirstImage(response.data.day[this.selected])
                            } else {
                                this.setFirstImage(response.data.day[0])
                            }
                        } else {
                            console.log("no options returned:", response.data)
                        }
                    })
                    .catch(error => error.response ? console.log('fetch image error',error.response.data, "payload", payload) : console.log('fetch image error',error,"payload", payload))
            },
            setFirstImage(imageUrl) {
                this.image = imageUrl
                // if(this.optionImages.length > 0) {
                // } else {
                //     console.log("error: calling setFirstImage before 1st image loaded");
                // }
            },
            getOptionImage(imagePath) {
                const path = process.env.VUE_APP_SQUARES_URL + imagePath;
                console.log(path);
                return path;
            },
            checkLighting(light) {
                // Attempted to get the radio buttons to 
                console.log(light, this.lighting)
                if(light === this.lighting) {
                    return true
                } else {
                    return false
                }
            }

        },
        mounted() {
            if (this.index === 5) {
                // do alternate API call for final question
                console.log('final q');
                this.generateOptionURLsFinalQ();
            } else {
                this.generateOptionURLs()
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
        & img {
            width: 100px;
            height: auto;
        }
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
        padding-left: 0 !important;
    }

    .questionTextRow {
        & p {
            padding-top: 2em;
            padding-left: 1.5em;
        }
    }

    /*only show yellow half border when cols are in a single row*/
    @media only screen and (min-width: 990px) {
        /*Fix to make a half border under question*/
        .questionTextRow:after {
            content: "";
            display: block;
            width: 40%;
            padding-top: 0.1em;
            margin-bottom: 1.5em;
            margin-left: 1.6em;
            border-bottom: 2px solid #FEC600;
        }
    }

    .display {
        display: block;
    }

    .hide {
        display: none;
    }

    #surveyqContainer {
        padding-left: 0 !important;
        padding-right: 0 !important;
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
        cursor: pointer;
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
            border-right: 3px solid #FEC600;
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
        font-weight: bold;
        font-size: small;
    margin-bottom: 1em;
        margin-top: 1em;
    }


    #LAButton {
        margin-top: 1em;
    }

    .lightHighlight {
        background-color: yellow;
    }

    /* Medium devices */
    @media only screen and (max-width: 764px) {
        .optionImg {
            img {
                width: 50px;
                height: auto;
            }

        }
    }





</style>
