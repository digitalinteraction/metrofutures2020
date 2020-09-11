<template>
  <div class="hotspot_container">
    <img src="/favicon.ico" alt="" class="icon" v-on:click="toggle()">
    <div class="content" v-bind:class="{ content_visible : visible}">
      <span v-show="visible">
        <span class="hotspot_title">{{ data.title }}</span>
        <span class="hotspot_text">{{ data.text }}</span>
        
        <span v-if="data.likert">Likert</span>
        <span v-if="data.link">Link</span>
        <span v-if="data.visual">Visual</span>

        <b-form inline>
          <label for="hotspot_input"></label>
          <b-form-input
            id="hotspot_input"
            v-model="hotspotText"
            placeholder="Enter something..."
          ></b-form-input>
          <b-button variant="primary" :disabled="!valid()" v-on:click="submit()">Send</b-button>
        </b-form>
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
      hotspotText: ""
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

<style>
  .hotspot_container {
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
    font-weight:bold;
    display: block;
    /* float: left; */
  }

  .hotspot_text {
    display: block;
  }

</style>