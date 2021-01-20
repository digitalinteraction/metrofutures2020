<template>

    <b-row>
        <b-col>
          <!-- TO DO write template for each paragraph -->
          <div 
            v-for="(text, index) in findingsData.leftCol" 
            v-bind:key="index"
            class="leftCol-text">
            <span v-html="text"></span>
            <!-- {{ text }} -->
          </div>
        </b-col>
        <b-col>
          <BarChart :chart-data="findingsData.rightCol"></BarChart>
        </b-col>
    </b-row>


  
</template>

<script>
import BarChart from '@/charts/BarChart.js'
import {mapGetters} from 'vuex'

export default {
    name: "FindingsTab",
    components: {
        // LineChart
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
    mounted() {
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

</style>