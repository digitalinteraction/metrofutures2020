<template>
  <b-container class="mt-4">
    <template v-if="findingsData.rightCol.charts">
      <b-row
        v-for="(chart, index) in findingsData.rightCol.charts"
        v-bind:key="index"
        >
        <b-col :sm-cols="columnWidth(index)" v-if="index == 0">
          <div 
            v-for="(text, index) in findingsData.leftCol" 
            v-bind:key="index"
            class="leftCol-text">
            <span v-html="text"></span>
          </div>
        </b-col>

        <!-- This is a bit hacky to get an image to display -->
        <template v-if="renderOptions(index)">
          <b-col>
            <OptionBrowser :optionType="findingsData.rightCol.images"></OptionBrowser>
          </b-col>
        </template>
        <!-- <b-col :md-cols="columnWidth(index)" class="mx-auto"> -->
        <b-col :sm="columnWidth(index)" class="mx-auto">
          <h4>{{ chart.title }}</h4>
          <StackedBarChart
            v-if="chart.stacked"
            :chart-data="chart"
            class="rightCol-chart"
          ></StackedBarChart>
          <BarChart
            v-else
            :chart-data="chart"
            class="rightCol-chart"
          ></BarChart>
        </b-col>
      </b-row>
    </template>

    <template v-if="findingsData.rightCol.tables">
      <b-row
        v-for="(table, index) in findingsData.rightCol.tables"
        v-bind:key="`tab_${index}`"
        >
        <b-col v-if="index == 0">
          <div 
            v-for="(text, index) in findingsData.leftCol" 
            v-bind:key="index"
            class="leftCol-text">
            <span v-html="text"></span>
          </div>
        </b-col>
        <b-col>
          <b-table striped hover :items="table.rows"></b-table>
          <p>{{ table.caption }}</p>
        </b-col>
      </b-row>
    </template>
  </b-container>
</template>

<script>
import BarChart from '@/charts/BarChart.js'
import StackedBarChart from '@/charts/StackedBarChart.js'
import OptionBrowser from '@/components/OptionBrowser.vue'
import {mapGetters} from 'vuex'

export default {
    name: "FindingsTab",
    components: {
        // LineChart
        StackedBarChart,
        BarChart,
        OptionBrowser,
    },
    props: {
        findingName: String,
    },
    computed: {
        ...mapGetters(['getFindingsByName']),
    },
    data () {
        return {
            findingsData: {},
        }
    },
    beforeMount() {
        this.findingsData = this.getFindingsByName(this.findingName)
    },
    methods: {
      columnWidth(index) {
        // Return width based on index
        return ( index === 0) ? '6' :  '6';
      },
      renderOptions(index) {
        if (this.findingsData.rightCol.images && index === 1) {
          return true
        }
        return false
      }
    },
    

}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  .leftCol {
    padding-top: 1em;
  }

  .leftCol-text {
      text-align: left;
      margin-bottom: 1em;
      padding-left: 0.5em;
      padding-right: 0.5em;
  }
  
  .leftCol-text a {
    font-weight: bold;
  }

    // Background rules for links (too bright otherwise)
  // .leftCol-text a {
  //   display: inline-block;
  //   background-color: grey;
  //   padding-left: 0.25em;
  //   padding-right: 0.25em;
  // }

  // .leftCol-text a:hover {
  //   background-color: lightgrey;
  // }

  .leftCol-text:last-child {
      margin-bottom: 1.5em;
  }

  .leftCol-text ul {
    font-size: 1rem;
  }

  .rightCol-tables {
    margin-top: 2em;
    padding-right: 0.5em;
  }

  .rightCol {
    margin-top: 1em;
  }

  .rightCol-chart {
    margin-top: 2em;
    // height: 20rem;
  }

  .rightCol-chart {
    margin-bottom: 2em;
  }


</style>