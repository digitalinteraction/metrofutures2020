<template>
  <div class="hotspot_container">
    <img src="/favicon.ico" alt="" v-on:click="toggle()">
    <div class="content">
      <span v-show="visible">
        <span class="hotspot_title">{{ data.title }}</span>
        <span class="hotspot_text">{{ data.text }}</span>
        <b-form inline>
          <label for="hotspot_input"></label>
          <b-form-input
            id="hotspot_input"
            v-model="hotspotText"
            placeholder="Enter something..."
          ></b-form-input>
          <b-button variant="primary">Send</b-button>
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
    }
  }


}
</script>

<style>
  .hotspot_container {
  }

  .content {
    width: 200px;
  }

  .hotspot_title {
    font-weight:bold;
    display: inline-block
  }

  .hotspot_text {
  }

</style>