<template>
    <b-container fluid>

        <div v-if="showQuestions">
          <div class="row">
            <b-col  class="largeImgColumn col-lg-8 col-12">

                <b-img fluid :src="images[0]"></b-img>
            </b-col>

            <b-col class="col-lg-3 col-12">

                <p class="summaryText">To help with this public consultation, please tell us a little more about yourself and your Metro journeys. Afterwards you can explore images of the Metro that you configured, and you can share it on social media!</p>

                <p class="calvert question"><span class="bold">What is your main purpose for travelling on Tyne and Wear Metro?</span></p>
                <b-form-select  v-model="purpose" :options="purposes">Please select an
                    option
                </b-form-select>

                <p class="calvert question"><span class="bold">How often do you travel on Tyne and Wear Metro?</span></p>

                <b-form-select  v-model="frequency" :options="frequencies">Please select an
                    option
                </b-form-select>

                <p class="calvert question"><span class="bold">Gender?</span></p>
                <b-form-select @change="changeGender" v-model="gender" :options="genders">Please select an
                    option
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
                <b-form-select  v-model="ethnicity" :options="ethnicities">Please select an
                    option
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


</div>
                <b-button block variant="outline-secondary" @click="submitInfo">Continue</b-button>

            </b-col>
</div>
        </div>

        <div v-if="!showQuestions">
            <b-row>
                <b-col class="largeImgColumn col-lg-8 col-12">
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

                        <b-carousel-slide>
                            <template v-slot:img>
                                <img
                                        class="d-block img-fluid w-100"
                                        width="1024"
                                        height="480"
                                        v-bind:src="images[0]"
                                        alt="image slot"
                                >
                            </template>
                        </b-carousel-slide>

                        <b-carousel-slide>
                            <template v-slot:img>
                                <img
                                        class="d-block img-fluid w-100"
                                        width="1024"
                                        height="480"
                                        v-bind:src="images[1]"
                                        alt="image slot"
                                >
                            </template>
                        </b-carousel-slide>

                        <b-carousel-slide>
                            <template v-slot:img>
                                <img
                                        class="d-block img-fluid w-100"
                                        width="1024"
                                        height="480"
                                        v-bind:src="images[2]"
                                        alt="image slot"
                                >
                            </template>
                        </b-carousel-slide>
                        <b-carousel-slide>
                            <template v-slot:img>
                                <img
                                        class="d-block img-fluid w-100"
                                        width="1024"
                                        height="480"
                                        v-bind:src="images[3]"
                                        alt="image slot"
                                >
                            </template>
                        </b-carousel-slide>
                    </b-carousel>
                </b-col>
                <b-col class="col-lg-3 col-12">
                    <p class="calvert"></p>
                    <p id="option1" class="option" @click="toggleFeatures()"><b-icon-info-circle></b-icon-info-circle> VIEW STANDARD FEATURES </p>
                    <p id="option2" class="option "><b-icon-printer></b-icon-printer> PRINT </p>
                    <p id="option3" class="option " @click="createPDF"><b-icon-envelope></b-icon-envelope> SEND PDF</p>

<!--                    social sharing-->
                    <b-dropdown id="dropdown-1" text="SHARE" class="m-md-2" variant="primary">
                        <b-dropdown-item>   <ShareNetwork
                                network="facebook"
                                url="https://metrofutures.org.uk/configure"
                                title="Something about Metro"
                                description="Something more about Metro."
                                quote="Quote"
                                hashtags="metro"
                        > Facebook
                            <b-img src="../assets/Facebook_logo_36x36.svg"></b-img>
                        </ShareNetwork>
                        </b-dropdown-item>


                        <b-dropdown-item>
                            <ShareNetwork
                                    network="twitter"
                                    url="https://metrofutures.org.uk/configure"
                                    title="Something about metro"
                                    twitter-user="@thebestmetro"
                                    hashtags="metro"
                            > Twitter
                                <b-img src="../assets/twitter.png" height="30px;"></b-img>

                            </ShareNetwork>
                        </b-dropdown-item>

                    </b-dropdown>
                </b-col>
            </b-row>

        </div>

<!--    <b-row id="optionsRow">-->
<!--      <b-col id="option1" class="option col-6 text-right" @click="toggleFeatures()"><p class="text-right borderRight"><b-icon-info-circle></b-icon-info-circle> VIEW STANDARD FEATURES </p></b-col>-->
<!--      <b-col id="option2" class="option "><p class="borderRight text-center"><b-icon-printer></b-icon-printer> PRINT </p></b-col>-->
<!--      <b-col id="option3" class="option "><p class="text-center"><b-icon-envelope></b-icon-envelope> SEND PDF</p></b-col>-->
<!--      <b-col id="option4" class="option text-center"><p class="text-center"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23z" fill="#626262"/></svg>-->
<!--        SHARE</p></b-col>-->
<!--    </b-row>-->

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
        <p>Onboard network connectivity</p>
      </b-col>
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
import jsPDF from 'jspdf'

export default {
  name: 'SurSummary',
  data() {
    return {
      images: [], // list of images to load into carousel
    showQuestions: true, // participant q's or slideshow
        fillQuestionsError: false,
      viewFeatures: false,
        gender: '',
        otherGender: false,
        genderOtherText: '',
        genders: ['Male', 'Female', 'Other/Prefer to self-describe', 'Prefer not to say'],
        ethnicity: '',
        ethnicities: ['White', 'Black/Black British', 'Asian/Asian British', 'Chinese/Thai/Japanese', 'Mixed', 'Other'],
        dis: 'no', // yes/no answer to trigger options
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

          // if gender other text is filled in then send this instead
          if (this.genderOtherText) {
          if (this.genderOtherText.length > 0) {
              this.gender = this.genderOtherText;
          }
      }
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
      },
      changeGender() {
          if (this.gender === 'Other/Prefer to self-describe') {
              this.otherGender = true;
          } else {
              this.otherGender = false;
          }
      },
      async createPDF() {
          console.log('create pdf');
          let pdfName = 'Metro Futures';
          var doc = new jsPDF();
          doc.text("Metro Futures", 10, 10);
          doc.save(pdfName + '.pdf');

          //for each image in slideshow, get dataturi and add to pdf, adding to a new position
          let positionx = 20;
          let positiony = 20;
          for (const image in this.images) {
              const imageuri = await this.getDataUri(image);
              doc.addImage(imageuri, 'PNG', positionx, positiony, 100, 100);
              positionx+=100;
              positiony+=100;
          }

          doc.output('dataurlnewwindow');
      },
      // https://stackoverflow.com/a/58936995/13075525
      getDataUri(url)
      {
          return new Promise(resolve => {
              var image = new Image();
              image.setAttribute('crossOrigin', 'anonymous'); //getting images from external domain

              image.onload = function () {
                  var canvas = document.createElement('canvas');
                  canvas.width = this.naturalWidth;
                  canvas.height = this.naturalHeight;

                  //next three lines for white background in case png has a transparent background
                  var ctx = canvas.getContext('2d');
                  ctx.fillStyle = '#fff';  /// set white fill style
                  ctx.fillRect(0, 0, canvas.width, canvas.height);

                  canvas.getContext('2d').drawImage(this, 0, 0);

                  resolve(canvas.toDataURL('image/jpeg'));
              };
              image.src = url;
          })
      }

  },

 beforeMount() {
  // look at answers stored in state and use them to construct API call to retrieve
    // images for carousel
     // get any answers stored and replace any undefined with 1
      const answers = this.getConfigAnswers;
      const o1 = answers[0] !== undefined ? answers[0]+1 : 1
     const o2 = answers[1] !== undefined ? answers[1]+1 : 1
     const o3 = answers[2] !== undefined ? answers[2]+1 : 1
     const o4 = answers[3] !== undefined ? answers[3]+1 : 1
     const o5 = answers[4] !== undefined ? answers[4]+1 : 1
     const o6 = answers[5] !== undefined ? answers[5]+1 : 1
     const o7 = this.lighting ? parseInt(this.lighting) : 1

    // for each camera angle, add on question answers and get image from API
    const cameraAngles = [1, 2, 4, 14];
    for (const cam of cameraAngles) {

        let payload = {
            cam: cam,
            o1,
            o2,
            o3,
            o4,
            o5,
            o6,
            o7
        }
        this.axios.get(`${process.env.VUE_APP_API_URL}/api/images/image`, {
            headers: {
                Cookie: this.$cookies.get('mfsid')
            },
            params: payload
        })
            .then(response => {
                this.images.push(response.data.url);console.log(payload);
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

.summaryText {
  text-align: justify;
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
