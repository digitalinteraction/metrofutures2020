<template>
  <b-container>
    <b-row>
      <b-col>
        <!-- Header -->
        <MainHeader title="Workshops"></MainHeader>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="introContainer">
          <p>Have your say on your new Metro by joining one of several online discussion workshops. Places are limited so, please register in advance.</p>
        </div>
      </b-col>
    </b-row>

    <b-row v-for="(shop, index) in workshops" :key="index">
      <b-col>
        <b-card
          :title="shop.title"
          tag="article"
          :header="shop.dateTime"
          header-tag="header"
          class="workshopCard"
        >
          <b-card-text>
            {{ shop.desc }}
          </b-card-text>

          <b-button :href="shop.link" variant="primary">Register Here</b-button>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card
        title="Shared Spaces"
        tag="article"
        
        
        header="Tuesday 22nd September, 18:00-19:00"
        header-tag="header"
        >
        <b-card-text>
        People told us that new trains needed spaces that could be used by all, including those with bags or luggage, wheelchair users, people with pushchairs, and cyclists. This workshop will evaluate the new trains with an emphasis on how well they work as shared spaces. Places are limited.
        </b-card-text>
        
        <b-button href="https://newcastleuniversity.zoom.us/meeting/register/tJAqdOCgrDMpHNXM7uPrfWK1yBWQECeGQNQz" variant="primary">Register Here</b-button>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card
        title="Shared Spaces"
        tag="article"
        
        
        header="Tuesday 22nd September, 18:00-19:00"
        header-tag="header"
        >
        <b-card-text>
        People told us that new trains needed spaces that could be used by all, including those with bags or luggage, wheelchair users, people with pushchairs, and cyclists. This workshop will evaluate the new trains with an emphasis on how well they work as shared spaces. Places are limited.
        </b-card-text>
        
        <b-button href="https://newcastleuniversity.zoom.us/meeting/register/tJAqdOCgrDMpHNXM7uPrfWK1yBWQECeGQNQz" variant="primary">Register Here</b-button>
        </b-card>
      </b-col>
    </b-row>
    
    <b-row>
      <b-col>
        <!-- Footer -->
        <Footer></Footer>
      </b-col>
    </b-row>
  </b-container>
  
</template>

<script>
import Footer from "@/components/Footer";
import MainHeader from '@/components/MainHeader.vue'
export default {
  name: "Workshops",
  components: {
    MainHeader,
    Footer,
  },
  data() {
    return {
      workshops: [
        {title: "Shared Spaces", desc: "People told us that new trains needed spaces that could be used by all, including those with bags or luggage, wheelchair users, people with pushchairs, and cyclists. This workshop will evaluate the new trains with an emphasis on how well they work as shared spaces. Places are limited.", link: "https://newcastleuniversity.zoom.us/meeting/register/tJAqdOCgrDMpHNXM7uPrfWK1yBWQECeGQNQz", dateTime: "Tuesday 22nd September, 18:00-19:00"},
        {title: "Busy Trains", desc: "People told us that trains needed to be usable at busy times when many passengers are on board. This workshop will evaluate the new trains with an emphasis on their usability at busy times. Places are limited.", link: "https://newcastleuniversity.zoom.us/meeting/register/tJ0pfu6srDkiGdZ1o6_nM007I4SqGuMgcxZs", dateTime: "Wednesday 23rd September, 11:00-12:00"},
        {title: "Personal Wellbeing", desc: "People told us that the new trains needed features to ensure passengers’ personal wellbeing such as physical comfort and feeling safe when travelling alone or late at night. This workshop will evaluate the new trains with an emphasis on personal wellbeing. Places are limited.", link: "https://newcastleuniversity.zoom.us/meeting/register/tJEkcumtqDooGt1tKW8xQkZbxsytvQJCZNEJ", dateTime: "Thursday 24th September, 18:00-19:00"},
        {title: "Safety and Accessibility", desc: "People told us that the new trains need to have features that make them safe and accessible for everyone – those with impairments and non-disabled people. This workshop will evaluate the new trains with an emphasis on safety and accessibility. Places are limited.", link: "https://newcastleuniversity.zoom.us/meeting/register/tJMuf-iurToqGdKFEftsodXnnYYdIo9ip5Hi", dateTime: "Friday 25th September, 11:00-12:00"},
        {title: "Busy Trains", desc: "Another opportunity to attend a workshop on this topic. Places are limited.", link: "https://newcastleuniversity.zoom.us/meeting/register/tJMpfumgqzwrHNH0l1cEI_IG4uunVLA1Yx6Q", dateTime: "Tuesday 29th September, 18:00-19:00"},
        {title: "Shared Spaces", desc: "Another opportunity to attend a workshop on this topic. Places are limited.", link: "https://newcastleuniversity.zoom.us/meeting/register/tJwlfuGrpjwpHtDVTZ7t9_GIzoPPl4qP2Z6o", dateTime: "Wednesday 30th September, 11:00-12:00"},
        {title: "Safety and Accessibility", desc: "Another opportunity to attend a workshop on this topic. Places are limited.", link: "https://newcastleuniversity.zoom.us/meeting/register/tJMvdeusrTwsGNXdkTpgcNQwrDy8IpWLF3On", dateTime: "Thursday 1st October, 18:00-19:00"},
        {title: "Personal Wellbeing", desc: "Another opportunity to attend a workshop on this topic. Places are limited.", link: "https://newcastleuniversity.zoom.us/meeting/register/tJAuceuupjIqHtwCnlqHIaKDL7gnV0byn5H9", dateTime: "Friday 2nd October, 11:00-12:00"},
      ]
    }
  }

}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  .introContainer {
    padding-top: 2em;
  }

  .workshopCard {
    margin-bottom: 1em;
  }

</style>