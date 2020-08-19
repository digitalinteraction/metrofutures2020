<template>
  <div class="home">

      <div class="header">
          <b-img id="metroLogo" src="../assets/Image4.png" fluid alt="Metro logo"></b-img>
      </div>
          <div class="mainBody">
<!--              text to display before user has registered-->
              <div v-if="!confirmed" class="registerText">
                  <p class="metroFont">Your Metro is arriving soon.</p>
                  <p id="mailListInfo">Join our mailing list to. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>


                  <b-form class="emailForm">
                      <b-form-input type="email" v-model="email" required placeholder="Insert Email address"></b-form-input> <br>
                      <p v-if="msg.email">{{msg.email}}</p>
                      <b-button id="registerBtn" variant="primary" v-on:click="register" :disabled="alreadySubmitted">Register</b-button>
                  </b-form>

                  <p class="smallText">* By registering your email i hereby consent to be contacted by the Metro Futures team in regards to ….</p>

              </div>

<!--              text to display after user has registered-->
          <div v-if="confirmed" class="confirmedText">
              <p class="metroFont">Thank You</p>
              <p id="confirmedEmail">{{email}}<b-icon icon="check2" variant="success"></b-icon></p>
              <p>is successfully registered. Stay tuned to hear the latest announcements on your new Metro.</p>
              <b-button id="homeBtn" variant="primary" v-on:click="resetRegister">Go Home</b-button>
          </div>

<!--              <b-img id="bgroundImg" src="../assets/Teaser1_2_rails_longer.png" fluid alt="Metro image"></b-img>-->
              <div class="footer" >
                  <b-row>
                      <b-col class="float-left">
                          <b-img fluid src="../assets/nexusLogo.png"></b-img>
                          <!--    todo STADLER logo-->
                          <b-img fluid id="stadlerLogo" src="../assets/StadlerTemp.jpg"></b-img>
                      </b-col>
                      <b-col id="centreCol">
                          <!--    todo privacy policy and t's and c's-->
                          <router-link to="/privacypolicy"><p class="float-right">Privacy Policy</p></router-link>
                      </b-col>
                      <b-col id="terms">
                          <router-link to="/terms"><p class="float-left">Terms & Conditions</p></router-link>
                      </b-col>
                      <b-col id="lab">
                          <!--                    todo get white openlab logo-->
                          <p>Powered by <b-img fluid src="../assets/openLabTemp.png"></b-img></p>
                      </b-col>
                  </b-row>

              </div>
          </div>






  </div>
</template>

<script>
// @ is an alias to /src
//import Footer from "@/components/Footer";
//import Header from "@/components/Header";

export default {
  name: 'Home',
  components: {
  //  Footer,
   // Header
  },
    data() {
      return {
          email: null,
          msg: [],
          error: false,
          alreadySubmitted: false,
          confirmed:  false,
      }
    },
    watch: {
        email(value){
            // binding this to the data value in the email input
            this.email = value;
            this.validateEmail(value);
        }
    },
    methods: {
        // todo replace with correct URLs

        validateEmail(value){
            // Vue doc's email validation regex
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(value))
            {
                this.error = false;
                this.msg['email'] = '';
            } else{
                this.error = true;
                this.msg['email'] = 'Invalid Email Address';
            }
        },
        register(e) {
            e.preventDefault();
            if (!this.error && this.email) {

                //todo check for indication email has already been submitted and prevent sending if it has

                console.log('submit');
                //todo sort CORS issue, check cookie sending
                this.axios.post( 'https://metrofutures2020-git-master.tfeltwell.vercel.app/api/mailing-list/subscribe', {
                    email: this.email,
                })
                    .then(response => {
                        console.log(response.data)
                        this.confirmed = true;
                    })
                    .catch(error => console.log(error.response.data))

            }

            },
        resetRegister() {
            // reset and display register text again
            this.email= null;
            this.error = false;
            this.confirmed = false;
        }

    },
    async mounted() {
        console.log('request session cookie');
        this.axios.get('https://metrofutures2020-git-master.tfeltwell.vercel.app/api/get-session')
        .then(response => {
            console.log(response);
        })

    }

}
</script>

<style>

    .home {
        height: 100vh;
        width: auto;
    }
    /*todo get correct Calvert font (this is causing borwser error)*/
    .metroFont {
        font-family: "Calvert", serif;
        font-size: 5em;
        text-shadow: 3px 3px 10px #FFF2A877;
    }

    .mainBody {
        position: relative;
        background-image: url("../assets/Teaser1_2_rails_longer.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100%;
        width: auto;
    }
    #stadlerLogo {
        padding-left: 0.5em;
    }
    #centreCol {
        margin-top: auto;
        margin-bottom: auto;
        border-right: 1px solid #FEC600;
    }

    #terms {
        margin-top: auto;
        margin-bottom: auto;
    }
    #lab {
        margin-top: auto;
        margin-bottom: auto;
    }
    p {
         margin: 0;
         font-family: "Open Sans", Arial,serif;
         font-size: small;
         color: #FFFFFF;
     }
    .footer {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .header {
        background-color: #FFFFFF;
    }

    #metroLogo {
        margin: 2px auto;
    }

    #registerBtn {
        /*background-color: #FEC600;*/
        /*color: black;*/
        font-family: "Open Sans", Arial,serif;
        width: 40%;
        font-size: small;
        padding-top: 1em;
        padding-bottom: 1em;
        margin-bottom: 1em;
    }

    .emailForm {
        width: 40%;
        margin-left:auto;
        margin-right:auto;
        margin-top: 15px;
    }
    .smallText {
        font-size: x-small;
    }



    #mailListInfo {
        width: 50%;
        margin: auto;
    }

    .registerText {
    position: absolute;
        top: 45%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 80%;
        font-family: "Open Sans", Arial,serif;
    }

    .confirmedText {
        position: absolute;
        top: 45%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 80%;
        font-family: "Open Sans", Arial,serif;
    }

    #homeBtn {
        width: 20%;
        font-size: small;
        padding-top: 1em;
        padding-bottom: 1em;
        margin-bottom: 1em;
        margin-top: 1.5em;
    }

    #confirmedEmail {
        margin: 1em;
        font-size: medium;
    }



</style>
