<template>
    <div class="home">

        <div class="header">
            <b-img alt="Metro logo" fluid id="metroLogo" src="../assets/Image4.png"></b-img>
        </div>

        <div class="mainBody">
            <!-- text to display before user has registered-->
            <div class="registerText" v-if="!confirmed">
                <h1 class="metroFont calvert">Your new Metro is arriving soon.</h1>
                <p id="mailListInfo">Join our mailing list for updates on when and how you can help us put the finishing
                    touches to trains.</p>

                <b-form class="emailForm">
                    <b-form-input placeholder="Insert Email address" required type="email"
                                  v-model="email"></b-form-input>
                    <br>
                    <p v-if="msg.email">{{msg.email}}</p>
                    <b-button :disabled="alreadySubmitted" id="registerBtn" v-on:click="register" variant="primary">
                        Register
                    </b-button>
                </b-form>

                <p class="smallText">* By registering your email I hereby consent to be contacted by the Metro Futures
                    team in regards to ….</p>

            </div>

            <!--text to display after user has registered-->
            <div class="confirmedText" v-if="confirmed">
                <h1 class="metroFont">Thank You</h1>
                <p id="confirmedEmail">{{email}}
                    <b-icon icon="check2" variant="success"></b-icon>
                </p>
                <p>is successfully registered. Stay tuned to hear the latest announcements on your new Metro.</p>
                <b-button id="homeBtn" v-on:click="resetRegister" variant="primary">Go Home</b-button>
            </div>


            <!--<b-img id="bgroundImg" src="../assets/Teaser1_2_rails_longer.png" fluid alt="Metro image"></b-img>-->
            <div class="footer">
                <b-row>
                    <b-col class="float-left">
                        <b-img fluid src="../assets/nexusLogo.png"></b-img>
                        <b-img fluid id="stadlerLogo" src="../assets/stadlerLogo.svg"></b-img>
                    </b-col>
                    <b-col id="centreCol">
                        <p class="float-right"><a href="#" v-b-modal.privacy-modal>Privacy Policy</a></p>
                    </b-col>
                    <b-col id="terms">
                        <p class="float-left"><a href="#" v-b-modal.terms-modal>Terms &amp; Conditions</a></p>
                    </b-col>
                    <b-col id="lab">
                        <p>Powered by
                            <b-img id="openlabLogo" fluid src="../assets/openlabLogoWhite.svg"></b-img>
                        </p>
                    </b-col>
                </b-row>

            </div>
        </div>

        <!-- Compontents for modals -->
        <Privacy/>
        <Terms/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Privacy from "@/components/Privacy";
    import Terms from "@/components/Terms";

    export default {
        name: 'Home',
        components: {
            Privacy,
            Terms
        },
        data() {
            return {
                email: null,
                msg: [],
                error: false,
                alreadySubmitted: false,
                confirmed: false,
            }
        },
        watch: {
            email(value) {
                // binding this to the data value in the email input
                this.email = value;
                this.validateEmail(value);
            }
        },
        methods: {
            // todo replace with correct URLs

            validateEmail(value) {
                // Vue doc's email validation regex
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(value)) {
                    this.error = false;
                    this.msg['email'] = '';
                } else {
                    this.error = true;
                    this.msg['email'] = 'Invalid Email Address';
                }
            },
            register(e) {
                e.preventDefault();
                if (!this.error && this.email) {
                    console.log('submit');

                    //todo sort CORS issue, check cookie sending
                    // Consider using vue-resource instead of axios ?
                    this.axios.post('https://metrofutures2020-git-master.tfeltwell.vercel.app/api/mailing-list/subscribe', {
                        headers: {
                            Cookie: this.$cookies.get('mfsid')
                        },
                        data: {
                            email: this.email
                        }
                    })
                        .then(response => {
                            console.log(response.data)
                            this.confirmed = true;
                        })
                        .catch(error => error.response ? console.log(error.response.data) : console.log(error))

                }

            },
            resetRegister() {
                // reset and display register text again
                this.email = null;
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

    /*todo get correct Calvert font (this is causing browser error) Currently using random font to demonstrate strategy works*/
    .metroFont {
        font-family: Inconsolata, serif;
        color: #FFFFFF;
        text-shadow: 3px 3px 10px #FFF2A877;
    }

    .mainBody {
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
        font-family: "Open Sans", Arial, serif;
        /*font-size: 1.4vmin;*/
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
        font-size: 0.8em;
        padding-top: 1em;
        padding-bottom: 1em;
        margin-bottom: 1em;

    }

    .emailForm {
        width: 40vw;
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;
    }

    /*placeholder text size*/
    .form-control {
        font-size: 1.8vmin;
    }


    .smallText {
        font-size: 0.6em;
    }


    #mailListInfo {
        margin: auto;
    }

    .registerText {
        position: absolute;
        top: 52%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }

    .confirmedText {
        position: absolute;
        top: 45%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        font-family: "Open Sans", Arial, serif;
    }

    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
        p {
            font-size: 2vmin;
        }

    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        p {
            font-size: 1.6vmin;
        }
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
        p {
            font-size: 1.4vmin;
        }

        h1 {
            font-size: 8vmin;
        }
    }

    #homeBtn {
        font-size: 0.8em;
        padding-top: 1em;
        padding-bottom: 1em;
        margin-bottom: 1em;
        margin-top: 1.5em;
    }

    #confirmedEmail {
        margin: 1em;
        font-size: 0.9em;
    }

    #openlabLogo {
        padding-left: 0.8em;
    }


</style>
