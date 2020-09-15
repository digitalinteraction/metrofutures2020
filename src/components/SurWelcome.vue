<template>

    <b-container fluid class="text-left fullScreenContainer">

                <b-img fluid v-if="!showLAQuestion" src="https://cdn.metrofutures.org.uk/conf/Camera13_0_0_0_0_0_0_1.jpg"></b-img>


        <b-row v-if="showLAQuestion">

            <b-col class="largeImgColumn col-lg-9 col-12">
            <!--                Local authority question image-->
            <b-img fluid src="https://cdn.metrofutures.org.uk/conf/Camera13_0_0_0_0_0_0_1.jpg"></b-img>
            </b-col>

            <!--            LA q-->
            <b-col class="col-lg-3 col-12">


                <b-row id="localAuthority">
                    <p class="calvert">Before you begin, please tell us:</p>
                    <p class="calvert"><span class="bold">Where do you live? (Which local authority?)</span></p>
                    <br>
                    <b-form-select @change="changeLA" v-model="localAuthority" :options="authorities">Please select an
                        option
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
                    <b-form-select @change="changeAge" v-model="age" :options="ages">Please select an
                        option
                    </b-form-select>
                    <b-button id="LAButton" block variant="outline-secondary" @click="submitLA">Continue</b-button>
                </b-row>
                <b-row v-if="displayError">
                    <b-col>
                        <p>Please answer the two questions to continue. This information is important for the consultation and your answers are given anonymously.</p>
                    </b-col>
                </b-row>
            </b-col>

            </b-row>



        <!--    modal TODO call welcomeConsent instead

        <b-modal hide-footer centered ok-only no-close-on-esc no-close-on-backdrop hide-header-close id="privacyNoticeModal" title="Add the Finishing Touches!">
            <p>Some design decisions remain to be made on your new Metro. Let us know your preferences by trying out options for seven different features. You can then share your ideal Metro with us and on social media. </p>
            <br>
            <div >
                <p>In using this site, you agree that you are happy for your responses and interactions on this website to be included in the consultation for the Metro Futures 2020 project. </p>

                <p>We collect the following data about you:</p>
                <ul>
                    <li>Your choices for the design of the metro</li>
                    <li>Any free text answers you provide</li>
                    <li>If you chose to be contacted for further consultation about the Metro Futures, your email address</li>
                </ul>

            </div>

            <div class="privacy-check">
                <b-form-checkbox id="privacy-checkbox" name="privacy-checkbox" v-model="tick">
                    I agree to participate in this consultation, and accept the terms of use and privacy notice of this website.
                </b-form-checkbox>
            </div>

            <div class="modal-footer privacy-buttons">
                <b-button @click="confirmPrivacy" :disabled="tick === false">Continue</b-button>
            </div>

        </b-modal>-->

        <b-row v-if="welcomeScreen">
        <welcomeConsent title="Add the Finishing Touches!" page="choices" @finishedWelcome="welcomeScreen=false"></welcomeConsent>
      </b-row>

    </b-container>


</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import welcomeConsent from "../components/WelcomeConsent";

    export default {
        name: "SurWelcome",
        components: {
            welcomeConsent
        },
        data() {
            return {
                welcomeScreen: true,
                tick: false,
                imageURL:'',
                showLAQuestion: false,
                localAuthority: '',
                authorities: [
                    {value: 'CountyDurham', text: 'Country Durham'},
                    {value: 'Gateshead', text: 'Gateshead'},
                    {value: 'Newcastle', text: 'Newcastle'},
                    {value: 'NorthTyneside', text: 'North Tyneside'},
                    {value: 'Northumberland', text: 'Northumberland'},
                    {value: 'SouthTyneside', text: 'South Tyneside'},
                    {value: 'OtherNorthEast', text: 'Other North East'},
                    {value: 'Other', text: 'Other'}
                ],
                age: '',
                ages: ['16 or under', '17-24', '25-34', '35-44', '45-54', '55-65', '66-75', '76+'],
                otherLA: false,
                displayError: false
            }
        },
        mounted() {
            this.$bvModal.show('privacyNoticeModal');
            this.fetchFrontImage();
        },
        computed: {
            ...mapGetters([
                'privacyNotice'
            ])
        },
        methods: {
            confirmPrivacy () {
                this.acknowledgePrivacy();
                this.$bvModal.hide('privacyNoticeModal');
                this.showLAQuestion = true;
            },
            triggerLAQuestion() {
                this.showLAQuestion = true
            },
            submitLA() {
                if (!this.localAuthority || !this.age) {
                    // no answer for one or both fields
                    this.displayError = true;
                } else {

                    //if answered 'other' and user has entered free text send that instead
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
                        headers: {
                            Cookie: this.$cookies.get('mfsid')
                        },
                        params: payload
                    })
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => error.response ? console.log("Error submitting demographic info:",error.response.data) : console.log("Error submitting demographic info:", error))

                    this.$emit('finishedWelcome');

                }
            },
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

            fetchFrontImage() {
                const payload = {
                    cam: 13,
                    o1: 1,
                    o2: 1,
                    o3: 1,
                    o4: 1,
                    o5: 1,
                    o6: 1,
                    o7: 1,
                }
                this.axios.get(`${process.env.VUE_APP_API_URL}/api/images/image`, {
                    headers: {
                        Cookie: this.$cookies.get('mfsid')
                    },
                    params: payload
                })
                    .then(response => {
                        this.frontImg = response.data;
                    })
                    .catch(error => error.response ? console.log(error.response.data) : console.log(error))



            },
            ...mapMutations([
                'acknowledgePrivacy'
            ])
        }
    }
</script>

<style scoped>
.calvert {
    font-family: Calvert, serif;
}

    #localAuthority {
        padding: 2em;
    }

    #LAButton {
       margin-top: 2em;
       margin-bottom: 2em;
    }

    .largeImgColumn {
        padding-left: 0!important;
        padding-right: 0!important;
    }

    .fullScreenContainer {
        padding-left: 0!important;
        padding-right: 0!important;
    }
</style>
