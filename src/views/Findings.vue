<template>
  <b-container>
    <MainHeader title="Public Consultation Findings" /> 

    <b-row>
      <b-col>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nesciunt vero, at possimus expedita, excepturi soluta reprehenderit esse nemo beatae commodi perspiciatis dolores aliquid autem, cum eveniet ullam quasi earum.</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h3>Explore Your Metro</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolorum, porro accusamus officiis laudantium, labore natus voluptatem ab temporibus facilis nobis dolore maiores, iusto aut deserunt sunt. Enim, autem quasi!
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <LineChart :chart-data="datacollection"></LineChart>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h3>Configure Your Metro</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolorum, porro accusamus officiis laudantium, labore natus voluptatem ab temporibus facilis nobis dolore maiores, iusto aut deserunt sunt. Enim, autem quasi!
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <BarChart :chart-data="datacollection"></BarChart>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h3>Journey on Your Metro</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolorum, porro accusamus officiis laudantium, labore natus voluptatem ab temporibus facilis nobis dolore maiores, iusto aut deserunt sunt. Enim, autem quasi!
        </p>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h3>Social Media</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolorum, porro accusamus officiis laudantium, labore natus voluptatem ab temporibus facilis nobis dolore maiores, iusto aut deserunt sunt. Enim, autem quasi!
        </p>
      </b-col>
    </b-row>

    <Footer></Footer>
  </b-container>
</template>

<script>
import Footer from "@/components/Footer";
import MainHeader from '@/components/MainHeader.vue'
import LineChart from '@/charts/LineChart.js'
import BarChart from '@/charts/BarChart.js'

export default {
    name: "Findings",
    components: {
        MainHeader,
        Footer,
        LineChart,
        BarChart,
    },
    data () {
      return {
        datacollection: null
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
      }
    }
}
</script>

<style>

</style>