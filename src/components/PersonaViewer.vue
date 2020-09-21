<template>
  <div>
    <MainHeader :title="personaName"></MainHeader>
    <div class="personaContent">
      <b-container>
        <b-row>
          <b-col class="border">
            <!-- {{ persona }} -->
          </b-col>
        </b-row>
        <b-row>
          <b-col class="border">
            Main Image here
          </b-col>
          <b-col class="border">Questions will appear over here</b-col>
        </b-row>
        <b-row>
          <Footer></Footer>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MainHeader from '@/components/MainHeader.vue';
import Footer from '@/components/Footer.vue';
export default {
  name: "PersonaViewer",
  components: {
    MainHeader,
    Footer,
  },
  data() {
    return {
      personaName: "",
      personaInfo: {},
    }
  },
  computed: {
    ...mapGetters(["getPersonas"]) 
  },
  methods: {
    
  },

  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // If personaName is not in our list, don't update
    console.log(`Came from ${from}, wishing to go to ${to}`)
    // don't forget to call next()
    next();
    next(false);  // Will cancel the route (use if not valid route)
  },
  mounted() {
    // Get persona name from route
    this.personaName = this.$route.params.persona
    this.personaInfo = this.$store.getters.getPersonaByName(this.personaName)
    // Need a guard to make sure we are accessing ones that exist

  }

}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  .border {
    border: 1px solid black;
  }

</style>