<template>
  <b-container fluid>
    <!--modal-->
    <b-modal
      v-bind:hide-footer="true"
      centered
      ok-only
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      id="privacyNoticeModal"
    >
      <template v-slot:modal-title>
        <h2>{{title}}</h2>
      </template>
      <div id="explore" v-if="page === 'explore'">
        <!-- <h2>Explore your new Metro!</h2>-->
        <p>Move around 360-degree images at seven points in and around the train to discover new features and provide feedback on them. Use the toggle switch to explore the train with and without people on board. Some features appear in more than one image.</p>
      </div>
      <div id="choices" v-if="page === 'choices'">
        <!--  <h2>Add the Finishing Touches!</h2> -->
        <p>Some design decisions remain to be made on your new Metro. Let us know your preferences by trying out options for seven different features. You can then share your ideal Metro with us and on social media.</p>
      </div>
      <div id="journeys" v-if="page === 'journeys'">
        <!--   <h2>Step into Someone Else’s Shoes</h2> -->
        <p>Pick one of six people, go on a typical Metro journey with them and consider how well the new trains fit their needs. These are not real people but the issues they face are real and reflect what people like them have told us about travelling on trains.</p>
      </div>

      <p
        id="menu"
        v-if="page === 'menu'"
      >Help shape your new Metro in three ways. Choose a section to begin.</p>
      <br />

      <!-- explore page needs demographic info collecting, also does privacy in this situation -->
      <div v-if="page === 'explore' && getInfoCompleted === false">
        <infoForm></infoForm>
      </div>

      <!-- if privacy is not collected -->
      <div id="privacy-container" v-if="privacyNotice===false && page !== 'explore'">
        <div>
          <p>In using this site, you agree that you are happy for your responses and interactions on this website to be included in the consultation for the Metro Futures 2020 project.</p>

          <p>We collect the following data about you:</p>
          <ul>
            <li>Your choices for the design of the metro</li>
            <li>Any free text answers you provide</li>
            <li>If you chose to be contacted for further consultation about the Metro Futures, your email address</li>
          </ul>
        </div>

        <div class="privacy-check">
          <b-form-checkbox
            id="privacy-checkbox"
            name="privacy-checkbox"
            v-model="tick"
          >I agree to participate in this consultation, and accept the terms of use and privacy notice of this website.</b-form-checkbox>
        </div>

        <div class="modal-footer privacy-buttons">
          <b-button block @click="confirmPrivacy" :disabled="tick === false">Continue</b-button>
        </div>
      </div>

      <!-- continue, if privacy done before -->
      <div v-if="noQuestions">
        <b-button block @click="close">Continue</b-button>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import infoForm from "../components/InfoForm";
//import VueCookies from 'vue-cookies'

export default {
  name: "welcomeConsent",
  components: {
    infoForm
  },
  data() {
    return {
      tick: false,
      displayError: false
    };
  },
  props: {
    title: String,
    page: String
  },
  mounted() {
    this.$bvModal.show("privacyNoticeModal");
  },
  computed: {
    ...mapGetters(["privacyNotice", "getInfoCompleted"]),
    noQuestions: function() {
        // check if privacy and info form are complete if modal called from relevant page
        if (this.page === "explore" && this.getInfoCompleted && this.privacyNotice)
        {
          return true
        } else if( this.page !=="explore" && this.privacyNotice){
          return true
        } else
        return false
      }
  },
  methods: {
    confirmPrivacy() {
      this.acknowledgePrivacy();
      this.$bvModal.hide("privacyNoticeModal");
      if (this.page === "choices") {
        this.$parent.triggerLAQuestion();
      }
    },
    close() {
      this.$bvModal.hide("privacyNoticeModal");
      if (this.page === "choices") {
        this.$parent.triggerLAQuestion();
      }
    },
    ...mapMutations(["acknowledgePrivacy", "completeInfo"])
  }
};
</script>

<style scoped>
.calvert {
  font-family: Calvert, serif;
}
</style>
