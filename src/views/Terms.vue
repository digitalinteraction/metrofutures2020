<template>
  <b-container>
    <b-col>
      <MainHeader title="Terms and Conditions"></MainHeader>
    </b-col>
    <b-col>
      <b-row><TermsComp></TermsComp></b-row>
    </b-col>
  </b-container>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import TermsComp from '@/components/Terms.vue'

export default {
  name: "Terms",
  components: {
    MainHeader,
    TermsComp
  },

}
</script>

<style>

</style>