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

      <!-- Intro text for each page -->

      <div id="explore" v-if="page === 'explore'" class="text-left">
        <p>Whilst this part of the public consultation is now closed, you can still explore the 2020 proposed design. Move around 360-degree images at seven points in and around the train to discover new features. Use the toggle switch to explore the train with and without people on board. Some features appear in more than one image.</p>
      </div>

      <div id="choices" class="modal-container" v-if="page === 'choices'">
        <p>Whilst this part of the public consultation is now closed, you can still explore the 2020 proposed design. Here you can try out options for seven different features of the new Metro trains.</p>
      </div>

      <div id="journeys" class="modal-container" v-if="page === 'journeys'">
        <p>Whilst this part of the public consultation is now closed, you can still explore the 2020 proposed design. Pick one of six people, go on a typical Metro journey with them and consider how well the new trains fit their needs. These are not real people but the issues they face are real and reflect what people like them have told us about travelling on trains. Each journey consists of six video clips with a question after each.</p>
      </div>

      <div id="menu" class="modal-container" v-if="page === 'menu'">
        <p>Whilst this part of the public consultation is now closed, you can still explore the 2020 proposed design and public feedback on it in three ways. A revised design incorporating the consultation feedback in now being made.</p>
      </div>

      <!-- if privacy is not collected, display here -->
      <div id="privacy-container" class="modal-container" v-if="privacyNotice===false">
        <div>
          <p>Any information you give to the site (e.g. your choices for the design of the metro) will not be recorded. In using this site, you agree that you are happy with the following:</p>

          <p>We collect the following data about you:</p>
          <ul class="privacy-list mb-1">
            <li>Each page you visit (Google Analytics)</li>
          </ul>
          <p><strong>Cookie Notice:</strong> We store a cookie in your web browser in order to prevent unauthorised use of our website. In using this website you accept this functional cookie.</p>
        </div>

        <div class="privacy-check">
          <b-form-checkbox
            id="privacy-checkbox"
            name="privacy-checkbox"
            v-model="tick"
          >I agree and accept the terms of use and privacy notice of this website.</b-form-checkbox>
        </div>

        <div class="modal-footer privacy-buttons">
          <b-button block @click="confirmPrivacy" :disabled="tick === false">Continue</b-button>
        </div>

        <div class="modal-links"><a href="#" v-b-modal.privacy-modal>Privacy Policy</a> | <a href="#" v-b-modal.terms-modal>Terms &amp; Conditions</a></div>
      </div>

      <!-- display continue button, if privacy done already -->
      <div v-if="noQuestions">
        <b-button block @click="close">Continue</b-button>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import infoForm from "../components/InfoForm";
//import VueCookies from 'vue-cookies'

export default {
  name: "welcomeConsent",
  components: {
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
    ...mapGetters(["privacyNotice"]),
    noQuestions: function() {
        // check if privacy and info form are complete if modal called from relevant page
        if (this.page === "explore" && this.privacyNotice)
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
      } else if (this.page === "menu") {
        this.disableWelcomeModal();
      }
    },
    close() {
      this.$bvModal.hide("privacyNoticeModal");
      if (this.page === "choices") {
        this.$parent.triggerLAQuestion();
      } else if (this.page === "menu") {
        this.disableWelcomeModal();
      }
    },
    exitBack() {
      this.$bvModal.hide("privacyNoticeModal");
    },
    ...mapMutations(["acknowledgePrivacy", "completeInfo", "disableWelcomeModal"])
  }
};
</script>

<style scoped>
  .modal-container {
    text-align: left; 
  }

  .calvert {
    font-family: Calvert, serif;
  }

  #info-back-button {
    color: black;
    padding-bottom: 2em;
  }

  .privacy-list {
    text-align: left;
    padding-bottom: 1em;
    font-size: smaller;
  }

  .modal-links{
    font-size: x-small;
    text-align: center;
  }
  a {
    color: black;
  }

</style>
