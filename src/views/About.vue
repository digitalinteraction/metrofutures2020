<template>
  <div class="about">
    <b-container>
      <b-row>
        <b-col align="center">
          <b-img id="logo" src="../assets/metroLogoTemp.png" fluid alt="Metro logo"></b-img>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <a v-on:click="goBackAPage()" id="backOption"><b-icon-chevron-left></b-icon-chevron-left>Back</a>
        </b-col>
      </b-row>

      <b-row>
        <b-col><h3 id="calvertTitle">About Metro Futures</h3></b-col>
      </b-row>

      <b-row>
        <b-col>
        <br>
       <p>
         <strong>Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</strong>
        <p>
        <br>
        <p>
         Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
         Sed posuere consectetur est at lobortis. Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere vel it aliquet. Curabitur blandit tempus porttitor. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibendum nulla sed consectetur. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Sed posuere consectetur est at lobortis.
      </p>
        <br>
        <h4 class="calvertSubtitles">About Tyne and Wear Metro</h4>
        <br>
        <p>Construction of the Tyne and Wear Metro began in 1974, and the first part of the system opened in 1980. It has since extended in stages to North and South Shields, to Newcastle Airport and through Sunderland. At the time of its launch the Metro was considered cutting edge, both in terms of technology and the features offered to passengers. For further information about Metro’s history, see the <a target="blank" href="https://www.nexus.org.uk/history">history section of the Nexus website. </a>
          <br>
         <h4 class="calvertSubtitles">About Nexus </h4>
        <br>
        <p>There are few people living in Tyne and Wear whose daily lives are not touched in some way by Nexus. It might be getting you to work, or taking the children to school. It might be treating you to a day out shopping or a family trip to the coast or a museum. It might be helping you enjoy a night out on the town without worrying who will be driving home.</p>
        <br>
        <p>We provide, plan and promote public transport to improve the economic prosperity of Tyne and Wear, and the daily lives of its people. We also look to the future, creating the travel networks people will want to use in decades to come.</p>
        <br>
        <p>Nexus is the Tyne and Wear PassengerTransport Executive and administers funds on behalf of the <a target="blank" href="https://northeastca.gov.uk/"> North East Combined Authority.</a> Our task is to improve the quality of life and fortunes of everyone in Tyne and Wear, by creating better transport networks.</p>
        <br>
        <h4 class="calvertSubtitles">About Open Lab</h4>
        <br>
        <p>Open Lab is an interaction design and ubiquitous computing research group at Newcastle University.</p>
        <br>
        <p>We are more than just researchers. We are designers, collaborators, artists, educators, programmers, engineers, psychologists, data geeks and more. From the Internet of Things (IoT) to inclusive design, we create technologies to solve real world problems using human-centered design.</p>
        <br>
        <p>In just over a decade we have become a world-leading research group working at the cutting edge of Human-Computer Interaction (HCI), Design Futures and Digital Social Innovation. Our work addresses the grand challenges of social and environmental sustainability, and future living, through the design of innovative digital technologies</p>
        <a target="blank" href="https://openlab.ncl.ac.uk/">https://openlab.ncl.ac.uk/</a>
        </b-col>
      </b-row>

      <Footer></Footer>
    </b-container>
  </div>
</template>

<script>
  import Footer from "@/components/Footer";
  //import router from "../router";

  export default {
    name: 'About',
    components: {
      Footer
    },
    methods: {
      goBackAPage() {

      }
    },
    mounted() {
      // todo should ever page start with get session?

      // google analytics post request
      const measurementID = "UA-85374573-24";
      const clientID = this.$cookies.get('mfsid');
      const page= this.$route.path;
      const pageName = this.$route.name;
      const documentHost = location.host;

      const fullURL = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=' + measurementID + '&cid=' + clientID + '&t=pageview&dh=' + documentHost + '&dp=' + page + '&dt=' + pageName;
      this.axios.post(fullURL);
    }
  }
</script>

<style lang="scss">

  #backOption {
    font-family: "Open Sans", sans-serif;
    font-size: small;
    text-decoration: underline;
    cursor: pointer;
    text-align: left!important;
  }

  .about {
    overflow: scroll;
  }
  p {
    color: black;
    font-family: "Open Sans", sans-serif;
    text-align: left;
  }

  #calvertTitle {
    font-family: Calvert, serif;
    color: black;
    text-align: left;
    margin-top: 2em;
  }


  .calvertSubtitles {
    font-family: Calvert, serif;
    color: black;
    text-align: left;
    margin-top: 1.5em;
  }


  #logo {
  height: 100px;
    margin: 1em;
  }

</style>
