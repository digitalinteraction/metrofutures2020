<template>
  <b-row id="headerRow" align-v="center">
    <b-col >
      <b-img class="float-left" id="logo" src="../assets/metroLogoTemp.png" fluid alt="Metro logo"></b-img>
    </b-col>
    <b-col>
      <h3 class="calvert"> {{ title }}</h3>
    </b-col>
    <!-- <b-col>
      <h3 class="calvert">Your Metro Summary</h3>
    </b-col> -->
    <b-col>
<!--           todo add link here-->
      <p v-on:click="goTo('/idoc')" class="float-right personasLink" >Explore some of our Metro users?</p>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "MainHeader",
  props: {
    title: String
  }

}
</script>

<style>

</style>