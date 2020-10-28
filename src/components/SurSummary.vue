<template>
    <b-container fluid>
        <b-row>
            <b-col>
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
                                alt="Images of your customised train"
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
                    <b-carousel-slide>
                        <template v-slot:img>
                            <img
                                    class="d-block img-fluid w-100"
                                    width="1024"
                                    height="480"
                                    v-bind:src="images[4]"
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
                                    v-bind:src="images[5]"
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
                                    v-bind:src="images[6]"
                                    alt="image slot"
                            >
                        </template>
                    </b-carousel-slide>
                </b-carousel>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <p class="summaryText">Review, download and share your chosen finishing touches for your new Metro here. First, please tell us a little more about yourself and your Metro journeys (optional).</p>
            </b-col>
        </b-row>

        <b-row id="optionsRow">
            <b-col id="option1" class="option col-lg-6 text-right" @click="toggleFeatures()"><p class="text-right borderRight"><b-icon-info-circle></b-icon-info-circle> VIEW STANDARD FEATURES </p></b-col>
            <b-col id="option3" class="option"  @click="createPDF"><p class="text-center"><b-icon-envelope></b-icon-envelope> SEND PDF</p></b-col>
                <b-col class="option"> <router-link to="/"><p class="text-center">RETURN TO HOME</p></router-link></b-col>
            <b-col  class="option" id="shareCol">
                <b-dropdown id="dropdown-1" text="SHARE" class="m-md-2" variant="primary">
                    <b-dropdown-item>   
                            <ShareNetwork
                                network="facebook"
                                url="https://metrofutures.org.uk"
                                title="I just customised my perfect Metro."
                                description="Have a play around and make your own at: metrofutures.org.uk"
                                hashtags="ShapeYourMetro"
                            > Facebook
                        <b-img src="../assets/Facebook_logo_36x36.svg"></b-img>
                            </ShareNetwork>
                    </b-dropdown-item>


                    <b-dropdown-item>
                            <ShareNetwork
                                network="twitter"
                                url="https://metrofutures.org.uk"
                                title="I've just customised my Metro. You can make your own at:"
                                twitter-user="My_Metro"
                                hashtags="ShapeYourMetro"
                            > Twitter
                                <b-img src="../assets/twitter.png" height="30px;"></b-img>
                            </ShareNetwork>
                    </b-dropdown-item>

                </b-dropdown>
            </b-col>

        </b-row>

        <b-row v-if="viewFeatures">
            <b-col>
                <b-row class="featuresRow">
                    <b-col>
                    Exterior
                    </b-col>
                    <b-col>
                    <p>5 Carriages</p>
                    <p>One connected space</p>
                    <p>8 pairs of double doors per side</p>
                    <p>LED highlights</p>
                    </b-col>
                </b-row>

                <b-row class="featuresRow">
                    <b-col>Interior</b-col>
                    <b-col>
                        <p>108 Seating capacity (with potential for additional tip-up seats in multi-use zones under consideration)</p>
                        <p>4 dedicated wheelchair spaces</p>
                        <p>4 multi-use bike & pram zones</p>
                        <p>22 priority seats for older and pregnant people</p>
                        <p>600 passengers maximum train capacity</p>
                        <p>Passenger information displays</p>
                        <p>Onboard seamless connectivity</p>
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
import {mapGetters, mapMutations} from "vuex";
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
        disabilityOtherText: "",
        disabilities: ['Visual impairment', 'Mobility impairment', 'Hearing impairment', 'Cognitive impairment', 'Other'],
        purpose: '',
        purposes: ['Work', 'Leisure', 'Shopping', 'Visiting friends/relative', 'Other'],
        frequency: '',
        frequencies: ['5+ days a week', '3-4 days a week', '1-2 days a week', '1-2 times a month', 'Now and then', 'Rarely/never']

    }
  },
  computed: {
    ...mapGetters([
      'getConfigAnswers',
      "getOnlyInfo"
    ])
  },
  methods: {
      ...mapMutations(["completeInfo"]),
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
          this.$bvModal.hide('questionModal');
          this.completeInfo();
          // if gender other text is filled in then send this instead
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
          // submit answers
          let payload = {
              2: this.gender,
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
          //let pdfName = 'Metro Futures';
          var doc = new jsPDF();
          doc.text("Metro Futures", 10, 10);
          //doc.save(pdfName + '.pdf');

          //for each image in slideshow, get dataturi and add to pdf, adding to a new position
          let positionx = 20;
          let positiony = 20;

          this.getDataUri(this.images[0]).then((image1) => {
              doc.addImage(image1, 'PNG', positionx, positiony, 178, 100);
              this.getDataUri(this.images[1]).then((image2) => {
                  doc.addImage(image2, 'PNG', positionx, positiony + 120, 178, 100);
                  doc.addPage(); //page break
                  this.getDataUri(this.images[2]).then((image3) => {
                      doc.addImage(image3, 'PNG', positionx, positiony, 178, 100);
                      this.getDataUri(this.images[3]).then((image4) => {
                          doc.addImage(image4, 'PNG', positionx, positiony + 120, 178, 100);
                          doc.addPage(); //page break
                          this.getDataUri(this.images[4]).then((image5) => {
                              doc.addImage(image5, 'PNG', positionx, positiony, 178, 100);
                          this.getDataUri(this.images[5]).then((image6) => {
                              doc.addImage(image6, 'PNG', positionx, positiony + 120, 178, 100);
                              doc.addPage(); //page break
                              this.getDataUri(this.images[6]).then((image7) => {
                              doc.addImage(image7, 'PNG', positionx, positiony, 178, 100);
                          doc.output('dataurlnewwindow');
                        });
                  });
              });
          });
                      });
                  });
              });



      },
      // https://stackoverflow.com/a/58936995/13075525
      getDataUri(url) {
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
     const design = answers[6] !== undefined ? answers[5]+1 : 1

    // for each camera angle, add on question answers and get image from API
    const cameraAngles = [1, 2, 3, 4, 5, 6, 13];
    for (const cam of cameraAngles) {

        if (cam !== 6) {
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
                params: payload
            })
                .then(response => {
                    this.images.push(response.data.url);
                })
                .catch(error => error.response ? console.log('fetch image error' + error.response.data) : console.log(error))
        } else {

            // add new end wall design from different endpoint
            let payload2 = {
                cam: cam,
                o1,
                o2,
                o3,
                o4,
                o5,
                o6,
                o7,
                design
            }

            this.axios.get(`${process.env.VUE_APP_API_URL}/api/images/endwall`, {
                params: payload2
            })
                .then(response2 => {
                    this.images.push(response2.data.url);
                    // console.log('url 2 for cam ' + cam + ' ' + response2.data.url);
                })
        }

    }

    },
    mounted() {
      this.$bvModal.show('questionModal');
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

#dropdown-1 {
    margin-top: 0;
}

.borderRight {
  border-right: 1px #DDDDDD solid;
  padding-right: 0.5em;
}

.option {
  padding: 1em;
    cursor: pointer;
    color: black !important;
    & a {
        color: black !important;
        text-decoration: none !important;
    }
}



#optionsAsterix {
  font-size: small;
padding-top: 1em;
}

.summaryText {
  text-align: justify;
}

.submitButton {
    margin-top: 1em;
}


#option1 {
  padding-right: 0;
    margin-top: 0;
}

p.text-right {
    margin-top: 0;
}

  #option4 {
    background-color: #FEC600;
  }

#shareCol {
    padding-top: 0.2em;
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
