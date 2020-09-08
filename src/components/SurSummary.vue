<template>
  <b-container>
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
      <b-carousel-slide img-src="images[0]"></b-carousel-slide>
    </b-carousel>

    <b-row id="optionsRow">
      <b-col id="option1"><b-icon-info-circle></b-icon-info-circle>VIEW STANDARD FEATURES</b-col>
      <b-col id="option2"><b-icon-printer></b-icon-printer>PRINT</b-col>
      <b-col id="option3"><b-icon-envelope></b-icon-envelope>SEND PDF</b-col>
      <b-col id="option4"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23z" fill="#626262"/></svg>SHARE</b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'SurSummary',
  data() {
    return {
      images: [],
      sliding: null
    }
  },
  computed: {
    ...mapGetters([
      'getConfigAnswers'
    ])
  },
  methods: {

  },
  mounted() {
  // look at answers stored in state and use them to construct API call to retrieve
    // images for carousel
    const answers = this.getConfigAnswers;
    console.log(answers);
    let cam = 1;
    let o1 = 1;
    let o2 = 2;
    let o3 = 3;
    let o4 = 1;
    let o5 = 'ON';
    let o6 = 1;
    let o7 = 1;

    let payload = {
      cam,
      o1,
      o2,
      o3,
      o4,
      o5,
      o6,
      o7
    }

    // for each camera angle, add on question answers and get image from API
    const cameraAngles = [1, 2, 4, 14];
    for (cam of cameraAngles) {

      payload.cam = cam;
      // todo call to API with each payload

    }

  }
}


</script>

<style scoped lang="scss">



</style>
