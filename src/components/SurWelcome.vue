<template>

    <b-container fluid class="text-left fullScreenContainer">

        <b-img fluid v-if="imageFull" src="https://cdn.metrofutures.org.uk/conf/Camera13_0_0_0_0_0_0_1.jpg"></b-img>

        <b-row v-if="!imageFull">
            <b-col class="largeImgColumn col-lg-9 col-12">
                <b-img fluid src="https://cdn.metrofutures.org.uk/conf/Camera13_0_0_0_0_0_0_1.jpg"></b-img>
            </b-col>

            <b-col class="col-lg-3 col-12">
                <b-col>
                    <div class="calvert text-center">External Train Livery</div>
                    <div class="text-center">Explore options for seven internal features</div>
                    <b-button class="continueButton" block variant="outline-secondary" @click="continueClick" v-if="typeof(this.getConfigAnswerFirst) === 'undefined'">Get Started</b-button>
                    <b-button class="continueButton" block variant="outline-secondary" @click="continueClick" v-if="this.getConfigAnswerFirst >= 0">Continue</b-button>
                </b-col>
            </b-col>

        </b-row>

        <b-row v-if="welcomeScreen">
            <welcomeConsent title="Configure Metro options" page="choices" @finishedWelcome="welcomeScreen=false"></welcomeConsent>
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
                imageFull: true,
                LAQuestion: false,
            }
        },
        mounted() {
            this.$bvModal.show('privacyNoticeModal');
            this.fetchFrontImage();
        },
        computed: {
            ...mapGetters(['privacyNotice', "getInfoCompleted", "getDemographic", "getConfigAnswerFirst"])
        },
        methods: {
            ...mapMutations(['acknowledgePrivacy', "completeInfo", "completeDemographic"]),
            confirmPrivacy () {
                this.acknowledgePrivacy();
                this.$bvModal.hide('privacyNoticeModal');
                // this.showLAQuestion = true;
            },
            triggerLAQuestion() {
                this.imageFull = false;
            },
            continueClick() {
                // If we have answered the demographic questions, we just continue
                this.$emit('finishedWelcome');
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

    .continue-row {
        padding: 2em;
    }

    #LAButton {
       margin-top: 0.5em;
       margin-bottom: 2em;
    }

    .continueButton {
       margin-top: 0.5em;
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
