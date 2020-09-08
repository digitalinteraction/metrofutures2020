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
      <b-carousel-slide v-for="image of images" img-src="image"></b-carousel-slide>
    </b-carousel>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'SurSummary',
  data() {
    return {
      images: [];
    }
  },
  computed: {
    ...mapGetters([
      'getConfigAnswers'
    ])
  },
  mounted() {
  // look at answers stored in state and use them to construct API call to retrieve
    // images for carousel
    const answers = this.getConfigAnswers;
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

<style>

</style>
