<template>
  <b-modal class="privacyBody" id="privacy-modal" ok-only>
    <h3>Privacy Policy</h3>

    <p class="privacyText">In order to facilitate the management of the Metro Futures consultation, some of your personal data (your email address) will be collected, if you provide this information. Additionally, since we are working with a number of partners in order to manage the individual parts of the consultation, some of your data (your email address) must also be shared with certain trusted third parties. For more specific information on how your personal data may be used by third parties, as applicable please review the privacy policies available below: </p>

    <ul>
      <li><a href="https://sendgrid.com/policies/privacy-2016/">SendGrid</a></li>
      <li><a href="https://www.digitalocean.com/legal/privacy-policy/">Digital Ocean</a></li>
      <li><a href="https://vercel.com/legal/privacy-policy">Vercel</a></li>
    </ul>

  <p class="privacyText">We will only share the personal data that is necessary and will take measures to ensure that it is protected and does not remain stored with us (Open Lab on behalf of Nexus), or with third parties any longer than necessary. Your personal data will not be used for purposes beyond being notified about the Metro Futures consultation in September and October 2020. </p>

  <p class="privacyText">The following personal data will be collected and processed for the reasons outlined below:</p>

  <ul>
    <li><strong>Email address:</strong> used to notify you, by email, of updates about the Metro Futures 2020 consultation throughout September and October 2020. We will only store this data until 31st October 2020, after which time it will be deleted.</li>
  </ul>

  <p class="privacyText">By providing your email address, you are consenting to these terms.</p>
  
  <p class="privacyText">If you have any specific questions about the use of your personal data, please contact {{supportEmail}} </p>

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

</style>