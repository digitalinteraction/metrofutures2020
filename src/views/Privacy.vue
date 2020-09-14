<template>
  <b-container>
    <b-col>
      <b-row>
        <MainHeader title="Privacy Policy"></MainHeader>
      </b-row>
    </b-col>
    <b-col>
      <b-row>
        <Privacy></Privacy>
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import Privacy from '@/components/Privacy.vue'
export default {
  name: "Privacy",
  components: {
    MainHeader,
    Privacy,
  },

}
</script>

<style>

</style>