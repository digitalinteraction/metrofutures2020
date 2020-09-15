<template>
  <b-modal class="privacyBody" id="privacy-modal" ok-only>
    <template v-slot:modal-title>
      <h2>Privacy Policy</h2>
      </template>

    <p class="privacyText">In order to facilitate the management of the Metro Futures consultation, some of your personal data will be collected, if you provide this information. Additionally, since we are working with a number of partners in order to manage the individual parts of the consultation, some of your data must also be shared with certain trusted third parties. For more specific information on how your personal data may be used by third parties, as applicable please review the privacy policies available below: </p>

    <ul class="privacyText">
      <li><a href="https://sendgrid.com/policies/privacy-2016/">SendGrid</a></li>
      <li><a href="https://www.digitalocean.com/legal/privacy-policy/">Digital Ocean</a></li>
      <li><a href="https://vercel.com/legal/privacy-policy">Vercel</a></li>
    </ul>

  <p class="privacyText">We will only share the personal data that is necessary and will take measures to ensure that it is protected and does not remain stored with us (Open Lab on behalf of Nexus), or with third parties any longer than necessary. Your personal data will not be used for any other purposes outside this consultation.</p>

  <p class="privacyText">All data collected is anonymous and you will not be personally identifable. All of this data will be used to inform the consultation into the Tyne and Wear Metro. We will collect the following information, should you provide it: </p>

  <ul class="privacyText">
    <li>Which local authority / country you live in, and your age range</li>
    <li>Main use of the Metro and how often you travel on the Tyne and Wear Metro</li>
    <li>Gender, Ethnicity and Disability information</li>
  </ul>

  <p class="privacyText">By using this website you are consenting to these terms.</p>
  
  <p class="privacyText">If you have any specific questions about the use of your personal data, please contact <a v-bind:href="'mailto:' + supportEmail">{{ supportEmail }}</a>  </p>

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