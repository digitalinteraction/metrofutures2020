<template>
    <div class="home">

        <div class="header">
            <b-img alt="Metro logo" fluid id="metroLogo" src="../assets/Image4.png"></b-img>
        </div>

        <div class="mainBody">
            <!-- text to display before user has registered-->
            <div class="registerText" v-if="!confirmed">
                <h1 class="metroFont calvert">This part of the public consultation on new Metro trains is now closed. Check back soon for an update on next steps.</h1>
            </div>

            <!--<b-img id="bgroundImg" src="../assets/Teaser1_2_rails_longer.png" fluid alt="Metro image"></b-img>-->
            <b-container fluid class="footer">
                <b-row>
                    <b-col class="float-left">
                      <b-img fluid id="nexusLogo" src="../assets/Nexus-logo-reversed.png"></b-img>
                      <b-img fluid id="stadlerLogo" src="../assets/stadlerLogo.svg"></b-img>
                    </b-col>
                    <b-col id="lab">
                      <b-img id="openlabLogo" fluid src="../assets/openlabLogoWhite.svg"></b-img>
                    </b-col>
                </b-row>

            </b-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "Holding"
}
</script>

<style lang="scss">
@import '@/assets/_variables.scss';

// This is all based on: https://github.com/tfeltwell/metro/blob/1b7851e4bf22e77ef4369aaf0eedafa108bdd401/src/views/Home.vue

.heading { 
  font-family: $font-family-calvert;
}


    .home {
        height: 100vh;
        width: auto;
    }
    .metroFont {
        font-family: Calvert, serif;
        color: #FFFFFF;
        text-shadow: 3px 3px 10px #FFF2A877;
    }
    .mainBody {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
        width: auto;
        padding-top: 50px;
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
        position: fixed;
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
        margin-bottom: 1em;
    }
    .emailForm {
        width: 60vw;
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;
    }
    /*!*placeholder text size*!*/
    /*.form-control {*/
    /*    font-size: 1.8vmin;*/
    /*}*/
    .smallText {
        font-size: 0.6em;
    }
    #mailListInfo {
        margin: auto;
    }
    .registerText {
        position: absolute;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 80vw;
        left: 50%;
    }
    .confirmedText {
        position: absolute;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        font-family: "Open Sans", Arial, serif;
        left: 50%;
    }
    .smallText {
        font-size: 0.5em;
    }
    #openlabLogo {
        width: 40px;
    }
    #stadlerLogo {
        width: 60px;
    }
    #nexusLogo {
        height: 20px;
    }
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
        .mainBody {
            background-image: url("../assets/teaserSmallBackground.png");
        }
        p {
            font-size: 2.3vmin;
        }
        .registerText {
            top: 49%;
        }
        .confirmedText {
            top: 42%;
        }
        .smallText {
            font-size: 0.5em;
        }
    }
    /*!* Small devices (portrait tablets and large phones, 600px and up) *!*/
    /*@media only screen and (min-width: 600px) {*/
    /*    p {*/
    /*        font-size: 1.9vmin;*/
    /*    }*/
    /*    .registerText {*/
    /*        top: 30%;*/
    /*    }*/
    /*    .confirmedText {*/
    /*        top: 35%;*/
    /*    }*/
    /*    .smallText {*/
    /*        font-size: 0.5em;*/
    /*    }*/
    /*    #openlabLogo {*/
    /*        width: 40px;*/
    /*    }*/
    /*    #stadlerLogo {*/
    /*        width: 60px;*/
    /*    }*/
    /*    #nexusLogo {*/
    /*        height: 30px;*/
    /*    }*/
    /*}*/
    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 600px) {
        .mainBody {
            background-image: url("../assets/Teaser1_2_rails_longer.png");
        }
        p {
            font-size: 1.4vmin;
        }
        h1 {
            font-size: 5vmin;
        }
        .registerText {
            top: 50%;
        }
        .confirmedText {
            top: 54%;
        }
        .smallText {
            font-size: 0.6em;
        }
        #openlabLogo {
            width: 80px;
        }
        #stadlerLogo {
            width: 100px;
        }
        #nexusLogo {
            height: 70px;
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