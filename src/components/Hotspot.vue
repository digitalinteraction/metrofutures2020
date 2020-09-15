<template>
  <div class="hotspot_container" v-bind:class="{ hidden : !visible}">
    <div class="icon-container">
      <b-icon icon="info-circle" v-on:click="toggle()" v-show="!visible"></b-icon>
      <b-icon icon="x-circle" v-on:click="toggle()" v-show="visible"></b-icon>
    </div>
    
    <!-- <img src="/favicon.ico" alt="" class="icon" > -->
    <div class="content" v-bind:class="{ content_visible : visible}">
      <span v-show="visible">
        <span class="hotspot_title">{{ data.title }}</span>
        <div class="hotspot_text">
          <span>{{ data.text }}</span>

          <span v-if="data.likert">
            <div class="likert_text" v-if="data.likert === 'clear'">1 = very un{{data.likert}}, 5 = very {{data.likert}}</div>
            <div class="likert_text" v-if="data.likert === 'safe'">1 = no {{data.likert}}r, 5 = much {{data.likert}}r</div>
            <b-form-rating 
              class="likert_item"
              v-model="likertRating"
              icon-empty="circle"
              icon-full="circle-fill"
              variant="warning"
            ></b-form-rating>
          </span>

          <span v-if="data.link">
            Visit the <router-link :to="data.link" class="choices-link">Your Choices</router-link> section of the website to choose your preferred option.
          </span>

          <div v-if="data.visual">
            <!-- Visual here: {{ data.visual }} -->

            <video class="embed-video" ref="embedded">
              <source src="https://cdn.metrofutures.org.uk/doors/Door_Exterior_1.mp4" type="video/webm" >
              <p>Your browser doesn't support HTML5 video. Here is a <a href="https://cdn.metrofutures.org.uk/doors/Door_Exterior_1.mp4">link to the video</a> instead.</p>
            </video>
            <div class="controls text-center"> 
              <b-iconstack font-scale="2">
                <b-icon stacked icon="circle-fill" variant="primary"></b-icon>
                <b-icon stacked icon="play-fill" v-on:click="videoPlay()" v-show="!videoPlaying"></b-icon>
                <b-icon stacked icon="stop-fill" v-on:click="videoPlay()" v-show="videoPlaying"></b-icon>
              </b-iconstack>

              <b-iconstack font-scale="2">
                <b-icon stacked icon="circle-fill" variant="primary"></b-icon>
                <b-icon stacked scale="0.5" icon="fullscreen" v-on:click="videoFull()"></b-icon>
              </b-iconstack>
            </div>

          </div>

          <b-form v-if="!submitted">
            <label for="hotspot_input" class="sr-only" hidden></label>
            <b-form-input
              id="hotspot_input"
              v-model="hotspotText"
              placeholder="Comment..."
            ></b-form-input>
            <div class="text-center">
              <b-button class="hotspot_button" variant="primary" :disabled="!valid()" v-on:click="submit()">Send</b-button>
            </div>
          </b-form>

          <div v-if="submitted" class="text-center thanks-notif">
            <b-icon icon="patch-check-fll" font-scale="1" class="thanks-check"></b-icon> Thanks for your comment.
          </div>

        </div>
        
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hotspot",
  props: {
    data: Object
  },
  data() {
    return {
      visible: false,
      hotspotText: "",
      likertRating: 0,
      submitted: false,
      videoPlaying: false,
      videoEl: false,
    }
  },
  methods: {
    toggle() {
      this.visible = !this.visible
    },
    valid() {
      if (this.hotspotText.length === 0) { return false} 
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
    },
    videoStop() {
      console.log("Detected video stopped")
      this.videoEl.pause()
      this.videoPlaying = false;
    },
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

  .hotspot_container {
  }

  .hidden {
    background: none;
    border: 0;
  }

  .icon-container {
    float: left;
    background-color: $metro-green;
    padding-left: 0.2em;
    padding-right: 0.2em;
    border-radius: 25px;
  }

  .icon {
    float: left;
  }

  .content {
    width: 0px;
  }

  .content_visible {
    width: 200px;
  }

  .hotspot_title {
    font-family: $font-family-calvert;
    // font-weight:bold;
    display: block;
    text-align: center;
    background-color: gray;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    // border-left: 1px solid black;
    // border-right: 1px solid black;
    // border-top: 1px solid black;
  }

  .hotspot_text {
    display: block;
    background-color: lightgray;
    font-family: $font-family-sans-serif;
    padding-left: 0.25em;
    padding-right: 0.25em;
    padding-bottom: 0.25em;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    // border-left: 1px solid darkgray;
    // border-right: 1px solid darkgray;
    // border-bottom: 1px solid darkgray;
    
  }

  .likert_text {
    font-size: 0.75em;
    text-align: center;
  }

  /* .likert_item {
    background: gray;
  } */

  .choices-link {
    display: inline-block;
    border-bottom: 1px solid #FEC600;
    color: $font-color;
  }

  .hotspot_button {
  }

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

</style>