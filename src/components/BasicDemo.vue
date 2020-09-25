<template>
    <div class="demoWrapper">
      <p class="calvert">Before you begin, please tell us:</p>
      <p class="calvert"><span class="bold">Where do you live? (Which local authority?)</span></p>
      <b-form-select @change="changeLA" v-model="localAuthority" :options="authorities">
      <template v-slot:first>
        <b-form-select-option :value="null" selected>-- Please select an option --</b-form-select-option>
      </template>
      Please select an option
      </b-form-select>
      <div v-if="otherLA" id="LATextDiv">
        <textarea
        id="textarea"
        v-model="LAOtherText"
        placeholder="Enter where you live..."
        rows="2" class="form-control"
        ></textarea>
      </div>
      <br>
      <br>
      <p class="calvert question"><span class="bold">How old are you?</span></p>
      <b-form-select @change="changeAge" v-model="age" :options="ages">
        <template v-slot:first>
          <b-form-select-option :value="null" selected>-- Please select an option --</b-form-select-option>
        </template>
        Please select an option
      </b-form-select>
      <span v-if="displayError"><strong>Please answer the two questions to continue.</strong> This information is important for the consultation and your answers are given anonymously.</span>
      <b-button id="LAButton" block variant="primary" @click="submit" :disabled="invalid()">Get Started</b-button>
    </div>
</template>


<script>
// Basic demographic question
import {mapMutations} from 'vuex'
export default {
  
  name: "BasicDemo",
  data() {
    return {
      localAuthority: '',
      LAOtherText: '',
      authorities: [
          {value: 'CountyDurham', text: 'County Durham'},
          {value: 'Gateshead', text: 'Gateshead'},
          {value: 'Newcastle', text: 'Newcastle'},
          {value: 'NorthTyneside', text: 'North Tyneside'},
          {value: 'Northumberland', text: 'Northumberland'},
          {value: 'SouthTyneside', text: 'South Tyneside'},
          {value: 'Sunderland', text: 'Sunderland'},
          {value: 'OtherNorthEast', text: 'Other North East'},
          {value: 'Other', text: 'Other'}
      ],
      age: '',
      ages: ['16 or under', '17-24', '25-34', '35-44', '45-54', '55-65', '66-75', '76+'],
      otherLA: false,
      displayError: false
    }
  },
  methods: {
    ...mapMutations(["completeDemographic"]),
    changeLA() {
      // if other is selected display free text box
      if (this.localAuthority === 'Other') {
        this.otherLA = true;
      }
      if (this.localAuthority && this.age) {
        this.displayError = false
      }
    },
    changeAge() {
      if (this.localAuthority && this.age) {
        this.displayError = false
      }
    },
    invalid() {
      if (this.localAuthority && this.age) {
        return false;
      } else {
        return true;
      }
    },
    submit() {
      if (!this.invalid()) {
        // Form is valid
        
        // completeDemographic on state
        this.completeDemographic();

        if (this.localAuthority === 'Other' && this.LAOtherText) {
          if (this.LAOtherText.length > 0) {
            this.localAuthority = this.LAOtherText;
          }
        }

        let payload = {
          0: this.localAuthority,
          1: this.age,
        }

        this.axios.post(`${process.env.VUE_APP_API_URL}/api/response/participant`, {
          params: payload
        })
          .catch(error => error.response ? console.log("Error submitting demographic info:",error.response.data) : console.log("Error submitting demographic info:", error))

      }
    },
  }

}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  textarea {
    max-width: $content-max-width / 3;
    margin-left: auto;
    margin-right: auto;
  }

  select {
    max-width: $content-max-width / 3;
    margin-left: auto;
    margin-right: auto;
  }

  button {
    max-width: $content-max-width / 3;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1.5em;
  }

  // Media rule for phones screens
  @media only screen and (max-width: $media-small) {
    
    .demoWrapper {
      max-width: 100%;
    }

    button {
      margin-bottom: 1.5em;
    }

  }

</style>