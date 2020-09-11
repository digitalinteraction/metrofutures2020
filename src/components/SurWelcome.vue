<template>

    <b-container fluid>

        <b-img src="https://cdn.metrofutures.org.uk/conf/Camera13_0_0_0_0_0_0_1.jpg"></b-img>
        <!--    modal-->

        <b-modal hide-footer=true centered ok-only no-close-on-esc no-close-on-backdrop hide-header-close id="privacyNoticeModal" title="Add the Finishing Touches!">
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
                    I accept the terms of use and agree to participate in this consultation
                </b-form-checkbox>
            </div>

            <div class="modal-footer privacy-buttons">
                <b-button @click="confirmPrivacy" :disabled="tick === false">Continue</b-button>
            </div>

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
                tick: false,
                imageURL:''
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
</style>
