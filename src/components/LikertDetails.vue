<template>
  <div>
    <div>People rated:</div>

    <div class="likert-details">
        <BarChart :chart-data="findingsData.chart"></BarChart>
    </div>

    <div class="likert_label">
        <div class="likert_text" v-if="likert === 'clear'">1 = very un{{likert}}, 5 = very {{likert}}</div>
        <div class="likert_text" v-if="likert === 'unclear'">1 = very {{likert}}, 5 = very clear</div>
        <div class="likert_text" v-if="likert === 'safe'">1 = no {{likert}}r, 5 = much {{likert}}r</div>
        <div class="likert_text" v-if="likert === 'poor'">1 = very {{likert}}, 5 = very well</div>
        <div class="likert_text" v-if="likert === 'useful'">1 = not {{likert}}, 5 = very {{likert}}</div>
        <div class="likert_text" v-if="likert === 'verywell'">1 = not very well, 5 = very well</div>
    </div>

  </div>
</template>

<script>
import BarChart from '@/charts/BarChart.js'
import {mapGetters} from 'vuex'

export default {
    name: "LikertDetails",
    props: {
        likert: String,  // Type of min max text values
        findingName: String,
    },
    components: {
        BarChart,
    },
    computed: {
        ...mapGetters(['getLikertFindingsByName', 'getLikertFindings']),
    },
    data() {
        return {
            findingsData: {},
        }
    },
    mounted() {
        this.findingsData = this.getLikertFindingsByName(this.findingName)
    }

}
</script>

<style>

.likert_label {
    padding-top: 0.5em;
    padding-bottom: 1em;
}


</style>