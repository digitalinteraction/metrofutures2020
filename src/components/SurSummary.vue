<template>
    <b-container fluid>

        <div v-if="showQuestions">
<div class="row">
        <b-col  class="largeImgColumn col-lg-8 col-12">
<!--            todo this should be first image from carousel-->
            <b-img fluid src="https://cdn.metrofutures.org.uk/conf/Camera1_1_1_0_0_0_1_1.jpg"></b-img>
        </b-col>

            <b-col class="col-lg-3 col-12">


                <p class="calvert question"><span class="bold">What is your gender?</span></p>
                <b-form-select v-model="gender" :options="genders">Please select an
                    option
                </b-form-select>

                <p class="calvert question"><span class="bold">What is your ethnicity?</span></p>
                <b-form-select v-model="ethnicity" :options="ethnicities">Please select an
                    option
                </b-form-select>

                <p class="calvert question"><span class="bold">Do you have a disability?</span></p>
                <b-form-group>
                    <b-form-radio v-model="dis" name="some-radios" value="yes">Yes</b-form-radio>
                    <b-form-radio v-model="dis" name="some-radios" value="no">No</b-form-radio>
                </b-form-group>

                <div v-if="dis === 'yes'">
                <p class="calvert "><span class="bold">If yes, what?</span></p>
                <b-form-select  v-model="disability" :options="disabilities">Please select an
                    option
                </b-form-select>
</div>
                <p class="calvert question"><span class="bold">What is the main purpose of your journey?</span></p>
                <b-form-select v-model="purpose" :options="purposes">Please select an
                    option
                </b-form-select>
                <br>
                <p class="calvert question"><span class="bold">How often do you use the Metro?</span></p>

                <b-form-select v-model="frequency" :options="frequencies">Please select an
                    option
                </b-form-select>
                <p>*required</p>
                <b-row>
                    <b-col class="submitBtn">
                        <b-button block variant="outline-secondary" @click="submitInfo">Continue</b-button>
                        <p v-if="ageError === true">Please select an age range</p>
                    </b-col>
                </b-row>
            </b-col>
</div>
        </div>

        <div v-if="!showQuestions">
            <b-carousel
                    id="carousel-1"
                    :interval="0"
                    controls
                    indicators
                    background="#ababab"
                    img-width="1024"
                    img-height="480"
                    style="text-shadow: 1px 1px 2px #333;"
            >
                <!--        todo load images into slides here-->
                <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>
                <b-carousel-slide src="https://cdn.metrofutures.org.uk/conf/Camera1_1_1_0_0_0_2_1.jpg"></b-carousel-slide>
            </b-carousel>
        </div>

    <b-row id="optionsRow">
        {{images[3]}}
      <b-col id="option1" class="option col-6 text-right" @click="toggleFeatures()"><p class="text-right borderRight"><b-icon-info-circle></b-icon-info-circle> VIEW STANDARD FEATURES </p></b-col>
      <b-col id="option2" class="option "><p class="borderRight text-center"><b-icon-printer></b-icon-printer> PRINT </p></b-col>
      <b-col id="option3" class="option "><p class="text-center"><b-icon-envelope></b-icon-envelope> SEND PDF</p></b-col>
      <b-col id="option4" class="option text-center"><p class="text-center"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23z" fill="#626262"/></svg>
        SHARE</p></b-col>
    </b-row>

    <b-row v-if="viewFeatures">
      <b-col>
      <b-row class="featuresRow">
        <b-col>
          Exterior
        </b-col>
        <b-col>
          <p>4 Carriages</p>
          <p>One connected space</p>
          <p>8 Doors per side</p>
          <p>LED highlights</p>
          <p>Video feed front and rear</p>
        </b-col>
      </b-row>

    <b-row class="featuresRow">
      <b-col>Interior</b-col>
      <b-col>
        <p>108 Seating capacity</p>
        <p>8 Disability spaces</p>
        <p>4 Multipurpose bike & pram zones</p>
        <p>22 Priority seats for elderly and pregnant</p>
        <p>270 Max occupancy</p>
        <p>Passenger screen displays</p>
        <p>Onboard wifi*</p>
      </b-col>
    </b-row>

    <b-row id="optionsAsterix" class="text-center">
      <p>* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum.</p>
    </b-row>
      </b-col>
    </b-row>

      <b-row id="stadlerFooter">
        <b-img src="../assets/stadlerBlack.svg"></b-img>
      </b-row>

      </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'SurSummary',
  data() {
    return {
      images: [], // list of images to load into carousel
    showQuestions: true, // participant q's or slideshow
      viewFeatures: false,
        gender: '',
        genders: ['Male', 'Female', 'Other/ Prefer not to self-describe', 'Prefer not to say'],
        ethnicity: '',
        ethnicities: ['White', 'Black/Black British', 'Asian/Asian British', 'Chinese/Thai/Japanese', 'Mixed', 'Other'],
        dis: 'no', // yes/no asnwer to trigger options
        disability: '',
        disabilities: ['Visual impairment', 'Mobility impairment', 'Hearing impairment', 'Cognitive impairment', 'Other'],
        purpose: '',
        purposes: ['Work', 'Leisure', 'Shopping', 'Visiting friends/relative', 'Other'],
        frequency: '',
        frequencies: ['5+ days a week', '3-4 days a week', '1-2 days a week', '1-2 times a month', 'Now and then', 'Rarely/never']

    }
  },
  computed: {
    ...mapGetters([
      'getConfigAnswers'
    ])
  },
  methods: {
  toggleFeatures() {
    if (this.viewFeatures) {
      this.viewFeatures = false;
    } else {
      this.viewFeatures = true;
    }
  },
      onSlideStart() {
          this.sliding = true
      },
      onSlideEnd() {
          this.sliding = false
      },
      submitInfo() {
      console.log(this.age.length);
          // submit answers
          let payload = {
              2:this.gender,
              3: this.ethnicity,
              4: this.disability,
              5: this.purpose,
              6: this.frequency
          }
          this.axios.post(`${process.env.VUE_APP_API_URL}/api/response/participant`, {
              headers: {
                  Cookie: this.$cookies.get('mfsid')
              },
              params: payload
          })
              .then(response => {
                  console.log(response);

              })
              .catch(error => error.response ? console.log(error.response.data) : console.log(error))
          this.showQuestions = false;

      }
  },
 beforeMount() {
  // look at answers stored in state and use them to construct API call to retrieve
    // images for carousel
      const answers = this.getConfigAnswers;
      let payload = {
          cam: '',
          // get any answers stored and replace any undefined with 1
          o1 :answers[0] !== undefined ? answers[0]+1 : 1,
          o2 : answers[1] !== undefined ? answers[1]+1 : 1,
          o3 : answers[2] !== undefined ? answers[2]+1 : 1,
          o4 : answers[3] !== undefined ? answers[3]+1 : 1,
          o5 : answers[4] !== undefined ? answers[4]+1 : 1,
          o6 : answers[5] !== undefined ? answers[5]+1 : 1,
          o7 : this.lighting ? parseInt(this.lighting) : 1
      }

    // for each camera angle, add on question answers and get image from API
    const cameraAngles = [1, 2, 4, 14];
    for (const cam of cameraAngles) {
      payload.cam = cam;
        this.axios.get(`${process.env.VUE_APP_API_URL}/api/images/image`, {
            headers: {
                Cookie: this.$cookies.get('mfsid')
            },
            params: payload
        })
            .then(response => {
                this.images.push(response.data);console.log('slides=' + this.images.length);
            })
            .catch(error => error.response ? console.log('fetch image error' + error.response.data) : console.log(error))
    }



    }

}


</script>

<style scoped lang="scss">

#optionsRow {
font-size: small;
  border-bottom: 1px #dddddd solid;
  width: 100%;
}

.question {
    padding-top: 2em;
}

.borderRight {
  border-right: 1px #DDDDDD solid;
  padding-right: 0.5em;
}

.option {
  padding: 1em;
    cursor: pointer;
}
#optionsAsterix {
  font-size: small;
padding-top: 1em;

}

.submitBtn {margin-bottom: 1em;}


#option1 {
  padding-right: 0;
}

  #option4 {
    background-color: #FEC600;
  }

  .featuresRow {
    border-bottom: 1px #dddddd solid;
    padding-top: 1em;
    padding-bottom: 1em;
    & p {
      padding-bottom: 0.8em;
    }
  }

    #stadlerFooter {
        background-color: #DDDDDD;
        padding-top: 1em;
        padding-bottom: 1em;
    }
</style>
