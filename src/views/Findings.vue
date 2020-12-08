<template>
  <b-container>
    <MainHeader title="Public Consultation Findings" /> 

    <b-row class="tab-row">
      <b-col>
        <div class="tab-button" :class="activeTab('summary')"  @click="setDisplayTab('summary')">Summary</div>
      </b-col>
      <b-col>
        <div class="tab-button" :class="activeTab('explore')" @click="setDisplayTab('explore')">Explore</div>
      </b-col>
      <b-col>
        <div class="tab-button" :class="activeTab('configure')" @click="setDisplayTab('configure')">Configure</div>
      </b-col>
      <b-col>
        <div class="tab-button" :class="activeTab('journey')" @click="setDisplayTab('journey')">Journey</div>
      </b-col>
      <b-col>
        <div class="tab-button" :class="activeTab('twitter')" @click="setDisplayTab('twitter')">Twitter</div>
      </b-col>
      <b-col>
        <div class="tab-button" :class="activeTab('youtube')" @click="setDisplayTab('youtube')">YouTube Live</div>
      </b-col>
    </b-row>

    <FindingsTab v-show="displayTab === 'summary'" :findingName="'summary'"></FindingsTab>

    <FindingsTab v-show="displayTab === 'explore'" :findingName="'explore'"></FindingsTab>

    <FindingsTab v-show="displayTab === 'configure'" :findingName="'configure'"></FindingsTab>

    <FindingsTab v-show="displayTab === 'journey'" :findingName="'journey'"></FindingsTab>

    <FindingsTab v-show="displayTab === 'twitter'" :findingName="'twitter'"></FindingsTab>

    <FindingsTab v-show="displayTab === 'youtube'" :findingName="'youtube'"></FindingsTab>

    <Footer></Footer>
  </b-container>
</template>

<script>
import Footer from "@/components/Footer";
import MainHeader from '@/components/MainHeader.vue'
import FindingsTab from '@/components/FindingsTab.vue'


export default {
    name: "Findings",
    components: {
        MainHeader,
        Footer,
        FindingsTab,
    },
    data () {
      return {
        datacollection: null,
        displayTab: 'summary',
        engagementData: {
          labels: ["Website explore", "Website configure", "Website - Journeys", "Explore, Configure, Journeys total" ,"Website - Demographics" ,"Twitter and Facebook polls" , "Webinar Active Participants (Slido)", "Workshop Attendances"],
          datasets: [
            {
              label: "Engagements",
              backgroundColor: '#FEC600',
              data: [1176, 5448, 90, 6714, 8160, 14100, 824, 53]
            },
          ]
        }
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      setDisplayTab (tabName) {
        this.displayTab = tabName;
      },
      activeTab (tabName) {
        if (tabName === this.displayTab) {
          return "active";
        }
      }
    }
}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  .tab-row {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  .tab-button {
    background-color: grey;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    color: white;
    border-top-right-radius: 1em;
    border-top-left-radius: 1em;
  }

  .active {
    background-color: $yellow;
    color: black;
  }

</style>