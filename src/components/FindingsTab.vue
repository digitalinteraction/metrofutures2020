<template>
  <b-container class="mt-4">

    <b-row
      v-for="(row, i) in findingsData.rows"
      v-bind:key="i"
    >
      <template v-for="(col, index) in row">
        <!-- Text -->
        <template v-if="col.type === 'text'">
          <b-col v-bind:key="`col_${index}`">
            <div 
              v-for="(text, index) in col.content" 
              v-bind:key="`text_${index}`"
              class="leftCol-text">
                <span v-html="text"></span>
            </div>
          </b-col>
        </template>

        <!-- Tables -->
        <template v-if="col.type === 'table'">
          <b-col v-bind:key="`col_${index}`">
            <b-table striped hover :items="col.content.rows"></b-table>
            <p>{{ col.content.caption }}</p>
          </b-col>
        </template>

        <!-- Chart -->
        <template v-if="col.type === 'chart'">
          <b-col 
            sm="6"
            class="mx-auto my-2"
            v-bind:key="`col_${index}`"
          >
            <h4>{{ col.content.title }}</h4>
            <StackedBarChart
              v-if="col.content.stacked"
              :chart-data="col.content"
              class="rightCol-chart"
            ></StackedBarChart>
            <BarChart
              v-else
              :chart-data="col.content"
              class="rightCol-chart"
            ></BarChart>
          </b-col>
        </template>

        <!-- Option Images -->
        <template v-if="col.type === 'image'">
          <b-col v-bind:key="`col_${index}`">
            <OptionBrowser :optionType="col.content.type" :caption="col.content.caption"></OptionBrowser>
          </b-col>
        </template>
      </template>
    </b-row>
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
  
  .leftCol-text {
      text-align: left;
      margin-bottom: 1em;
      padding-left: 0.5em;
      padding-right: 0.5em;
  }
  
  .leftCol-text a {
    font-weight: bold;
  }

</style>