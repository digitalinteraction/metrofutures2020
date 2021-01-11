<template>
  <div class="hotspot_container" v-bind:class="{ hidden : !visible}">
    <div class="icon-container">
      <b-iconstack font-scale="1.5" v-on:click="toggle()" v-show="!visible">
        <b-icon stacked icon="circle-fill" class="icon-backing"></b-icon>
        <b-icon stacked icon="info-circle"></b-icon>
      </b-iconstack>
      <b-iconstack font-scale="1.5" v-on:click="toggle()" v-show="visible">
        <b-icon stacked icon="circle-fill" class="icon-backing"></b-icon>
        <b-icon stacked icon="x"></b-icon>
      </b-iconstack>
    </div>
    
    <!-- <img src="/favicon.ico" alt="" class="icon" > -->
    <div class="content" v-bind:class="{ content_visible : visible}">
      <span v-show="visible">
        <span class="hotspot_title">{{ data.title }}</span>
        <div class="hotspot_text">
          <span>{{ data.text }}</span>


          <span v-if="data.likert">
            <LikertDetails 
              :likert="data.likert" 
              :findingName="data.likertName">
            </LikertDetails>
          </span>

          <span v-if="!data.likert && data.comments">
            People said:
            <span class="comment_text" v-for="(comment, index) in data.comments" :key="index">{{ comment }}</span>
            
          </span>

          <!-- <span v-if="data.link">
            Visit the <router-link :to="data.link" class="choices-link">Your Choices</router-link> section of the website to choose your preferred option.
          </span> -->

          <div v-if="data.visual">

            <video class="embed-video" :class="{ 'embed-large' : vidFullscreen }" ref="embedded" :controls="vidFullscreen ? true : false" poster="https://cdn.metrofutures.org.uk/doors/PosterExterior.png">
              <source :src="data.visual" type="video/mp4" >
              <p>Your browser doesn't support HTML5 video. Here is a <a :href="data.visual">link to the video</a> instead.</p>
            </video>
            <div class="controls-video text-center"> 
              <b-iconstack font-scale="2" v-on:click="videoPlay()">
                <b-icon stacked icon="circle-fill" variant="primary"></b-icon>
                <b-icon stacked icon="play-fill"  v-show="!videoPlaying"></b-icon>
                <b-icon stacked icon="stop-fill"  v-show="videoPlaying"></b-icon>
              </b-iconstack>


              <b-iconstack font-scale="2" v-on:click="videoFull()">
                <b-icon stacked icon="circle-fill" variant="primary"></b-icon>
                <b-icon stacked scale="0.5" icon="arrows-fullscreen" ></b-icon>
              </b-iconstack>
              
              <!-- <b-iconstack font-scale="2" v-show="vidFullscreen" v-on:click="videoShrink()">
                <b-icon stacked icon="circle-fill" variant="primary"></b-icon>
                <b-icon stacked scale="0.5" icon="arrows-angle-contract"></b-icon>
              </b-iconstack> -->
            </div>

          </div>

          <!-- <b-form v-if="!submitted">
            <label for="hotspot_input" class="sr-only" hidden></label>
            <b-form-input
              id="hotspot_input"
              v-model="hotspotText"
              placeholder="Comment..."
            ></b-form-input>
            <div class="text-center">
              <b-button class="hotspot_button" variant="primary" :disabled="!valid()" v-on:click="submit()">Send</b-button>
            </div>
          </b-form> -->

          <!-- <div v-if="submitted" class="text-center thanks-notif">
            <span v-show="likertRating === 0"><b-icon icon="patch-check-fll" font-scale="1" class="thanks-check"></b-icon> Thanks for your comment.</span>
            <span v-show="!hotspotText && likertRating > 0"><b-icon icon="patch-check-fll" font-scale="1" class="thanks-check"></b-icon> Thanks for your rating.</span>
          </div> -->

        </div>
        
      </span>
    </div>
  </div>
</template>

<script>
import LikertDetails from '@/components/LikertDetails.vue'

export default {
  name: "Hotspot",
  props: {
    data: Object
  },
  components: {
    LikertDetails,
  },
  data() {
    return {
      visible: false,
      hotspotText: "",
      likertRating: 0,
      submitted: false,
      videoPlaying: false,
      videoEl: false,
      vidFullscreen: false,
      likertDetails: false,
    }
  },
  methods: {
    toggle() {
      this.visible = !this.visible
    },
    valid() {
      if (this.hotspotText.length === 0 && this.likertRating === 0) { return false} 
      else { return true }
    },
    submit() {
      let correctId = this.$parent.getSceneIDByDropdown(this.$parent.selectedId);
      console.log(`Looking at scene ${correctId}, hotspot ${this.data.title}. Submitting content: ${this.hotspotText}`)
      let payload = {
        "hotspotName": this.data.title,
        "sceneId": correctId,
        "comment": "",
        "likert": "",
      }
      if (this.likertRating > 0) {
        payload.likert = this.likertRating
      }
      if (this.hotspotText) {
        payload.comment = this.hotspotText
      }
      this.axios.post(`${process.env.VUE_APP_API_URL}/api/response/explore`, {
          headers: {
              Cookie: this.$cookies.get('mfsid')
          },
          params: payload
      })
          .then(response => {
              console.info('Survey response: ' + response);
          })
          .catch(error => error.response ? console.log(error.response.data) : console.log(error))
      this.hotspotText = ""
      this.submitted = true
    },
    videoPlay() {
      
      if (this.videoPlaying) {
        this.videoEl.pause();
      } else {
        this.videoEl.play();
      }
      this.videoPlaying = !this.videoPlaying
    },
    videoFull() {
      console.log("Going fullscreen now")
      if (this.videoEl.requestFullscreen) {
        this.videoEl.requestFullscreen();
      } else if (this.videoEl.mozRequestFullScreen) {
        this.videoEl.mozRequestFullScreen();
      } else if (this.videoEl.webkitRequestFullscreen) {
        this.videoEl.webkitRequestFullscreen();
      } else if (this.videoEl.msRequestFullscreen) { 
        this.videoEl.msRequestFullscreen();
      }
      this.vidFullscreen = true;
    },
    videoShrink() {
      console.log("Shrinking")
      this.vidFullscreen = false;
    },
    videoStop() {
      console.log("Detected video stopped")
      this.videoEl.pause()
      this.videoPlaying = false;
    },
    checkFullscreen() {
      if (this.data.visual) {
        // Needs to be run on the document not element
        console.log("Returning:", this.videoEl.fullscreenEnabled)
        return this.videoEl.fullscreenEnabled
      } else {
        return false
      }
    },
    toggleLikert() {
      this.likertDetails = !this.likertDetails;
    }
  },
  mounted() {
    if (this.data.visual) {
      this.videoEl = this.$refs.embedded
      this.videoEl.addEventListener('ended', this.videoStop);
    }
  },


}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  // .hotspot_container {
  // }

  .hidden {
    background: none;
    border: 0;
  }

  .icon-container {
    float: left;
    // position: absolute;
    // top: 3px;
    // left: 5px;
    // background-color: $metro-green;
    // padding-left: 0.2em;
    // padding-right: 0.2em;
    // border-radius: 25px;
    color: white;
  }

  .icon-backing {
    color: $metro-green;
  }

  .icon {
    float: left;
  }

  .content {
    width: 0px;
  }

  .content_visible {
    width: 210px;
  }

  .hotspot_title {
    font-family: $font-family-calvert;
    // font-weight:bold;
    display: block;
    text-align: center;
    background-color: white;
    border: 1px solid black;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding-top: 0.25em;
    // border-left: 1px solid black;
    // border-right: 1px solid black;
    // border-top: 1px solid black;
  }

  .hotspot_text {
    display: block;
    background-color: lightgray;
    font-family: $font-family-sans-serif;
    padding: 0.3rem 0.4rem;
    // padding-left: 0.25em;
    // padding-right: 0.25em;
    // padding-bottom: 0.25em;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    // border-left: 1px solid darkgray;
    // border-right: 1px solid darkgray;
    // border-bottom: 1px solid darkgray;
  }

  .hotspot_text input {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }

  .likert_text {
    font-size: 0.75em;
    text-align: center;
  }

  .comment_text {
    font-style: italic;
    font-size: 0.9em;
    display: block;
    border: 1px solid grey;
    border-radius: 0.5em;
    margin-bottom: 1px;
  }

  /* .likert_item {
    background: gray;
  } */

  .choices-link {
    display: inline-block;
    border-bottom: 1px solid #FEC600;
    color: $font-color;
  }

  // .hotspot_button {
  // }

  .thanks-check {
    color: $metro-green;
    vertical-align: middle;
  }

  .thanks-notif {
    border: 1px solid darkgray;
    border-radius: 15px;
  }

  .embed-video {
    width: 198px;
  }

  // .embed-large {
  //   position: absolute;
  //   top: 5em;
  //   left: 1em;
  //   width: 80vw;
  //   height: 80vw;
  // }

</style>