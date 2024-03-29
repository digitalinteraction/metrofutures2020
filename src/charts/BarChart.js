import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.localOptions = {
      // response: true,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: this.options.label,
              fontColor: "black",
            }
          },
        ]
      }
    }
    this.renderChart(this.chartData, this.localOptions)
  }
}
