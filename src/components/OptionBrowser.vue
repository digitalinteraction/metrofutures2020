<template>
  <b-container class="rounded option-container py-2 mb-2">
    <b-row>
      <b-col>
        <h4>
          {{ caption }}
        </h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        md="6"
        v-for="(urlObj, index) in urls"
        v-bind:key="`opt_${index}`"
        class="mx-auto my-2"
        
      >
        <b-img :src="urlObj.url" fluid :class="getBorderStyle(urlObj.chosen)">
        </b-img>
          <!-- <b-icon v-if="urlObj.chosen" icon="check" variant="success" class="h3"></b-icon> -->
          <b-badge v-if="urlObj.chosen" icon="check" variant="success" class="h3">Most popular</b-badge>
        
      </b-col>
    </b-row>
    
  </b-container>
</template>

<script>
export default {
  name: "OptionBrowser",

  props: {
    optionType: String,
    caption: String,
  },

  data() {
    return {
      urls: [],
      imageSets: [
        {type: "floor", urls: [
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera1_1_2_0_0_0_2_1.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera1_2_2_0_0_0_2_1.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera1_3_2_0_0_0_2_1.jpg"},
        ]},
        {type: "door", urls: [
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera2and3_3_1_2_3_0_2_1.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera2and3_3_2_2_3_0_2_1.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera2and3_3_3_2_3_0_2_1.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera2and3_3_4_2_3_0_2_1.jpg"},
          ]},
        {type: "pole", urls: [
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera2and3_3_2_1_3_0_2_1.jpg"},
          {chosen: true, url: "https://cdn.metrofutures.org.uk/conf/Camera2and3_3_2_2_3_0_2_1.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera2and3_3_2_3_3_0_2_1.jpg"},
          ]},
        {type: "bike", urls: [
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera4_3_2_0_1_0_2_1.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera4_3_2_0_2_0_2_1.jpg"},
          {chosen: true, url: "https://cdn.metrofutures.org.uk/conf/Camera4_3_2_0_3_0_2_1.jpg"}
          ]},
        {type: "priority", urls: [
          {chosen: true, url: "https://cdn.metrofutures.org.uk/conf/Camera5_3_2_0_0_ON_2_1.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera5_3_2_0_0_OFF_2_1.jpg"},
          ]},
        {type: "sidewall", urls: [
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera6_3_2_0_0_0_1_1.jpg"},
          {chosen: true, url: "https://cdn.metrofutures.org.uk/conf/Camera6_3_2_0_0_0_2_1.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/conf/Camera6_3_2_0_0_0_3_1.jpg"},
          ]},
        {type: "endwall", urls: [
          {chosen: false, url: "https://cdn.metrofutures.org.uk/endwall/Camera6_3_2_0_0_0_2_1A.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/endwall/Camera6_3_2_0_0_0_2_1B.jpg"},
          {chosen: true, url: "https://cdn.metrofutures.org.uk/endwall/Camera6_3_2_0_0_0_2_1C.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/endwall/Camera6_3_2_0_0_0_2_1D.jpg"},
          {chosen: false, url: "https://cdn.metrofutures.org.uk/endwall/Camera6_3_2_0_0_0_2_1A.jpg"},
          ]},
        {type: "winning", urls: [
          {chosen: true, url: "https://cdn.metrofutures.org.uk/conf/Camera1_3_2_0_0_0_2_1.jpg"},
          {chosen: true, url: "https://cdn.metrofutures.org.uk/conf/Camera2and3_3_2_2_3_0_2_1.jpg"},
          {chosen: true, url: "https://cdn.metrofutures.org.uk/conf/Camera4_3_2_0_3_0_2_1.jpg"},
          {chosen: true, url: "https://cdn.metrofutures.org.uk/conf/Camera5_3_2_0_0_ON_2_1.jpg"},
          {chosen: true, url: "https://cdn.metrofutures.org.uk/endwall/Camera6_3_2_0_0_0_2_1C.jpg"},
          ]},
      ]
      
    }
  },

  methods: {
    getImageSet() {
      switch(this.optionType) {
        case "floor": 
          return 0
        case "door":
          return 1
        case "pole":
          return 2
        case "bike":
          return 3
        case "priority":
          return 4
        case "sidewall":
          return 5
        case "endwall":
          return 6
        case "winning":
          return 7
        default:
          return 0
      }
    },
    getBorderStyle(isChosen) {
      return (isChosen ? 'border border-success' : 'border border-dark')
    },
  },

  beforeMount() {
    this.urls = this.imageSets[this.getImageSet()].urls;
  }
}
</script>

<style>

  .option-container {
    background-color: lightgray;
  }

</style>