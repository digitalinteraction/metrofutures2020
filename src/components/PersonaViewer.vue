<template>
  <div>
    <MainHeader :title="personaName"></MainHeader>
    <div class="personaContent">
      Main content will go here
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
export default {
  name: "PersonaViewer",
  props: {
    pIndex: Number,
  },
  components: {
    MainHeader,
  },
  data() {
    return {
      personaName: "",
    }
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
    // Need a guard to make sure we are accessing ones that exist

  }

}
</script>

<style>

</style>