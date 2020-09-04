<template>
    <!--    todo currently temp logos-->
    <div class="footer" >
        <b-navbar class="nav-fill w-100" id="footer">
            <b-row class="w-100">
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
                    <p>Powered by <b-img fluid src="../assets/openLabTemp.png"></b-img></p>
                </b-col>
            </b-row>
        </b-navbar>
        <!-- Compontents for modals -->
        <Privacy/>
        <Terms/>
    </div>

</template>

<script>
    import Privacy from "@/components/Privacy";
    import Terms from "@/components/Terms";

    export default {
        name: 'Footer',
        components: {
            Privacy,
            Terms
        }
    }
</script>

<style scoped lang="scss">
    .footer {
        position: relative;
    }
    #stadlerLogo {
        padding-left: 0.5em;
    }
    #centreCol {
        margin-top: auto;
        margin-bottom: auto;
        border-right: 1px solid #FEC600;
        & a {
            color: black;
        }

    }
    p {
        margin: 0;
        font-family: "Open Sans", Arial,serif;
        font-size: small;
    }
    #terms {
        margin-top: auto;
        margin-bottom: auto;
        & a {
            color: black;
        }

    }
    #lab {
        margin-top: auto;
        margin-bottom: auto;
        & img {
            padding-bottom: 0.3em;
            padding-left: 0.4em;
        }

        & p {
            color: black;
        }

    }
</style>
