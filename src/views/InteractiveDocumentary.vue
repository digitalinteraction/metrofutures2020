<template>
  <div class="idoc">
    <b-container class="bv-example-row">
      <b-row><b-col><h3>Interactive Documentary</h3></b-col></b-row>
      <b-row><b-col>
          <p>Below you will find our interactive documentary where you can explore how design choices in the new Metro carriages will impact on different users.</p>  
      </b-col></b-row>
      <b-row>
        <b-col cols="1"></b-col>
        <b-col>
          <div id="idoc">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/7wnRi3Sclm8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>

    </b-container>

    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'InteractiveDocumentary',
  components: {
  }
}
</script>
