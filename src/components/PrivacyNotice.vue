<template>
  <b-row>
    <b-col>
      <h4>Privacy Notice</h4>

      <div class="privacy-text">
        <p>In using this site, you agree that you are happy for your responses and interactions on this website to be included in the consultation for the Metro Futures 2020 project. </p>

        <p>We collect the following data about you:</p>
        <ul>
          <li>Your choices for the design of the metro</li>
          <li>Any free text answers you provide</li>
          <li>If you chose to be contacted for further consultation about the Metro Futures, your email address</li>
        </ul>

      </div>

      <div class="privacy-check">
        <b-form-checkbox id="privacy-checkbox" name="privacy-checkbox" v-model="tick">
          I accept the terms of use and agree to participate in this consultation
        </b-form-checkbox>
      </div>

      <div class="privacy-buttons">
        <b-button @click="confirmPrivacy" :disabled="tick == false">Continue</b-button>
      </div>

    </b-col>
  </b-row>
</template>

<script>
import { mapMutations } from 'vuex'
  export default {
    name: 'PrivacyNotice',
    data() {
      return {
        tick: false
      }
    },
    methods: {
    confirmPrivacy () {
      this.acknowledgePrivacy()
    },
    ...mapMutations([
      'acknowledgePrivacy'
    ])
  }
  }

</script>
