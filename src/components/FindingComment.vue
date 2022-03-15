<template>

  <div class="comment_block" >
    People said:
    <div class="comment_text">{{ comments[commentId] }}</div>
      <div class="comment_controls">
        <div>Sample Comment {{ commentId+1 }} of {{ comments.length }}</div> 
        <div class="comment_next" @click="nextComment()">Next</div>
      </div>
  </div>
  
</template>

<script>
export default {
  name: "FindingComment",

  props: {
    comments: Array,
  },

  data() {
    return {
      commentId: 0,
    }
  },

  methods: {
    nextComment() {
      if(this.commentId+2 > this.comments.length) {
        this.commentId = 0
      } else {
        this.commentId++;
      }
    }
  }

}
</script>

<style lang="scss">

  // The outer block can be styled in the other component
  // .comment_block {
  //   border-top: 1px solid black;
  //   margin-top: 0.5em;
  //   padding-top: 0.5em;
  // }

  .comment_controls {
    text-align: center;
  }

  .comment_next {
    display:inline-block;
    background: white;
    color: black;
    padding: 0.3em 0.8em;
    border: 1px solid black;
    border-radius: 0.3em;
    margin-top: 0.25em;
  }

  .comment_text {
    font-style: italic;
    // font-size: 0.9em;
    background-color: white;
    border: 1px solid grey;
    border-radius: 0.5em;
    padding: 0.25em;
    // padding-right: 0.25em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

</style>