<template>
  <div>
    <div>You said:</div>
    <b-form-rating 
        class="likert_item"
        :value="data.likertAvg"
        icon-empty="circle"
        icon-full="circle-fill"
        variant="warning"
        readonly
    ></b-form-rating>
    <div class="likert_text" v-if="data.likert === 'clear'">1 = very un{{data.likert}}, 5 = very {{data.likert}}</div>
    <div class="likert_text" v-if="data.likert === 'safe'">1 = no {{data.likert}}r, 5 = much {{data.likert}}r</div>

    <button @click="toggleLikert()">More details</button>
    <div class="likert-details" v-if="details">
        <b-table small striped hover :items="data.likertData"></b-table>
    </div>

  </div>
</template>

<script>
export default {
    name: "LikertDetails",
    props: {
        likertAvg: Number,
        likertData: Object,
    },
    data() {
        return {
            details: false,
            // likertAvg: 3,
            // likertData: [
            //     {"rating": 5, "percentage": "10%"},
            //     {"rating": 4, "percentage": "70%"},
            //     {"rating": 3, "percentage": "20%"},
            //     {"rating": 2, "percentage": "0%"},
            //     {"rating": 1, "percentage": "0%"},
            // ],
        }
    },
    methods: {
        toggleLikert() {
            this.details = !this.details
        }
    }

}
</script>

<style>

</style>