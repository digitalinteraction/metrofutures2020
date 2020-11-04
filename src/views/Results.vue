<template>
  <b-container>
      <MainHeader title="About Metro Futures" resultMessage="false" /> 

      <b-row>
          <b-col>
              Results
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