<template>
  <div>
    <MainHeader :title="personaName"></MainHeader>
    <div class="personaContent">
      <b-container>
        <b-row>
          <b-col class="border">
            Breadcrumbs here
          </b-col>
        </b-row>
        <b-row>
          <b-col class="border col-lg-9 col-12">

            <video class="embed-video" ref="mainVideo" controls="true">
              <!-- poster="https://cdn.metrofutures.org.uk/doors/PosterExterior.png" -->
              <source src="https://cdn.metrofutures.org.uk/personas/p0/Polly1.mp4" type="video/mp4" >
              <!-- <p>Your browser doesn't support HTML5 video. Here is a <a :href="data.visual">link to the video</a> instead.</p> -->
            </video>
            
            <div class="controls-video text-center"> 
              <b-iconstack font-scale="2" v-on:click="videoPlayButton()" v-show="!videoFinished">
                <b-icon stacked icon="circle-fill" variant="primary"></b-icon>
                <b-icon stacked icon="play-fill"  v-show="!videoPlaying"></b-icon>
                <b-icon stacked icon="stop-fill"  v-show="videoPlaying"></b-icon>
              </b-iconstack>

              <b-iconstack font-scale="2" v-on:click="replayButton()" v-show="videoFinished">
                <b-icon stacked icon="circle-fill" variant="primary"></b-icon>
                <b-icon stacked icon="arrow-repeat"></b-icon>
              </b-iconstack>
            </div>

          </b-col>
          <b-col class="border col-lg-3 col-12">
            <span class="question-wrapper" v-show="videoFinished">
              <div class="question-text">{{ stageInfo.questions[currentQuestionId].text }}</div>
              <!-- {{ personaInfo.desc }} -->
              
              <!-- Options -->
              <div class="options" v-if="stageInfo.questions[currentQuestionId].options">
                Options layout will appear here
              </div>
              
              <!-- Likert -->
              <div class="likert" v-if="stageInfo.questions[currentQuestionId].likert">
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
                <label class="calvert" for="survey-text-response">Leave Feedback (optional) </label>
                <textarea
                v-model="commentText"
                placeholder="Got something to say? Let us know..."
                class="form-control"
                rows="2"
                >
                </textarea>
              </div>
              
              <!-- Submit button -->
              <b-button block variant="outline-secondary" @click="submitQuestion()">Submit</b-button>
            </span>
          </b-col>
        </b-row>
        <b-row>
          <Footer></Footer>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MainHeader from '@/components/MainHeader.vue';
import Footer from '@/components/Footer.vue';
export default {
  name: "PersonaViewer",
  components: {
    MainHeader,
    Footer,
  },
  data() {
    return {
      personaName: "",
      personaInfo: {},
      stageInfo: {},
      currentStageId: 0,
      currentQuestionId: 0,
      videoEl: false,
      videoPlaying: false,
      videoFinished: false,
      // Form data
      likertRating: 0,
      commentText: "",
    }
  },
  computed: {
    ...mapGetters(["getPersonas"]) 
  },
  methods: {
    nextScene() {
      // Get next stage
      // From that get video URL
      // and get next question
    },
    videoPlay() {

    },
    videoStop() {
      console.log("video has stopped")
      this.videoFinished = true;
    },
    videoPlayButton() {
      // If we are finished don't do anything
      if(!this.videoFinished) {
        // Play if we have paused, pause if we are playing
        console.log("play/pause current video")
      }
    },
    videoNext() {
      // Get the next video and load it into the element
    },
    submitQuestion() {
      // Fire off the response to the API
      // TO DO

      // Load next video
      // get the nextId from the current stage info

      // Load that video

      // Load that question
    },
    sendResponse() {
      // API call of our response
    },
    getNextQuestionId(stageIndex) {
      // Given the passed in stage, get the correct question
      // stageIndex and questionIndex usually match, but this is just in case people change their mind re: question order
      return this.stageInfo.stages[stageIndex].questionId
    },
    getNextStageId(stageIndex) {
      // Given the passed in stage, get the next stageId
      // Usually sequential, but this is just in case people change their mind re: stage order
      return this.stageInfo.stages[stageIndex].nextId
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
  },
  created() {
    // Need a guard to make sure we are accessing ones that exist
    this.personaName = this.$route.params.persona  // Get persona name from route
    this.personaInfo = this.$store.getters.getPersonaByName(this.personaName)

    // Get stages and questions
    this.stageInfo = this.$store.getters.getPersonaStages(this.personaName)

  }

}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  .border {
    border: 1px solid black;
  }

  .embed-video {
    width: 500px;
  }

</style>