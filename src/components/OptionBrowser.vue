<template>
  <b-container>
    <b-row>
      <b-col
        v-for="(image, index) in urls"
        v-bind:key="`opt_${index}`"
      >
        <b-img :src="image" fluid></b-img>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "OptionBrowser",

  props: {
    optionType: String,
    
  },

  data() {
    return {
      urls: [],
      imageSets: [
        {type: "floor", urls: ["https://cdn.metrofutures.org.uk/conf/Camera1_1_2_0_0_0_2_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera1_2_2_0_0_0_2_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera1_3_2_0_0_0_2_1.jpg"]},
        {type: "door", urls: ["https://cdn.metrofutures.org.uk/conf/Camera2and3_3_1_2_3_0_2_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera2and3_3_2_2_3_0_2_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera2and3_3_3_2_3_0_2_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera2and3_3_4_2_3_0_2_1.jpg"]},
        {type: "pole", urls: ["https://cdn.metrofutures.org.uk/conf/Camera2and3_3_2_1_3_0_2_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera2and3_3_2_2_3_0_2_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera2and3_3_2_3_3_0_2_1.jpg"]},
        {type: "bike", urls: ["https://cdn.metrofutures.org.uk/conf/Camera4_3_2_0_1_0_2_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera4_3_2_0_2_0_2_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera4_3_2_0_3_0_2_1.jpg"]},
        {type: "priority", urls: ["https://cdn.metrofutures.org.uk/conf/Camera5_3_2_0_0_ON_2_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera5_3_2_0_0_OFF_2_1.jpg"]},
        {type: "sidewall", urls: ["https://cdn.metrofutures.org.uk/conf/Camera6_3_2_0_0_0_1_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera6_3_2_0_0_0_2_1.jpg","https://cdn.metrofutures.org.uk/conf/Camera6_3_2_0_0_0_3_1.jpg"]},
        {type: "endwall", urls: ["https://cdn.metrofutures.org.uk/endwall/Camera6_3_2_0_0_0_2_1A.jpg","https://cdn.metrofutures.org.uk/endwall/Camera6_3_2_0_0_0_2_1B.jpg","https://cdn.metrofutures.org.uk/endwall/Camera6_3_2_0_0_0_2_1C.jpg","https://cdn.metrofutures.org.uk/endwall/Camera6_3_2_0_0_0_2_1D.jpg","https://cdn.metrofutures.org.uk/endwall/Camera6_3_2_0_0_0_2_1A.jpg"]},
      ]
      
    }
  },

  methods: {
    getImageSet() {
      switch(this.optionType) {
        case "door":
          return 0
        case "pole":
          return 1
        case "bike":
          return 2
        case "endwall":
          return 3
        default:
          return 0
      }
    },
  },

  beforeMount() {
    this.urls = this.imageSets[this.getImageSet()].urls;
  }
}
</script>

<style>

</style>