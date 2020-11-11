<template>
  <b-modal class="privacyBody" id="privacy-modal" ok-only>
    <template v-slot:modal-title>
      <h2>Privacy Policy</h2>
    </template>

    <p class="privacyText">The public consultation part of this website is now closed. In order to facilitate the management of the Metro Futures website, we use Google Analytics to track visits to pages by unique users. For more specific information on how your personal data may be used by Google Analytics, please review the privacy policy available <a href="https://policies.google.com/privacy?hl=en-US">here</a>.</p>

    <p class="privacyText">All data collected is anonymous and you will not be personally identifable. We will only share the data that is necessary and will take measures to ensure that it is protected and does not remain stored with us (Open Lab on behalf of Nexus), or with third parties any longer than necessary. Your personal data will not be used for any other purposes outside this consultation.</p>

    <p class="privacyText">By using this website you are consenting to these terms. If you have any specific questions about the data collected about you, please contact <a v-bind:href="'mailto:' + supportEmail">{{ supportEmail }}</a></p>

  </b-modal>
</template>

<script>
export default {
  name: "Privacy",
  data() {
    return {
      supportEmail: "support@metrofutures.org.uk"
    }
  }

}
</script>

<style>

.privacyBody {
  color: black;
}

.privacyText {
  color: black;
  font-family: "Open Sans", Arial, serif;
}

@media only screen and (min-width: 600px) {

  ul {
      font-size: 1.4vmin;
  }
}

@media only screen and (max-width: 600px) {

  ul {
      font-size: 2.3vmin;
      margin-bottom: 0.5em;
  }

}
</style>