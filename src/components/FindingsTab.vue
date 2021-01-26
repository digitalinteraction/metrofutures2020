<template>

    <b-row>
        <b-col>
          <div 
            v-for="(text, index) in findingsData.leftCol" 
            v-bind:key="index"
            class="leftCol-text">
            <span v-html="text"></span>
          </div>
        </b-col>
        <b-col>
            <div v-if="findingsData.rightCol.charts">
                <div
                  v-for="(chart, index) in findingsData.rightCol.charts"
                  v-bind:key="index"
                >
                  <h4>{{ chart.title }}</h4>
                  <StackedBarChart v-if="chart.stacked" :chart-data="chart"></StackedBarChart>
                  <BarChart v-else :chart-data="chart"></BarChart>
                </div>
                
            </div>

            <div v-if="findingsData.rightCol.tables">
              <div 
                v-for="(table, index) in findingsData.rightCol.tables"
                v-bind:key="`tab_${index}`"
                class="rightCol-tables"
              >
                <b-table striped hover :items="table.rows"></b-table>
              </div>
            </div>
        </b-col>
    </b-row>


  
</template>

<script>
import BarChart from '@/charts/BarChart.js'
import StackedBarChart from '@/charts/StackedBarChart.js'
import {mapGetters} from 'vuex'

export default {
    name: "FindingsTab",
    components: {
        // LineChart
        StackedBarChart,
        BarChart,
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
    }
    

}
</script>

<style lang="scss">
  @import '@/assets/_variables.scss';

  .leftCol-text {
      text-align: left;
      margin-bottom: 1em;
  }

  .leftCol-text:last-child {
      margin-bottom: 1.5em;
  }

  .rightCol-tables {
    margin-top: 2em;
  }

</style>