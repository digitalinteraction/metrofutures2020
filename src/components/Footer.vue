<template>


    <div class="footer" >
        <b-navbar class="nav-fill w-100" id="footer">
            <b-row class="w-100">
                <b-col class="float-left">
                    <b-img fluid src="../assets/nexusLogo.png"></b-img>
                    <!--    todo STADLER logo-->
                    <b-img fluid id="stadlerLogo" src="../assets/StadlerTemp.jpg"></b-img>
                </b-col>
                <b-col id="centreCol">
                    <!--    todo privacy policy and t's and c's-->
                    <p class="float-right">Privacy Policy</p>
                </b-col>
                <b-col id="terms">
                    <p class="float-left">Terms & Conditions</p>
                </b-col>
                <b-col id="lab">
<!--                    todo get white openlab logo-->
                    <p>Powered by <b-img fluid src="../assets/openLabTemp.png"></b-img></p>
                </b-col>
            </b-row>
        </b-navbar>
    </div>

</template>

<script>
    export default {
        name: 'Footer'
    }

</script>

<style scoped lang="scss">
    .footer {

    }
    #stadlerLogo {
        padding-left: 0.5em;
    }
    #centreCol {
        margin-top: auto;
        margin-bottom: auto;
        border-right: 1px solid #FEC600;
    }
    p {
        margin: 0;
        font-family: "Open Sans", Arial,serif;
        font-size: small;
        color: #FFFFFF;
    }
    #terms {
        margin-top: auto;
        margin-bottom: auto;
    }
    #lab {
        margin-top: auto;
        margin-bottom: auto;
    }

</style>
