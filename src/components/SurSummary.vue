<template>
    <b-container fluid>
    <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
    >
<!--        todo load images into slides here-->
      <b-carousel-slide img-src="https://cdn.metrofutures.org.uk/conf/Camera1_1_1_0_0_0_1_1.jpg"></b-carousel-slide>
    </b-carousel>

    <b-row id="optionsRow">
      <b-col id="option1" class="option col-6 text-right" @click="toggleFeatures()"><p class="text-right borderRight"><b-icon-info-circle></b-icon-info-circle> VIEW STANDARD FEATURES </p></b-col>
      <b-col id="option2" class="option "><p class="borderRight text-center"><b-icon-printer></b-icon-printer> PRINT </p></b-col>
      <b-col id="option3" class="option "><p class="text-center"><b-icon-envelope></b-icon-envelope> SEND PDF</p></b-col>
      <b-col id="option4" class="option text-center"><p class="text-center"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23z" fill="#626262"/></svg>
        SHARE</p></b-col>
    </b-row>

    <b-row v-if="viewFeatures">
      <b-col>
      <b-row class="featuresRow">
        <b-col>
          Exterior
        </b-col>
        <b-col>
          <p>4 Carriages</p>
          <p>One connected space</p>
          <p>8 Doors per side</p>
          <p>LED highlights</p>
          <p>Video feed front and rear</p>
        </b-col>
      </b-row>

    <b-row class="featuresRow">
      <b-col>Interior</b-col>
      <b-col>
        <p>108 Seating capacity</p>
        <p>8 Disability spaces</p>
        <p>4 Multipurpose bike & pram zones</p>
        <p>22 Priority seats for elderly and pregnant</p>
        <p>270 Max occupancy</p>
        <p>Passenger screen displays</p>
        <p>Onboard wifi*</p>
      </b-col>
    </b-row>

    <b-row id="optionsAsterix" class="text-center">
      <p>* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum.</p>
    </b-row>
      </b-col>
    </b-row>

      <b-row id="stadlerFooter">
        <b-img src="../assets/stadlerBlack.svg"></b-img>
      </b-row>

      </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'SurSummary',
  data() {
    return {
      images: [], // list of images to load into carousel
      sliding: null,
      viewFeatures: false
    }
  },
  computed: {
    ...mapGetters([
      'getConfigAnswers'
    ])
  },
  methods: {
  toggleFeatures() {
    if (this.viewFeatures) {
      this.viewFeatures = false;
    } else {
      this.viewFeatures = true;
    }
  }
  },
  mounted() {
  // look at answers stored in state and use them to construct API call to retrieve
    // images for carousel
      const answers = this.getConfigAnswers;
      let payload = {
          cam: '',
          o1: answers[0],
          o2: answers[1],
          o3: answers[2],
          o4: answers[3],
          o5: answers[4],
          o6: answers[5],
          o7: 1
      }

    // for each camera angle, add on question answers and get image from API
    const cameraAngles = [1, 2, 4, 14];
    for (const cam of cameraAngles) {

      payload.cam = cam;
      // todo call to API with each payload

    }

  }
}


</script>

<style scoped lang="scss">

#optionsRow {
font-size: small;
  border-bottom: 1px #dddddd solid;
  width: 100%;
}


.borderRight {
  border-right: 1px #DDDDDD solid;
  padding-right: 0.5em;
}

.option {
  padding: 1em;
}
#optionsAsterix {
  font-size: small;
padding-top: 1em;

}

#option1 {
  padding-right: 0;
}

  #option4 {
    background-color: #FEC600;
  }

  .featuresRow {
    border-bottom: 1px #dddddd solid;
    padding-top: 1em;
    padding-bottom: 1em;
    & p {
      padding-bottom: 0.8em;
    }
  }

    #stadlerFooter {
        background-color: #DDDDDD;
        padding-top: 1em;
        padding-bottom: 1em;
    }
</style>
