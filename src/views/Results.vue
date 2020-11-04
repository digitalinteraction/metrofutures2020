<template>
  <b-container>
      <MainHeader title="Public Consultation Results" /> 

      <b-row>
          <b-col>
              Blah blah results go here
          </b-col>
      </b-row>

      <Footer></Footer>
  </b-container>
</template>

<script>
import Footer from "@/components/Footer";
import MainHeader from '@/components/MainHeader.vue'

export default {
    name: "Results",
    components: {
        MainHeader,
        Footer,
    },


}
</script>

<style>

</style>