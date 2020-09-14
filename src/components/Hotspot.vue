<template>
  <div class="hotspot_container" v-bind:class="{ hidden : !visible}">
    <div class="icon-container">
      <b-icon icon="info-circle" v-on:click="toggle()" v-show="!visible"></b-icon>
      <!-- <b-icon icon="box-arrow-in-down-right" v-on:click="toggle()" v-show="!visible"></b-icon> -->
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

          <span v-if="data.visual">Visual here: {{ data.visual }}</span>

          <b-form inline>
            <label for="hotspot_input"></label>
            <b-form-input
              id="hotspot_input"
              v-model="hotspotText"
              placeholder="Comment..."
            ></b-form-input>
            <b-button variant="primary" :disabled="!valid()" v-on:click="submit()">Send</b-button>
          </b-form>
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
      console.log(`Looking at scene ${this.$parent.selectedId}, hotspot ${this.data.title}. Submitting content: ${this.hotspotText}`)
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
    background-color: #5bb064;
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
    background-color: gray
    /* float: left; */
  }

  .hotspot_text {
    display: block;
    background-color: lightgray;
    font-family: $font-family-sans-serif
  }

  .likert_text {
    font-size: 0.75em;
    text-align: center;
  }

  /* .likert_item {
    background: gray;
  } */

  .choices-link {
    background-color: darkgray;
  }

</style>