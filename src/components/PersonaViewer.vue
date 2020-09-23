<template>
  <div @fullscreenchange="onFullscreenChange">
    <MainHeader :title="personaName+`'s Journey`"></MainHeader>
    
    <b-container class="personaContent">
      <b-row>
        <b-col>
          <b-progress class="mt-2" :max="5" show-value>
            <b-progress-bar :value="currentStageId" variant="warning"></b-progress-bar>
          </b-progress>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-lg-9 col-12">

          <video class="mainEmbed" ref="mainVideo" controls="true" crossorigin="anonymous"  preload="auto">
            <source :src="mainVid.src" type="video/mp4" :poster="mainVid.poster">
            <track kind="captions" :src="mainVid.cap" srclang="en" label="Journey Video - EN"> 
            <p>Your browser doesn't support HTML5 video. Here is a <a :href="mainVid.src">link to the video</a> instead.</p>
          </video>

          <!-- <video class="loadingVideo" ref="loadingVideo" controls="true" hidden>
            <source :src="loadingVid.src" type="video/mp4">
            <p>Your browser doesn't support HTML5 video. Here is a <a :href="loadingVid.src">link to the video</a> instead.</p>
          </video> -->

          <b-button @click="toggleTranscript()">Transcript</b-button>

          <div class="transcript" v-if="transcript">
            <p v-for="(para, index) in stageInfo.transcript" :key="index">
              {{ para.text }}
            </p>
          </div>


        </b-col>
        <b-col class="col-lg-3 col-12">
          <span class="starter-wrapper" v-if="!personaStarted">
            Click play (<b-icon font-scale="1" icon="play-fill"></b-icon>) on the video to start {{ personaName }}'s journey.
          </span>

          <span class="question-wrapper" v-show="mainVid.finished && !personaFinished">
            <div class="question-text">{{ stageInfo.questions[currentQuestionId].text }}</div>
            
            <!-- Options -->
            <div class="options" v-if="stageInfo.questions[currentQuestionId].options">
              <b-row class="optionRow" 
                align-v="center" 
                v-for="(opt, x) in options"
                :key="x"
                @click="selectOption(x)"
              >
                <b-col class="optionImg">
                    <b-img class="float-left" v-bind:src="'https://cdn.metrofutures.org.uk/squares/' + opt.img"></b-img>
                </b-col>
                <b-col class="optionText">
                    <p>{{ opt.desc }}</p>
                </b-col>
            </b-row>
            </div>
            
            <!-- Likert -->
            <div class="likert" v-if="stageInfo.questions[currentQuestionId].likert">
              <span class="likert-text">{{ getLikertText(stageInfo.questions[currentQuestionId].likert) }}</span>
              <b-form-rating
              class="likert_item"
              v-model="likertRating"
              icon-empty="circle"
              icon-full="circle-fill"
              variant="warning"
              >
              </b-form-rating>
            </div>
            
            <!-- Free comment -->
            <div class="surveyFreeText" v-if="stageInfo.questions[currentQuestionId].comment">
              <!-- <label class="calvert" for="survey-text-response">Leave Feedback</label> -->
              <textarea
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
            <b-button block variant="warning" @click="submitQuestion()" :disabled="invalidForm()">Continue</b-button>
          </span>
          <span class="finished-wrapper" v-if="personaFinished">
            <div>
              <b-button to="/journeys">Back to Journeys</b-button>
            </div>
          </span>
        </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MainHeader from '@/components/MainHeader.vue';
export default {
  name: "PersonaViewer",
  components: {
    MainHeader,
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
    }
  },
  computed: {
    ...mapGetters(["getPersonas"]),
    commentValid() {
      if(this.commentText === "") {
        console.log("comment is invalid")
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    onFullscreenChange() {
      // https://gruhn.github.io/vue-qrcode-reader/demos/Fullscreen.html
      console.log("Detected change in fullscreen")
    },
    nextScene() {
      // Load next video
      // get the next stage Id from the current stage info
      this.currentStageId = this.getNextStageId(this.currentStageId)

      // Load that question 
      this.currentQuestionId = this.getNextQuestionId(this.currentStageId)

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
    },
    videoNext() {
      // Get the next video and load it into the element
    },
    submitQuestion() {
      // Check validity of responses
      if(!this.invalidForm()) {
        // Fire off the response to the API
        // TO DO
        console.log("Submitting to API")

        if(this.currentStageId < this.stageInfo.stages.length-1) {
          this.nextScene()
        } else {
          if(this.finalQuestion === false) {
            // Final question will be rendered by now, so progress to final question
            console.log("Finished - start final questions")
            this.currentQuestionId += 1
            this.finalQuestion = true
          } else {
            this.finalisePersona()
          }
        }
        // Reset the form elements
        this.likertRating = 0;
        this.commentText = "";
        this.optionSelection = false;

      }
    },
    sendResponse() {
      // API call of our response
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
        console.log("require options")
        if (!this.optionSelection) {
          invalid = true
        } else {
          invalid = false
        }
      } else if (question.comment) {
        // Not sure we ever use this
        console.log("Uncommon - require only comment")
        if (this.commentText) {
          invalid = false
        }
      }       
      return invalid
    },
    buildVideoUrl(videoName) {
      let cdnUrl = "https://cdn.metrofutures.org.uk/personas/"
      return cdnUrl+`p${this.stageInfo.pId}/${videoName}`
    },
    loadVideo(nextId) {
      this.mainVid.src = this.buildVideoUrl(this.stageInfo.stages[nextId].videoUrl)
      this.mainVid.cap = this.mainVid.src+".vtt"
      console.log("Setting video src")
      this.videoEl.setAttribute('src',this.mainVid.src)
      this.videoEl.currentTime = 0
      this.videoEl.play()
      this.mainVid.playing = false
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
    // Get the video element
    this.videoEl = this.$refs.mainVideo
    this.videoEl.addEventListener('ended', this.videoStop);
    this.videoEl.addEventListener('play', this.videoPlay);
    // this.videoEl.addEventListener('pause', this.videoPause);

    // Autoplay video
    // This is sometimes blocked by the device
    // this.videoEl.play()

    // Get the loading element too
    this.loadingVid.element = this.$refs.loadingVideo
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

  .mainEmbed {
    width: 100%;
    height: 90%;
    // width: 450px !important;
    // height: auto !important;
    padding-top: 1em;
  }

  .question-text {
    padding-top: 1em;
    padding-bottom: 1em;
  }

  .personaContent {
    max-width: 100%;
  }

  .likert-text {
    font-size: 0.75em;
    text-align: center;
  }

  .optionImg {
    padding-right: 0;
    padding-left: 0;
    & img {
      width: 100px;
      height: auto;
    }
  }
  
  // Media rules for tablets and horizontal phones
  @media only screen and (min-width: $media-small+1) {

  }

  // Media rule for phones screens
  @media only screen and (max-width: $media-small) {
    
    }

</style>