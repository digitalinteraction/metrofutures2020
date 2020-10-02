<template>
  <div @fullscreenchange="onFullscreenChange">
    <b-row v-if="!privacyNotice">
        <welcomeConsent :title="personaName+`'s Journey`" page="journeys"></welcomeConsent>
      </b-row>

    
    
    <b-container class="personaContent">
      
      <MainHeader :title="personaName+`'s Journey`"></MainHeader>

      <b-row class="demoQuestions" v-show="!getDemographic">
        <b-col>
          <BasicDemo></BasicDemo>
        </b-col>
      </b-row>

      <b-row v-show="getDemographic">
        <b-col>
          <b-progress class="mt-2" :max="8" show-value>
            <b-progress-bar :value="currentQuestionId+1" variant="warning">
              <span class="progressLabel">Stop: {{ currentQuestionId+1 }} / 8</span>
            </b-progress-bar>
          </b-progress>
        </b-col>
      </b-row>
      
      
      <b-row v-show="getDemographic">
      <!-- <b-row> -->
        <b-col class="col-12" :class="videoWidth()">

          <video class="mainEmbed" ref="mainVideo" controls="true" crossorigin="anonymous"  preload="auto" >
            <source 
              :src="mainVid.src" 
              type="video/mp4" 
              :poster="mainVid.poster" 
              playsinline
              webkit-playsinline="webkit-playsinline"
            >
            <track kind="captions" type="text/webvtt" :src="mainVid.cap" srclang="en" label="English" ref="mainTrack" :key="trackKey"> 
            <p>Your browser doesn't support HTML5 video. Here is a <a :href="mainVid.src">link to the video</a> instead.</p>
          </video>

          <!-- <video class="loadingVideo" ref="loadingVideo" controls="true" hidden>
            <source :src="loadingVid.src" type="video/mp4">
            <p>Your browser doesn't support HTML5 video. Here is a <a :href="loadingVid.src">link to the video</a> instead.</p>
          </video> -->

        </b-col>
        <b-col class="col-lg-3 col-12"  v-show="mainVid.finished">
          <span class="starter-wrapper" v-if="!personaStarted">
            Click play (<b-icon font-scale="1" icon="play-fill"></b-icon>) on the video to start {{ personaName }}'s journey.
          </span>

          
          <span class="question-wrapper" v-if="!personaFinished">
            <div class="question-text">
              {{ stageInfo.questions[currentQuestionId].text }}
            </div>
            
            <!-- Options -->
            <div class="options" v-if="stageInfo.questions[currentQuestionId].options">
              <b-row class="optionRow" 
                align-v="center" 
                v-for="(opt, x) in options"
                :key="x"
                @click="selectOption(x)"
                :class="selectClass(x)"
              >
                <b-col class="optionImg col-4">
                    <b-img class="float-left" v-bind:src="'https://cdn.metrofutures.org.uk/squares/' + opt.img"></b-img>
                </b-col>
                <b-col class="optionText col-8">
                    <!-- <span class="option-letter" v-if="stageInfo.questions[currentQuestionId].options != 'priority'">{{ optionLetter(x) }} - </span> -->
                    <span class="option-letter">{{ optionLetter(x) }} - </span>
                    {{ opt.desc }}
                </b-col>
            </b-row>
            </div>
            
            <!-- Likert -->
            <div class="likert" v-if="stageInfo.questions[currentQuestionId].likert">
              <label for="likertInput" class="likert-text">{{ getLikertText(stageInfo.questions[currentQuestionId].likert) }}</label>
              <b-form-rating
              id="likertInput"
              class="likert-item"
              v-model="likertRating"
              icon-empty="circle"
              icon-full="circle-fill"
              variant="warning"
              >
              </b-form-rating>
              <b-row align-h="center" class="rating-label">
                <span class="flex-grow-1">1</span>
                <span class="flex-grow-1">2</span>
                <span class="flex-grow-1">3</span>
                <span class="flex-grow-1">4</span>
                <span class="flex-grow-1">5</span>
              </b-row>
            </div>
            
            <!-- Free comment -->
            <div class="surveyFreeText" v-if="stageInfo.questions[currentQuestionId].comment">
              <label for="commentInput" class="sr-only" label-sr-only>Your comment...</label>
              <textarea
                id="commentInput"
                v-model="commentText"
                placeholder="Your comment..."
                class="form-control"
                rows="2"
                :state="commentText.length >= 2"
              >
              </textarea>
            </div>
            
            <!-- Submit button -->
            <!-- <b-button block variant="outline-secondary" @click="submitQuestion()">Continue</b-button> -->
            <b-button block variant="warning" @click="submitQuestion()" :disabled="invalidForm()" class="continueButton">Continue</b-button>
          </span>

          <!-- Finalised content -->
          <span class="finished-wrapper" v-if="personaFinished">
            <!-- Optional demographic information if we haven't done it elsewhere -->
            <div class="optDemographic" v-show="!getOnlyInfo">
              <OptDemo></OptDemo>
            </div>

            <div v-show="getOnlyInfo">
              <div class="finalButtons">
                <b-button to="/journeys" variant="primary" block>Experience more journeys</b-button>
              </div>

              <div class="finalButtons">
                <b-button to="/" variant="primary" block>Return to Home</b-button>
              </div>

              <div class="finalButtons">
                <b-button class="fbShare" block>
                  <ShareNetwork
                    network="facebook"
                    url="https://metrofutures.org.uk"
                    :title="'I checked how well the new Tyne and Wear Metro fits the needs of someone like ' + personaName + '.'"
                    description="Experience your new Metro in someone else's shoes."
                    hashtags="ShapeYourMetro"
                  >
                    Share on Facebook
                  </ShareNetwork>
                </b-button>
              </div>
              
              <div class="finalButtons">
                <b-button class="twitterShare" block>
                  <ShareNetwork
                  network="twitter"
                  url="https://metrofutures.org.uk"
                  :title="generateShareText()"
                  twitter-user="My_Metro"
                  hashtags="ShapeYourMetro"
                  >Share on Twitter
                  </ShareNetwork>
                </b-button>
              </div>
            </div>
          </span>
        </b-col>
      </b-row>
      <b-row v-show="getDemographic && !personaFinished && !mainVid.finished">
        <b-col>
          <div class="retinopathy" v-if="personaName==='Desmond'"><strong>Note:</strong> Images modified to simulate diabetic retinopathy. For more information see: <a href="https://www.nhs.uk/conditions/diabetic-retinopathy/">NHS Diabetic Retinopathy</a></div>
          <b-button @click="toggleTranscript()" variant="primary" class="transcriptButton">
            Transcript 
            <b-icon font-scale="1" icon="chevron-down" v-show="!transcript"></b-icon>
            <b-icon font-scale="1" icon="chevron-up" v-show="transcript"></b-icon>
          </b-button>
          <div class="transcript" v-show="transcript">
            <p>
              {{ stageInfo.transcript[currentStageId].text }}
            </p>
          </div>
          
        </b-col>
        
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import MainHeader from '@/components/MainHeader.vue';
import BasicDemo from '@/components/BasicDemo.vue'
import OptDemo from '@/components/OptDemo.vue'
import welcomeConsent from "../components/WelcomeConsent";

export default {
  name: "PersonaViewer",
  components: {
    MainHeader,
    BasicDemo,
    OptDemo,
    welcomeConsent,
  },
  data() {
    return {
      personaName: "",
      personaInfo: {},
      stageInfo: {},
      currentStageId: 0,
      currentQuestionId: 0,
      personaStarted: false,
      personaFinished: false,
      finalQuestion: false,
      transcript: false,
      videoEl: false,
      trackEl: false,
      trackKey: 0,
      trackUpdate: false,
      captions: "disabled",
      mainVid: {
        playing: false,
        finished: false,
        src: "",
        poster: "",
        cap: "",
      },
      loadingVid: {
        src: "",
        element: {},
      },
      options: [
        // Placeholder until we load from state
        {desc: "Option 1", img: "Square_Configurator_swatches-01.svg"},
        {desc: "Option 2", img: "Square_Configurator_swatches-02.svg"},
        {desc: "Option 3", img: "Square_Configurator_swatches-03.svg"},

      ],
      // Form data
      likertRating: 0,
      commentText: "",
      optionSelection: false,
      optLetters: ["A", "B", "C", "D", "E", "F"]
    }
  },
  computed: {
    ...mapGetters(['getDemographic', 'getOnlyInfo', 'getUuid', 'privacyNotice']),
    ...mapState(['questions']),
    commentValid() {
      if(this.commentText === "") {
        return false
      } else {
        return true
      }
    },
  },
  updated: function () {
    this.$nextTick(function() {
      if(this.trackUpdate) {
        this.trackEl = this.$refs.mainTrack
        this.trackEl.track.mode = this.captions
        this.trackUpdate = false;
      }
    })
  },
  methods: {
    onFullscreenChange() {
      // https://gruhn.github.io/vue-qrcode-reader/demos/Fullscreen.html

    },
    nextScene() {
      // Load next video
      // get the next stage Id from the current stage info
      this.currentStageId = this.getNextStageId(this.currentStageId)

      // Load that question 
      this.currentQuestionId = this.getNextQuestionId(this.currentStageId)

      // Get options if it is an options selection
      if (this.stageInfo.questions[this.currentQuestionId].options) {
        this.options = this.getOptions(this.stageInfo.questions[this.currentQuestionId].options)
      }

      // Load that video
      this.loadVideo(this.currentStageId)
    },
    videoPlay() {
      if(!this.personaStarted) {
        this.personaStarted = true;
      }
    },
    videoStop() {
      this.mainVid.finished = true;
      this.transcript = false;
    },
    videoNext() {
      // Get the next video and load it into the element
    },
    submitQuestion() {
      // Check validity of responses
      if(!this.invalidForm()) {
        // Fire off the response to the API
        this.sendResponse()


        if(this.currentStageId < this.stageInfo.stages.length-1) {
          this.nextScene()
        } else {
          if(this.finalQuestion === false) {
            // Final question will be rendered by now, so progress to final question
            this.currentQuestionId += 1
            this.finalQuestion = true
          } else {
            this.currentQuestionId += 1
            this.finalisePersona()
          }
        }
        // Reset the form elements
        this.likertRating = 0;
        this.commentText = "";
        this.optionSelection = false;

      } 
      // else {
      //   console.log("Form is not valid")

      // }
    },
    sendResponse() {
      // API call of our response
      // Mapped questionID to stageID as there are 2 extra questions where stageID does not increment
      let payload = {
        personaName: this.personaName,
        stageId: this.currentQuestionId,
      }

      if (this.commentText) {
        payload.comment = this.commentText
      }

      if (this.likertRating) {
        payload.likert = this.likertRating
      }

      if (this.optionSelection === 0 || this.optionSelection) {
        payload.option = this.optionSelection
      }

      this.axios.post(`${process.env.VUE_APP_API_URL}/api/response/journey`, {
        params: payload
      })
        .then(response => {
          console.info('Survey response:', response);
        })
        .catch(error => error.response ? console.log(error.response.data) : console.log(error))
    },
    getNextQuestionId(stageIndex) {
      // Given the passed in stage, get the correct question ** Doesn't actually search by ID yet **
      // stageIndex and questionIndex usually match, but this is just in case people change their mind re: question order
      return this.stageInfo.stages[stageIndex].questionId
    },
    getNextStageId(stageIndex) {
      // Given the passed in stage, get the next stageId ** Doesn't actually search by ID yet **
      // Usually sequential, but this is just in case people change their mind re: stage order
      return this.stageInfo.stages[stageIndex].nextId
    },
    invalidForm() {
      // Returns true if invalid
      // Check what we currently require from the question, compute whether we've got what we need
      let question = this.stageInfo.questions[this.currentQuestionId]
      let invalid = true
      // If likert and comment, comment is optional
      if (question.likert && question.comment) {
        if (this.likertRating > 0) {
          invalid = false
        }
      // If only likert
      } else if (question.likert) {
        if (this.likertRating > 0) {
          invalid = false
        }
      // If options
      } else if (question.options) {
        if (this.optionSelection === 0 || this.optionSelection > 0) {
          invalid = false
          } else {
          invalid = true
        }
      } else if (question.comment) {
        // Use this on final question
        if (this.commentText) {
          invalid = false
        } else {
          invalid = true
        }
      }       
      return invalid
    },
    buildVideoUrl(videoName) {
      let cdnUrl = "https://cdn.metrofutures.org.uk/personas/"
      return cdnUrl+`p${this.stageInfo.pId}/${videoName}`
    },
    loadVideo(nextId) {
      // Set video and caption sources in data and DOM
      this.mainVid.src = this.buildVideoUrl(this.stageInfo.stages[nextId].videoUrl)
      this.mainVid.cap = this.mainVid.src+".vtt"
      this.videoEl.setAttribute('src',this.mainVid.src)

      // Set captions in data and dom
      this.updateCaptions(this.trackEl.track.mode)
      this.trackEl.setAttribute('src', this.mainVid.cap)
      
      this.trackKey += 1;  // This will trigger a re-render of the element
      this.trackUpdate = true;

      // Wind the video back and start playing. 
      this.videoEl.currentTime = 0
      this.videoEl.play()
      // this.trackEl.track.mode = this.captions;
      this.mainVid.finished = false
    },
    toggleTranscript() {
      this.transcript = !this.transcript
    },
    hiddenLoad() {
      // Load video src into hidden video to make it load
    },
    finalisePersona() {
      // Finalises all elements ready to go back to persona menu
      this.mainVid.finished = true
      this.personaFinished = true
      this.transcript = false
    },
    getLikertText(likertType) {
      switch(likertType) {
        case "poor":
          return "1 = very poor, 5 = very well"
        case "verywell":
          case true:
          return "1 = not very well, 5 = very well"
        case "unclear":
          return "1 = very unclear, 5 = very clear"
        case "useful":
          return "1 = not at all useful, 5 = very useful"
        case "safer":
          return "1 = no safer, 5 = very safe"
      }
    },
    selectOption(index) {
      this.optionSelection = index;
    },
    selectClass(x) {
      let selectClass = ''
      if (this.optionSelection === x) {
        selectClass = 'selected'
      }
      return selectClass
    },
    optionLetter(index) {
      return this.optLetters[index]
    },
    videoWidth() {
      if (this.mainVid.finished) {
        return "col-lg-9"
      } else {
        return "col-lg-12"
      }
    },
    getOptions(optionType) {
      switch(optionType) {
        case "seats":
          return this.questions[0].options
        case "colours":
          return this.questions[1].options
        case "pole":
          return this.questions[2].options
        case "bike":
          return this.questions[3].options
        case "priority":
          return this.questions[4].options
        case "sidewall":
          return this.questions[5].options
        case "endwall":
          return this.questions[6].options
      }
    },
    getSession() {
      this.axios.get(`${process.env.VUE_APP_API_URL}/api/get-session`)
    },
    postGA() {
      // google analytics post request
      const measurementID = process.env.VUE_APP_GA_ID;
      const clientID = this.getUuid;
      const page = this.$route.path;
      const pageName = this.$route.name;
      const documentHost = location.host;

      const fullURL = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=' + measurementID + '&cid=' + clientID + '&t=pageview&dh=' + documentHost + '&dp=' + page + '&dt=' + pageName;
      this.axios.post(fullURL);
    },
    updateCaptions(captionStatus) {
      this.captions = captionStatus;
    },
    getPoster() {
      let cdnUrl = "https://cdn.metrofutures.org.uk/personas/"
      return cdnUrl+`p${this.stageInfo.pId}/poster.jpg`
    },
    generateShareText() {
      let option = ""
      switch(this.personaName) {
        case "Jessica":
          option = "a young mum like Jessica"
          break;
        case "Sanjeev":        
          option = "a cycle commuter like Sanjeev"
          break;
        case "Desmond":
          option = "a visually impaired person like Desmond"
          break;
        case "Polly":
          option = "a young person like Polly"
          break;
        case "Robert":
          option = "a wheelchair user like Robert"
          break;
        case "Mary":
          option = "an older person like Mary"
          break;
      }
      return `I checked how well the new Tyne and Wear Metro fits the needs of ${option}. Experience your new Metro in someone else's shoes at:`
    }
  },

  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // If personaName is not in our list, don't update
    console.log(`Came from ${from}, wishing to go to ${to}`)
    // don't forget to call next()
    next();
    next(false);  // Will cancel the route (use if not valid route)
  },
  mounted() {
    // Basic functions
    this.getSession()
    this.postGA()

    // Get the video element
    this.videoEl = this.$refs.mainVideo
    this.videoEl.addEventListener('ended', this.videoStop);
    this.videoEl.addEventListener('play', this.videoPlay);
    // this.videoEl.addEventListener('pause', this.videoPause);

    this.videoEl.setAttribute('playsInline',true)

    // Do subtitles
    this.trackEl = this.$refs.mainTrack

    // Get the loading element too
    this.loadingVid.element = this.$refs.loadingVideo

    // Set the poster
    this.getPoster();

    // Fetch options if needed
    // Get options if it is an options selection
      if (this.stageInfo.questions[this.currentQuestionId].options) {
        this.options = this.getOptions(this.stageInfo.questions[this.currentQuestionId].options)
      }
  },
  created() {
    // Need a guard to make sure we are accessing ones that exist
    this.personaName = this.$route.params.persona  // Get persona name from route
    this.personaInfo = this.$store.getters.getPersonaByName(this.personaName)

    // Get stages and questions
    this.stageInfo = this.$store.getters.getPersonaStages(this.personaName)

    // Set attributes for first video
    this.mainVid.src = this.buildVideoUrl(this.stageInfo.stages[0].videoUrl)
    this.mainVid.cap = this.mainVid.src+".vtt"

  }

}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  #logo {
    height: 4em;
    padding-left: 1em;
    // padding-top: 1em;
  }

  .demoQuestions {
    padding-top: 2em;
  }

  .mainEmbed {
    width: 100%;
    height: 100%;
    max-width: $video-max-width;
    padding-top: 1em;
  }

  .mainEmbed:focus {
    outline: none !important;
  }

  .question-text {
    padding-top: 1em;
    padding-bottom: 1em;
    font-family: $font-family-calvert;
    font-size: 1.2rem;
  }

  .personaContent {
    // max-width: 100%;
    max-width: $media-max-width;
  }

  .likert {
    margin-bottom: 0.5em;
  }

  .likert-label {
    text-align: center;
  }

  .likert-text {
    font-size: 0.75em;
    text-align: center;
  }

  .rating-label {
    padding-left: 1.5em;
    padding-right: 1.5em;
    font-family: $font-family-calvert;
  }

  .optionImg {
    padding-right: 0;
    padding-left: 0;
    & img {
      width: auto;
      height: auto;
    }
  }

  .optionText {
    text-align: left;
    padding-left: 1em;
  }

  .optionRow {
    margin-top: 0.2em;
    margin-bottom: 0.2em;
  }

  .surveyFreeText {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  .selected {
    /*   todo add tick to image*/
    background-color: #DDDDDD;

    & img {
      border-right: 3px solid #FEC600;
    }
  }

  .finalButtons {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    padding-left: 1em;
    padding-right: 1em;
    & a {
      font-weight: bold;
      margin-left: auto;
      margin-right: auto;
      max-width: 500px;
    }
    
    & button {
      margin-top: 0;
      margin-bottom: 0;
      margin-left: auto;
      margin-right: auto;
      max-width: 500px;
    }
  }

  .fbShare {
    background-color: #3B4BA2;
    color: white;
    & a {
      color: white;
      font-weight: normal;
    }
  }

  .twitterShare {
    background-color: #00BAFE;
    border: 0;
    color: white !important;
    & a {
      color: white;
      font-weight: normal;
    }
  }

  .transcript {
    padding-top: 1em;
    text-align: left;
  }

  .transcriptButton {
    margin-top: 1em;
  }

  .transcript p {
    padding-left: 0.75em;
    padding-right: 0.75em;
    text-align: left;
  }

  .progressLabel {
    color: black;
    font-weight: 400;
  }
  
  // Media rules for tablets and horizontal phones
  @media only screen and (min-width: $media-small+1 ) {

  }

  @media only screen and (max-width: 991px) {
    .continueButton {
      margin-bottom: 1.5em;
    }

    // .optionImg {
    //   padding-right: 0;
    //   padding-left: 0;
    //   & img {
    //     width: 150px;
    //     height: auto;
    //   }
    // }
  }

  // Media rule for phones screens
  @media only screen and (max-width: $media-small) {
    .personaContent {
      max-width: 100%;
    }

    .optionImg {
    padding-right: 0;
    padding-left: 0;
      & img {
        width: auto;
        height: auto;
      }
    }

    
  }

</style>