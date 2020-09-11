<template>
<b-container class="pano">
  
  <MainHeader title="Explore Your Metro"/>

  <b-row class="pano_frame">
    <b-col >
      <div ref="pano" id="pano"></div>
      <div class="hotspot" v-show="false">
          <span id="title">Livery</span>
          <span id="text">Tyne and Wear Metro has a completely new livery!<br>[Free text comment]</span>
      </div>
    </b-col>
  </b-row>

  <b-row>
    <b-col>
      <!-- <div>[Map of train]</div> -->
      <!-- <div>Current view: {{ getSelectedName() }}</div> -->
      <b-dropdown text="Select View">
        <b-dropdown-item 
          v-for=" (scene, index) in this.pano_data.scenes" 
          v-bind:key="scene.id" 
          :active="selectedId===index"
          v-on:click="selectScene(index)"
        >
          {{ scene.name }}
        </b-dropdown-item>
      </b-dropdown>
    </b-col>
    <b-col>
      <b-button v-on:click="togglePeople()">Toggle People</b-button>
    </b-col>
  </b-row>
  
</b-container>
</template>

<script>
  const marzipano = require("marzipano");
  // import {mapState, mapGetters, mapMutations} from 'vuex'
  import {mapState} from 'vuex'
  import MainHeader from '@/components/MainHeader.vue'

  export default {
    name: "Pano",
    components: {
      MainHeader
    },
    data() {
      return { 
        viewer: {},
        scene: {},
        panoScenes: [],
        people: false,
        selectedId: 0,
        tileUrl: process.env.VUE_APP_TILE_URL_TEST+"{z}/{f}/{y}/{x}.jpg",
        previewUrl: process.env.VUE_APP_TILE_URL_TEST+"preview.jpg"
      }
    },
    computed: {
      ...mapState([
        'pano_data'
      ])      
    },
    methods: {
      initPanoViewer() {
        let element = this.$refs.pano;
        let viewerOpts = {
          controls: {
            mouseViewMode: 'drag'
          }
        }
        this.viewer = new marzipano.Viewer(element, viewerOpts)
      },
      initSinglePano(sceneId) {
        let levels = this.pano_data.scenes[sceneId].levels
        // console.log(this.pano_data.scenes[sceneId].levels)
        // console.log(sceneId);
        let geometry = new marzipano.CubeGeometry(levels);

        // TO DO get dynamic tileUrl (add in the scene name)
        let source = marzipano.ImageUrlSource.fromString(this.tileUrl, {
          cubeMapPreviewUrl: this.previewUrl
        });
        let faceSize = 2048;
        let limiter = marzipano.RectilinearView.limit.traditional(faceSize, 100*Math.PI/180, 120*Math.PI/180);
        let initialViewParameters = {
            "yaw": -0.19833286954484564,
            "pitch": 0.012640525806762781,
            "fov": 1.5084360796071108
          }
        let view = new marzipano.RectilinearView(initialViewParameters, limiter);

        this.scene = this.viewer.createScene({
          source: source,
          geometry: geometry,
          view: view
        });
        // let scenes = marz_data.scenes.map();
        this.scene.switchTo({
          transitionDuration: 1000
        });
      },
      loadPano(sceneId) {
        if(sceneId === typeof(undefined)) { 
          console.error("Must define a sceneId to load")
          return 
        }

        const scene = this.pano_data.scenes[sceneId]
        // console.log(`loading scene ${sceneId}`)
        let levels = scene.levels
        let geometry = new marzipano.CubeGeometry(levels);

        let tileUrl = process.env.VUE_APP_TILE_URL+scene.id+"/{z}/{f}/{y}/{x}.jpg"
        let previewUrl = process.env.VUE_APP_TILE_URL+scene.id+"/preview.jpg"
        let source = marzipano.ImageUrlSource.fromString(tileUrl, {
          cubeMapPreviewUrl: previewUrl
        });
        let limiter = marzipano.RectilinearView.limit.traditional(scene.faceSize, 100*Math.PI/180, 120*Math.PI/180);
        let view = new marzipano.RectilinearView(scene.initialViewParameters, limiter);

        // Create a marzipano scene object using all the above
        let sceneView = this.viewer.createScene({
          source: source,
          geometry: geometry,
          view: view
        });
        this.panoScenes[sceneId].scene = sceneView;

      },
      loadRemainingPanos() {
        // Assume we load pano 0 first, we are loading the rest
        // Iterate 1 - 13 (0 indexed)
        for (let i = 1; i < this.panoScenes.length; i++) {
          this.loadPano(i)
          // console.log("Loading pano", this.panoScenes[i].id)
        }
      },
      selectScene(dropdownIndex) {
        // User facing - scene they have selected
        console.log("Selected", dropdownIndex)
        this.selectedId = dropdownIndex;
        this.switchScene(dropdownIndex);
      },
      switchScene(sceneId) {
        if(sceneId % 2 > 0) { console.log("odd")}
        this.panoScenes[sceneId].scene.switchTo({
          transitionDuration: 1000
        })
      },
      populateScenesId() {
        // Populate the Vue panoScenes from the data file. 
        // We will eventually store the actual scene objects within scene, which we call the .switchTo method to get them into the viewer.
        for (const scene of this.pano_data.scenes){
          this.panoScenes.push({
            id: scene.id,
            scene: {}
          })
        }
      },
      getSelectedName() {
        return this.pano_data.scenes[this.selectedId].name
      },
      togglePeople() {
        this.people != this.people;
      },
      // Returns even, not sure if I'll use it
      even: function(array) {
        return array.filter(function (number) {
          return number % 2 === 0
        })
      }
    },
    mounted() {
      this.initPanoViewer();
      this.populateScenesId();
      this.loadPano(0);
      this.switchScene(0);
      // Load all other scenes in the background
      this.loadRemainingPanos()
    }
  }
</script>

<style>

  body {
    text-align: center;
  }

  .pano_frame {
    height: 75vh;
    text-align: left;
  }

  #pano {
    height: 75vh;
    left: 0;
    overflow: hidden;
  }

</style>