<template>

    <b-container fluid>

<!--        todo get front metro image in day from API-->
        <b-img src="https://cdn.metrofutures.org.uk/conf/Camera1_1_1_0_0_0_1_1.jpg"></b-img>
        <!--    modal-->

        <b-modal hide-footer=true centered ok-only no-close-on-esc no-close-on-backdrop hide-header-close id="privacyNoticeModal" title="Participation Consent Form">

            <div class="privacy-text">
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

        </b-modal>

        <b-modal class="text-center calvert" centered hide-footer=true id="welcomeModal" title="Add the Finishing Touches!" @hide="closeWelcomeModal()">
            <p class="text-center">Some design decisions remain to be made on your new Metro. Let us know your preferences by trying out options for seven different features. You can then share your ideal Metro with us and on social media. </p>
        </b-modal>
    </b-container>


</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: "SurWelcome",
        components: {

        },
        data() {
            return {
                tick: false
            }
        },
        mounted() {
            this.$bvModal.show('privacyNoticeModal');
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
                // open welcome modal
                this.$bvModal.show('welcomeModal');
            },
            ...mapMutations([
                'acknowledgePrivacy'
            ]),
            closeWelcomeModal() {
                // survey page listens for this event to show that the survey questions can begin
                this.$emit('finishedWelcome');
            }
        }
    }
</script>

<style scoped>
.calvert {
    font-family: Calvert, serif;
}
</style>
