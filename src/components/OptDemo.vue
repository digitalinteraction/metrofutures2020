<template>
  <div class="optDemo">
    <p class="summaryText">Next, you can share this journey or experience more people’s journeys. First, please tell us a little more about yourself and your Metro journeys (optional).</p>
  
    <p class="calvert question"><span class="bold">What is your main purpose for travelling on Tyne and Wear Metro?</span></p>
    <b-form-select  v-model="purpose" :options="purposes">
      <template v-slot:first>
        <b-form-select-option :value="null" selected>-- Please select an option --</b-form-select-option>
      </template>
      Please select an option
    </b-form-select>
    
    <p class="calvert question"><span class="bold">How often do you travel on Tyne and Wear Metro?</span></p>
    
    <b-form-select  v-model="frequency" :options="frequencies">
      <template v-slot:first>
        <b-form-select-option :value="null" selected>-- Please select an option --</b-form-select-option>
      </template>
      Please select an option
    </b-form-select>
    
    <p class="calvert question"><span class="bold">Gender?</span></p>
    <b-form-select @change="changeGender" v-model="gender" :options="genders">
      <template v-slot:first>
        <b-form-select-option :value="null" selected>-- Please select an option --</b-form-select-option>
      </template>
      Please select an option
    </b-form-select>
    
    <div v-if="otherGender" id="genderTextDiv">
      <textarea
        id="textarea"
        v-model="genderOtherText"
        placeholder="Enter your gender..."
        rows="2" class="form-control"
      ></textarea>
    </div>
    
    <p class="calvert question"><span class="bold">Ethnicity?</span></p>
    <b-form-select  v-model="ethnicity" :options="ethnicities">
      <template v-slot:first>
        <b-form-select-option :value="null" selected>-- Please select an option --</b-form-select-option>
      </template>
      Please select an option
    </b-form-select>
    
    <p class="calvert question"><span class="bold">Do you have a disability?</span></p>
    <b-form-group>
      <b-form-radio v-model="dis" name="some-radios" value="yes">Yes</b-form-radio>
      <b-form-radio v-model="dis" name="some-radios" value="no">No</b-form-radio>
    </b-form-group>
    
    <div v-if="dis === 'yes'">
      <p class="calvert "><span class="bold">If yes, what?</span></p>
      <b-form-select v-model="disability" :options="disabilities">Please select an
      option
      </b-form-select>
      <textarea
        id="textDisability"
        v-model="disabilityOtherText"
        placeholder="Please describe."
        rows="2"
        class="form-control"
        v-show="disability === 'Other'"
      ></textarea>
    </div>
    <b-button block variant="outline-secondary" @click="submitInfo">Continue</b-button>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "OptDemo",
  data() {
    return {
      fillQuestionsError: false,
      gender: '',
      otherGender: false,
      genderOtherText: '',
      genders: ['Male', 'Female', 'Other/Prefer to self-describe', 'Prefer not to say'],
      ethnicity: '',
      ethnicities: ['White', 'Black/Black British', 'Asian/Asian British', 'Chinese/Thai/Japanese', 'Mixed', 'Other'],
      dis: 'no', // yes/no answer to trigger options
      disability: '',
      disabilityOtherText: "",
      disabilities: ['Visual impairment', 'Mobility impairment', 'Hearing impairment', 'Cognitive impairment', 'Other'],
      purpose: '',
      purposes: ['Work', 'Leisure', 'Shopping', 'Visiting friends/relative', 'Other'],
      frequency: '',
      frequencies: ['5+ days a week', '3-4 days a week', '1-2 days a week', '1-2 times a month', 'Now and then', 'Rarely/never']
    }
  },
  methods: {
    ...mapMutations(["completeInfo"]),
    changeGender() {
      if (this.gender === 'Other/Prefer to self-describe') {
        this.otherGender = true;
      } else {
        this.otherGender = false;
      }
    },
    submitInfo() {
      if (this.genderOtherText) {
        if (this.genderOtherText.length > 0) {
          this.gender = this.genderOtherText;
        }
      }
      if (this.disability === "Other") {
        if (this.disabilityOtherText.length > 0) {
          this.disability = this.disabilityOtherText
        }
      }

      let payload = {
        2: this.gender,
        3: this.ethnicity,
        4: this.disability,
        5: this.purpose,
        6: this.frequency
      }
      this.axios.post(`${process.env.VUE_APP_API_URL}/api/response/participant`, {
        params: payload
      })
        .catch(error => error.response ? console.log(error.response.data) : console.log(error))


      this.completeInfo();
    }
  },

}
</script>

<style>

</style>