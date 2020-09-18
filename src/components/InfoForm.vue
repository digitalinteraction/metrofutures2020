<template>
  <div>
    <b-col>
      <b-row id="localAuthority">
        <p class="calvert">Before you begin, please tell us:</p>
        <p class="calvert" v-bind:class="{ errorText: displayError }">
          <span class="bold">Where do you live? (Which local authority?)*</span>
        </p>
        <br />
        <b-form-select required @change="changeLA" v-model="localAuthority" :options="authorities">
          <template v-slot:first>
            <b-form-select-option :value="null" selected>-- Please select an option --</b-form-select-option>
          </template>
          Please select an
          option
        </b-form-select>
        <div v-if="otherLA" id="LATextDiv">
          <textarea
            id="textarea"
            v-model="LAOtherText"
            placeholder="Enter where you live..."
            rows="2"
            class="form-control"
          ></textarea>
        </div>
        <br />
        <br />
        <p class="calvert question" v-bind:class="{ errorText: displayError }">
          <span class="bold">How old are you?*</span>
        </p>
        <b-form-select @change="changeAge" v-model="age" :options="ages">
          <template v-slot:first>
            <b-form-select-option :value="null" selected>-- Please select an option --</b-form-select-option>
          </template>
          Please select an
          option
        </b-form-select>

        <p class="calvert question text-left">
          <span class="bold">What is your main purpose for travelling on Tyne and Wear Metro?</span>
        </p>
        <b-form-select v-model="purpose" :options="purposes">
          <template v-slot:first>
            <b-form-select-option :value="null" selected>-- Please select an option --</b-form-select-option>
          </template>
          Please select an
          option
        </b-form-select>

        <p class="calvert question">
          <span class="bold">How often do you travel on Tyne and Wear Metro?</span>
        </p>

        <b-form-select v-model="frequency" :options="frequencies">
          Please select an
          option
        </b-form-select>

        <p class="calvert question">
          <span class="bold">Gender?</span>
        </p>
        <b-form-select @change="changeGender" v-model="gender" :options="genders">
          Please select an
          option
        </b-form-select>

        <div v-if="otherGender" id="genderTextDiv">
          <textarea
            id="textarea"
            v-model="genderOtherText"
            placeholder="Enter your gender..."
            rows="2"
            class="form-control"
          ></textarea>
        </div>

        <p class="calvert question">
          <span class="bold">Ethnicity?</span>
        </p>
        <b-form-select v-model="ethnicity" :options="ethnicities">
          Please select an
          option
        </b-form-select>

        <p class="calvert question">
          <span class="bold">Do you have a disability?</span>
        </p>
        <b-form-group class="checkbox question">
          <b-form-radio v-model="dis" name="some-radios" value="yes">Yes</b-form-radio>
          <b-form-radio v-model="dis" name="some-radios" value="no">No</b-form-radio>
        </b-form-group>

        <div v-if="dis === 'yes'">
          <p class="calvert">
            <span class="bold">If yes, what?</span>
          </p>
          <b-form-select v-model="disability" :options="disabilities">
            Please select an
            option
          </b-form-select>
        </div>

        <p v-if="displayError">Please answer the first two questions marked * to continue. This information is important for the consultation and your answers are given anonymously.</p>

        <b-button v-if="privacyNotice===true" block @click="submitInfo">Continue</b-button>

      </b-row>
    </b-col>

    <br />

    <div id="privacy-container" v-if="privacyNotice===false">
      <div>
        <p>In using this site, you agree that you are happy for your responses and interactions on this website to be included in the consultation for the Metro Futures 2020 project.</p>

        <p>We collect the following data about you:</p>
        <ul class="privacy-list">
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
        <b-button  v-if="privacyNotice===false" block :disabled="tick === false" @click="submitWithPrivacy">Continue</b-button>
      </div>

      <p class="modal-links"><a href="#" v-b-modal.privacy-modal>Privacy Policy</a> | <a href="#" v-b-modal.terms-modal>Terms &amp; Conditions</a></p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
//import VueCookies from 'vue-cookies'

export default {
  name: "infoForm",
  components: {},
  data() {
    return {
      tick: false,
      localAuthority: "",
      authorities: [
        { value: "CountyDurham", text: "Country Durham" },
        { value: "Gateshead", text: "Gateshead" },
        { value: "Newcastle", text: "Newcastle" },
        { value: "NorthTyneside", text: "North Tyneside" },
        { value: "Northumberland", text: "Northumberland" },
        { value: "SouthTyneside", text: "South Tyneside" },
        { value: "Sunderland", text: "Sunderland" },
        { value: "OtherNorthEast", text: "Other North East" },
        { value: "Other", text: "Other" }
      ],
      age: "",
      ages: [
        "16 or under",
        "17-24",
        "25-34",
        "35-44",
        "45-54",
        "55-65",
        "66-75",
        "76+"
      ],
      otherLA: false,
      gender: "",
      otherGender: false,
      genderOtherText: "",
      genders: [
        "Male",
        "Female",
        "Other/Prefer to self-describe",
        "Prefer not to say"
      ],
      ethnicity: "",
      ethnicities: [
        "White",
        "Black/Black British",
        "Asian/Asian British",
        "Chinese/Thai/Japanese",
        "Mixed",
        "Other"
      ],
      dis: "no", // yes/no answer to trigger options
      disability: "",
      disabilities: [
        "Visual impairment",
        "Mobility impairment",
        "Hearing impairment",
        "Cognitive impairment",
        "Other"
      ],
      purpose: "",
      purposes: [
        "Work",
        "Leisure",
        "Shopping",
        "Visiting friends/relative",
        "Other"
      ],
      frequency: "",
      frequencies: [
        "5+ days a week",
        "3-4 days a week",
        "1-2 days a week",
        "1-2 times a month",
        "Now and then",
        "Rarely/never"
      ],

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
    ...mapGetters(["privacyNotice", "getInfoCompleted"])
  },
  methods: {
    ...mapMutations(["acknowledgePrivacy", "completeInfo", "completeDemographic"]),
    changeGender() {
      if (this.gender === "Other/Prefer to self-describe") {
        this.otherGender = true;
      } else {
        this.otherGender = false;
      }
    },
    changeLA() {
      // if other is selected display free text box
      if (this.localAuthority === "Other") {
        this.otherLA = true;
      }
      if (this.localAuthority && this.age) {
        this.displayError = false;
      }
    },
    changeAge() {
      if (this.localAuthority && this.age) {
        this.displayError = false;
      }
    },
    submitWithPrivacy() {
      this.acknowledgePrivacy(); 
      this.submitInfo();
    },
    submitInfo() {
      if (!this.localAuthority || !this.age) {
        // no answer for one or both fields
        this.displayError = true;
      } else {
      this.completeInfo();
      this.completeDemographic();
      this.$bvModal.hide("privacyNoticeModal");
      // if gender other text is filled in then send this instead
      if (this.genderOtherText) {
        if (this.genderOtherText.length > 0) {
          this.gender = this.genderOtherText;
        }
      }
      // submit answers
      let payload = {
        0: this.localAuthority,
        1: this.age,
        2: this.gender,
        3: this.ethnicity,
        4: this.disability,
        5: this.purpose,
        6: this.frequency
      };
      this.axios
        .post(`${process.env.VUE_APP_API_URL}/api/response/participant`, {
          headers: {
            Cookie: this.$cookies.get("mfsid")
          },
          params: payload
        })
        .then(response => {
          console.log(response);
        })
        .catch(error =>
          error.response ? console.log(error.response.data) : console.log(error)
        );
      this.showQuestions = false;
    }
    },
    close() {
      this.$bvModal.hide("privacyNoticeModal");
    },
    
  }
  
};
</script>

<style scoped>
.calvert {
  font-family: Calvert, serif;
}
.question {
    padding-top: 1em;
}

.checkbox {
  padding-left: 1em;
}
.errorText {
  color: red;
}
.privacy-list {
  text-align: left;
  padding-bottom: 1em;
  font-size: smaller;
}
.modal-links{
  font-size: x-small;
}
a {
  color: black;
}
</style>
