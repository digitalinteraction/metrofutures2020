<template>
<b-container class="pano">
  <b-row>
    <b-col class="header">
      <h3>Your New Metro</h3>
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
      <div>[Map of train]</div>
      <div>Current view: {{ getSelectedName() }}</div>
      <b-dropdown text="Select View">
        <b-dropdown-item v-for=" (scene, index) in pano_data[0].scenes" v-bind:key="scene.id" :active="selectedId===index">
          {{ scene.name }}
        </b-dropdown-item>
      </b-dropdown>
    </b-col>
  </b-row>
  
</b-container>
</template>

<script>
  const marzipano = require("marzipano");
  // import {mapState, mapGetters, mapMutations} from 'vuex'
  import {mapState} from 'vuex'

  export default {
    name: "Pano",
    data() {
      return { 
        viewer: {},
        scene: {},
        selectedId: 0,
        tileUrl: process.env.VUE_APP_TILE_URL+"{z}/{f}/{y}/{x}.jpg",
        previewUrl: process.env.VUE_APP_TILE_URL+"preview.jpg"
      }
    },
    computed: {
      ...mapState([
      'pano_data'
    ])
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
      },
      getSelectedName() {
        return this.pano_data[0].scenes[this.selectedId].name
      }
    },
    mounted() {
      this.initSinglePano();
    }
  }
</script>

<style>

  body {
    text-align: center;
  }

  .pano_frame {
    height: 80vh;
    text-align: left;
  }

  #pano {
    height: 80vh;
    left: 0;
    overflow: hidden;
  }

</style>