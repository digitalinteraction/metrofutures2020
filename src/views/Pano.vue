<template>
<b-container class="pano">
  <b-row>
    <b-col class="header">
      <h3>360 Panoramas</h3>
      <div>Logo goes here</div>
      
    </b-col>
  </b-row>
  <b-row class="pano_frame">
    <b-col >
      <div ref="pano" id="pano"></div>
    </b-col>
  </b-row>

  <b-row>
    <b-col>
      Navigation
    </b-col>
  </b-row>
  
</b-container>
</template>

<script>
const marzipano = require("marzipano");

export default {
  name: "Pano",
  data() {
    return { 
      viewer: "",
      scene: "",
      tileUrl: process.env.VUE_APP_TILE_URL+"{z}/{f}/{y}/{x}.jpg",
      previewUrl: process.env.VUE_APP_TILE_URL+"preview.jpg"
    }
  },
  methods: {
    initSinglePano() {
      var element = this.$refs.pano;
      let viewerOpts = {
        controls: {
          mouseViewMode: 'drag'
        }
      }
      this.viewer = new marzipano.Viewer(element, viewerOpts)

      var levels = [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024},
        { "tileSize": 512, "size": 2048}
      ]
      var geometry = new marzipano.CubeGeometry(levels);

      var source = marzipano.ImageUrlSource.fromString(this.tileUrl, {
        cubeMapPreviewUrl: this.previewUrl
      });
      var faceSize = 2048;
      var limiter = marzipano.RectilinearView.limit.traditional(faceSize, 100*Math.PI/180, 120*Math.PI/180);
      var initialViewParameters = {
          "yaw": -0.19833286954484564,
          "pitch": 0.012640525806762781,
          "fov": 1.5084360796071108
        }
      var view = new marzipano.RectilinearView(initialViewParameters, limiter);

      this.scene = this.viewer.createScene({
        source: source,
        geometry: geometry,
        view: view
      });
      // var scenes = marz_data.scenes.map();
      this.scene.switchTo({
        transitionDuration: 1000
      });
    }
  },
  mounted() {
    this.initSinglePano();
  }
}
</script>

<style>

.pano_frame {
  height: 80vh;
}

#pano {
  border: 1px solid black;
  height: 80vh;
  left: 0;
  overflow: hidden;
}

</style>