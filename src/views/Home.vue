<template>
  <div class="home">

      <div class="header">
          <b-img id="metroLogo" src="../assets/Image4.png" fluid alt="Metro logo"></b-img>
      </div>
          <div class="mainBody">
              <div class="centreText">
                  <p class="metroFont">Your Metro is arriving soon.</p>
                  <p>Join our mailing list to. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>

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
  }

}
</script>

<style>
    .home {
        height: 100vh;
        width: auto;
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
</style>
