<template>
  <div>
    <div>People said: {{ likertAvg }}/5</div>
    <b-form-rating 
        class="likert_item"
        :value="likertAvg"
        icon-empty="circle"
        icon-full="circle-fill"
        variant="warning"
        readonly
    ></b-form-rating>

    <div class="likert_label">
        <div class="likert_text" v-if="likert === 'clear'">1 = very un{{likert}}, 5 = very {{likert}}</div>
        <div class="likert_text" v-if="likert === 'unclear'">1 = very {{likert}}, 5 = very clear</div>
        <div class="likert_text" v-if="likert === 'safe'">1 = no {{likert}}r, 5 = much {{likert}}r</div>
        <div class="likert_text" v-if="likert === 'poor'">1 = very {{likert}}, 5 = very well</div>
        <div class="likert_text" v-if="likert === 'useful'">1 = not {{likert}}, 5 = very {{likert}}</div>
        <div class="likert_text" v-if="likert === 'verywell'">1 = not very well, 5 = very well</div>
    </div>

    <b-button block @click="toggleLikert()">More details</b-button>
    <div class="likert-details" v-if="details">
        <b-table small striped hover :items="likertData"></b-table>
    </div>

  </div>
</template>

<script>
export default {
    name: "LikertDetails",
    props: {
        likert: String,
        likertAvg: Number,
        likertData: Array,
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

.likert_label {
    padding-top: 0.5em;
    padding-bottom: 1em;
}


</style>