<template>
  <b-container>
    <MainHeader title="Public Consultation Findings" /> 

    <b-row class="tab-row">
      <b-col
        v-for="(finding, index) in getFindings"
        v-bind:key="index">
        <div class="tab-button" :class="activeTab(finding.name)"  @click="setDisplayTab(finding.name)">{{ finding.title }}</div>
      </b-col>
    </b-row>

    <FindingsTab 
      v-for="(finding, index) in getFindings" 
      v-bind:key="index"
      v-show="displayTab === finding.name"
      :findingName="finding.name"
    ></FindingsTab>

    <Footer></Footer>
  </b-container>
</template>

<script>
import Footer from "@/components/Footer";
import MainHeader from '@/components/MainHeader.vue'
import FindingsTab from '@/components/FindingsTab.vue'
import {mapGetters} from 'vuex'


export default {
    name: "Findings",
    components: {
        MainHeader,
        Footer,
        FindingsTab,
    },
    data () {
      return {
        displayTab: 'summary',
      }
    },
    computed: {
        ...mapGetters(['getFindings']),
    },
    methods: {
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

  .col {
    padding-left: 0.1em;
    padding-right: 0.1em;
  }

  .tab-button {
    background-color: grey;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    padding-left: 0.25em;
    padding-right: 0.25em;
    color: white;
    border-top-right-radius: 1em;
    border-top-left-radius: 1em;
  }

  .active {
    background-color: $yellow;
    color: black;
  }

</style>