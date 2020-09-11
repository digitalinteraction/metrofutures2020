<template>
<b-container class="pano">
  
  <MainHeader title="Explore Your Metro"/>

  <b-row class="pano_frame">
    <b-col >
      <div ref="pano" id="pano"></div>
      
    </b-col>
  </b-row>

  <b-row>
    <b-col>
            <!-- <div>[Map of train]</div> -->
      <!-- <div>Current view: {{ getSelectedName() }}</div> -->
      <b-dropdown text="Select View">
        <b-dropdown-item 
          v-for="(scene, index) in this.pano_data.scenes" 
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

  <b-row>
    <b-col>
      <!-- 0 -->
      <div ref="hotspot_0_0" class="hotspot">
        <Hotspot :data="getHotspotData(0,0)"/>
      </div>
      <div ref="hotspot_0_1" class="hotspot">
          <Hotspot :data="getHotspotData(0,1)"/>
      </div>
      <div ref="hotspot_0_2" class="hotspot">
        <Hotspot :data="getHotspotData(0,2)"/>
      </div>

      <!-- 1 -->
      <div ref="hotspot_1_0" class="hotspot">
        <Hotspot :data="getHotspotData(1,0)"/>
      </div>
      <div ref="hotspot_1_1" class="hotspot">
        <Hotspot :data="getHotspotData(1,1)"/>
      </div>
      <div ref="hotspot_1_2" class="hotspot">
        <Hotspot :data="getHotspotData(1,2)"/>
      </div>

      <!-- 2 -->
      <div ref="hotspot_2_0" class="hotspot">
        <Hotspot :data="getHotspotData(2,0)"/>
      </div>
      <div ref="hotspot_2_1" class="hotspot">
        <Hotspot :data="getHotspotData(2,1)"/>
      </div>
      <div ref="hotspot_2_2" class="hotspot">
        <Hotspot :data="getHotspotData(2,2)"/>
      </div>
      <div ref="hotspot_2_3" class="hotspot">
        <Hotspot :data="getHotspotData(2,3)"/>
      </div>
      <div ref="hotspot_2_4" class="hotspot">
        <Hotspot :data="getHotspotData(2,4)"/>
      </div>
      <div ref="hotspot_2_5" class="hotspot">
        <Hotspot :data="getHotspotData(2,5)"/>
      </div>

      <!-- 3 -->
      <div ref="hotspot_3_0" class="hotspot">
        <Hotspot :data="getHotspotData(3,0)"/>
      </div>
      <div ref="hotspot_3_1" class="hotspot">
        <Hotspot :data="getHotspotData(3,1)"/>
      </div>
      <div ref="hotspot_3_2" class="hotspot">
        <Hotspot :data="getHotspotData(3,2)"/>
      </div>
      <div ref="hotspot_3_3" class="hotspot">
        <Hotspot :data="getHotspotData(3,3)"/>
      </div>
      <div ref="hotspot_3_4" class="hotspot">
        <Hotspot :data="getHotspotData(3,4)"/>
      </div>
      <div ref="hotspot_3_5" class="hotspot">
        <Hotspot :data="getHotspotData(3,5)"/>
      </div>

      <!-- 4 -->
      <div ref="hotspot_4_0" class="hotspot">
        <Hotspot :data="getHotspotData(4,0)"/>
      </div>
      <div ref="hotspot_4_1" class="hotspot">
        <Hotspot :data="getHotspotData(4,1)"/>
      </div>
      <div ref="hotspot_4_2" class="hotspot">
        <Hotspot :data="getHotspotData(4,2)"/>
      </div>
      <div ref="hotspot_4_3" class="hotspot">
        <Hotspot :data="getHotspotData(4,3)"/>
      </div>
      <div ref="hotspot_4_4" class="hotspot">
        <Hotspot :data="getHotspotData(4,4)"/>
      </div>
      <div ref="hotspot_4_5" class="hotspot">
        <Hotspot :data="getHotspotData(4,5)"/>
      </div>

      <!-- 5 -->
      <div ref="hotspot_5_0" class="hotspot">
        <Hotspot :data="getHotspotData(5,0)"/>
      </div>
      <div ref="hotspot_5_1" class="hotspot">
        <Hotspot :data="getHotspotData(5,1)"/>
      </div>
      <div ref="hotspot_5_2" class="hotspot">
        <Hotspot :data="getHotspotData(5,2)"/>
      </div>
      <div ref="hotspot_5_3" class="hotspot">
        <Hotspot :data="getHotspotData(5,3)"/>
      </div>
      <div ref="hotspot_5_4" class="hotspot">
        <Hotspot :data="getHotspotData(5,4)"/>
      </div>
      <div ref="hotspot_5_5" class="hotspot">
        <Hotspot :data="getHotspotData(5,5)"/>
      </div>

      <!-- 6 -->
      <div ref="hotspot_6_0" class="hotspot">
        <Hotspot :data="getHotspotData(6,0)"/>
      </div>
      <div ref="hotspot_6_1" class="hotspot">
        <Hotspot :data="getHotspotData(6,1)"/>
      </div>
      <div ref="hotspot_6_2" class="hotspot">
        <Hotspot :data="getHotspotData(6,2)"/>
      </div>
      <div ref="hotspot_6_3" class="hotspot">
        <Hotspot :data="getHotspotData(6,3)"/>
      </div>
      <div ref="hotspot_6_4" class="hotspot">
        <Hotspot :data="getHotspotData(6,4)"/>
      </div>
      <div ref="hotspot_6_5" class="hotspot">
        <Hotspot :data="getHotspotData(6,5)"/>
      </div>

      <!-- 7 -->
      <div ref="hotspot_7_0" class="hotspot">
        <Hotspot :data="getHotspotData(7,0)"/>
      </div>
      <div ref="hotspot_7_1" class="hotspot">
        <Hotspot :data="getHotspotData(7,1)"/>
      </div>
      <div ref="hotspot_7_2" class="hotspot">
        <Hotspot :data="getHotspotData(7,2)"/>
      </div>
      <div ref="hotspot_7_3" class="hotspot">
        <Hotspot :data="getHotspotData(7,3)"/>
      </div>
      <div ref="hotspot_7_4" class="hotspot">
        <Hotspot :data="getHotspotData(7,4)"/>
      </div>
      <div ref="hotspot_7_5" class="hotspot">
        <Hotspot :data="getHotspotData(7,5)"/>
      </div>

      <!-- 8 -->
      <div ref="hotspot_8_0" class="hotspot">
        <Hotspot :data="getHotspotData(8,0)"/>
      </div>
      <div ref="hotspot_8_1" class="hotspot">
        <Hotspot :data="getHotspotData(8,1)"/>
      </div>
      <div ref="hotspot_8_2" class="hotspot">
        <Hotspot :data="getHotspotData(8,2)"/>
      </div>
      <div ref="hotspot_8_3" class="hotspot">
        <Hotspot :data="getHotspotData(8,3)"/>
      </div>
      <div ref="hotspot_8_4" class="hotspot">
        <Hotspot :data="getHotspotData(8,4)"/>
      </div>
      <div ref="hotspot_8_5" class="hotspot">
        <Hotspot :data="getHotspotData(8,5)"/>
      </div>

      <!-- 9 -->
      <div ref="hotspot_9_0" class="hotspot">
        <Hotspot :data="getHotspotData(9,0)"/>
      </div>
      <div ref="hotspot_9_1" class="hotspot">
        <Hotspot :data="getHotspotData(9,1)"/>
      </div>
      <div ref="hotspot_9_2" class="hotspot">
        <Hotspot :data="getHotspotData(9,2)"/>
      </div>
      <div ref="hotspot_9_3" class="hotspot">
        <Hotspot :data="getHotspotData(9,3)"/>
      </div>
      <div ref="hotspot_9_4" class="hotspot">
        <Hotspot :data="getHotspotData(9,4)"/>
      </div>
      <div ref="hotspot_9_5" class="hotspot">
        <Hotspot :data="getHotspotData(9,5)"/>
      </div>

      <!-- 10 -->
      <div ref="hotspot_10_0" class="hotspot">
        <Hotspot :data="getHotspotData(10,0)"/>
      </div>
      <div ref="hotspot_10_1" class="hotspot">
        <Hotspot :data="getHotspotData(10,1)"/>
      </div>
      <div ref="hotspot_10_2" class="hotspot">
        <Hotspot :data="getHotspotData(10,2)"/>
      </div>
      <div ref="hotspot_10_3" class="hotspot">
        <Hotspot :data="getHotspotData(10,3)"/>
      </div>
      <div ref="hotspot_10_4" class="hotspot">
        <Hotspot :data="getHotspotData(10,4)"/>
      </div>
      <div ref="hotspot_10_5" class="hotspot">
        <Hotspot :data="getHotspotData(10,5)"/>
      </div>
      <!-- 11 -->
      <div ref="hotspot_11_0" class="hotspot">
        <Hotspot :data="getHotspotData(11,0)"/>
      </div>
      <div ref="hotspot_11_1" class="hotspot">
        <Hotspot :data="getHotspotData(11,1)"/>
      </div>
      <div ref="hotspot_11_2" class="hotspot">
        <Hotspot :data="getHotspotData(11,2)"/>
      </div>
      <div ref="hotspot_11_3" class="hotspot">
        <Hotspot :data="getHotspotData(11,3)"/>
      </div>
      <div ref="hotspot_11_4" class="hotspot">
        <Hotspot :data="getHotspotData(11,4)"/>
      </div>
      <div ref="hotspot_11_5" class="hotspot">
        <Hotspot :data="getHotspotData(11,5)"/>
      </div>
      <!-- 12 -->
      <div ref="hotspot_12_0" class="hotspot">
        <Hotspot :data="getHotspotData(12,0)"/>
      </div>
      <div ref="hotspot_12_1" class="hotspot">
        <Hotspot :data="getHotspotData(12,1)"/>
      </div>
      <div ref="hotspot_12_2" class="hotspot">
        <Hotspot :data="getHotspotData(12,2)"/>
      </div>
      <div ref="hotspot_12_3" class="hotspot">
        <Hotspot :data="getHotspotData(12,3)"/>
      </div>
      <div ref="hotspot_12_4" class="hotspot">
        <Hotspot :data="getHotspotData(12,4)"/>
      </div>
      <div ref="hotspot_12_5" class="hotspot">
        <Hotspot :data="getHotspotData(12,5)"/>
      </div>
      <div ref="hotspot_12_6" class="hotspot">
        <Hotspot :data="getHotspotData(12,6)"/>
      </div>
      <!-- 13 -->
      <div ref="hotspot_13_0" class="hotspot">
        <Hotspot :data="getHotspotData(13,0)"/>
      </div>
      <div ref="hotspot_13_1" class="hotspot">
        <Hotspot :data="getHotspotData(13,1)"/>
      </div>
      <div ref="hotspot_13_2" class="hotspot">
        <Hotspot :data="getHotspotData(13,2)"/>
      </div>
      <div ref="hotspot_13_3" class="hotspot">
        <Hotspot :data="getHotspotData(13,3)"/>
      </div>
      <div ref="hotspot_13_4" class="hotspot">
        <Hotspot :data="getHotspotData(13,4)"/>
      </div>
      <div ref="hotspot_13_5" class="hotspot">
        <Hotspot :data="getHotspotData(13,5)"/>
      </div>
      <div ref="hotspot_13_6" class="hotspot">
        <Hotspot :data="getHotspotData(13,6)"/>
      </div>
    </b-col>
  </b-row>
  
</b-container>
</template>

<script>
  const marzipano = require("marzipano");
  // import {mapState, mapGetters, mapMutations} from 'vuex'
  import {mapState} from 'vuex'
  import MainHeader from '@/components/MainHeader.vue'
  import Hotspot from '@/components/Hotspot.vue'

  export default {
    name: "Pano",
    components: {
      MainHeader,
      Hotspot
    },
    data() {
      return { 
        viewer: {},
        scene: {},
        panoScenes: [],
        people: false,
        selectedId: 0,
        showHotspot: false,
        allHotspots: [
          { id: "0", visible: false, 0: "hotspot_0_0", 1: "hotspot_0_1", 2: "hotspot_0_2"},
          { id: "1", visible: false, 0: "hotspot_1_0", 1: "hotspot_1_1", 2: "hotspot_1_2"},
          { id: "2", visible: false, 0: "hotspot_2_0", 1: "hotspot_2_1", 2: "hotspot_2_2", 3: "hotspot_2_3", 4: "hotspot_2_4", 5: "hotspot_2_5"},
          { id: "3", visible: false, 0: "hotspot_3_0", 1: "hotspot_3_1", 2: "hotspot_3_2", 3: "hotspot_3_3", 4: "hotspot_3_4", 5: "hotspot_3_5"},
          { id: "4", visible: false, 0: "hotspot_4_0", 1: "hotspot_4_1", 2: "hotspot_4_2", 3: "hotspot_4_3", 4: "hotspot_4_4", 5: "hotspot_4_5"},
          { id: "5", visible: false, 0: "hotspot_5_0", 1: "hotspot_5_1", 2: "hotspot_5_2", 3: "hotspot_5_3", 4: "hotspot_5_4", 5: "hotspot_5_5"},
          { id: "6", visible: false, 0: "hotspot_6_0", 1: "hotspot_6_1", 2: "hotspot_6_2", 3: "hotspot_6_3", 4: "hotspot_6_4", 5: "hotspot_6_5"},
          { id: "7", visible: false, 0: "hotspot_7_0", 1: "hotspot_7_1", 2: "hotspot_7_2", 3: "hotspot_7_3", 4: "hotspot_7_4", 5: "hotspot_7_5"},
          { id: "8", visible: false, 0: "hotspot_8_0", 1: "hotspot_8_1", 2: "hotspot_8_2", 3: "hotspot_8_3", 4: "hotspot_8_4", 5: "hotspot_8_5"},
          { id: "9", visible: false, 0: "hotspot_9_0", 1: "hotspot_9_1", 2: "hotspot_9_2", 3: "hotspot_9_3", 4: "hotspot_9_4", 5: "hotspot_9_5"},
          { id: "10", visible: false, 0: "hotspot_10_0", 1: "hotspot_10_1", 2: "hotspot_10_2", 3: "hotspot_10_3", 4: "hotspot_10_4", 5: "hotspot_10_5"},
          { id: "11", visible: false, 0: "hotspot_11_0", 1: "hotspot_11_1", 2: "hotspot_11_2", 3: "hotspot_11_3", 4: "hotspot_11_4", 5: "hotspot_11_5"},
          { id: "12", visible: false, 0: "hotspot_12_0", 1: "hotspot_12_1", 2: "hotspot_12_2", 3: "hotspot_12_3", 4: "hotspot_12_4", 5: "hotspot_12_5", 6: "hotspot_12_6"},
          { id: "13", visible: false, 0: "hotspot_13_0", 1: "hotspot_13_1", 2: "hotspot_13_2", 3: "hotspot_13_3", 4: "hotspot_13_4", 5: "hotspot_13_5", 6: "hotspot_13_6"}
        ],
        hotspotText: ""
      }
    },
    computed: {
      ...mapState([
        'pano_data',
      ])      
    },
    methods: {
      initPanoViewer() {
        // Get pano ref (div) and create a Viewer attached to it
        let element = this.$refs.pano;
        let viewerOpts = {
          controls: {
            mouseViewMode: 'drag'
          }
        }
        this.viewer = new marzipano.Viewer(element, viewerOpts)
      },
      loadPano(sceneId) {
        if(sceneId === typeof(undefined)) { 
          console.error("Must define a sceneId to load")
          return 
        }

        const scene = this.pano_data.scenes[sceneId]
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
        }
      },
      selectScene(dropdownIndex) {
        // User facing - scene they have selected
        console.log("Selected", dropdownIndex)
        // Toggling users on/off will affect this
        // There will be 0 - 6 options, but this maps to 0 - 13 options, with the higher number being without people (e.g. 1 has people, 0 does not)
        // If not 0 (have separate case for this): double selected ID, if people===true, subtract 1

        this.selectedId = dropdownIndex;
        this.switchScene(dropdownIndex);
      },
      switchScene(sceneId) {
        // Attach all the relevant hotspots to the scene
        this.attachHotspots(this.panoScenes[sceneId].scene, this.pano_data.scenes[sceneId], sceneId)
        
        if(sceneId % 2 > 0) { console.log("odd") }

        // Run switchTo() on scene which loads it into the viewer
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
      getAllHotspotData() {
        return this.pano_data.scenes
      },
      getHotspotData(sceneId, index) {
        return this.pano_data.scenes[sceneId].infoHotspots[index]
      },
      getHotspotName(sceneId, index){
        return "hotspot"+sceneId+"_"+index
      },
      fetchHotspot(sceneId, index) {
        // From the lookup table, get the ref name (in the DOM) of the specific hotspot
        return this.allHotspots[sceneId][index]
      },
      togglePeople() {
        this.people = !this.people;
      },
      toggleHotspot() {
        // this.allHotspots[sceneId][index].visible = !this.allHotspots[sceneId][index].visible
        console.log("toggling hotspot")
        this.showHotspot = !this.showHotspot;
      },
      // Returns even, not sure if I'll use it
      even: function(array) {
        return array.filter(function (number) {
          return number % 2 === 0
        })
      },
      attachSingleHotspot(sceneView, scene, sceneId, index) {
        let hotspot = this.$refs[this.fetchHotspot(sceneId,index)]
        let position = {
            "yaw": scene.infoHotspots[index].yaw,
            "pitch": scene.infoHotspots[index].pitch
          }
        sceneView.hotspotContainer().createHotspot(hotspot, position)
        return
      },
      attachHotspots(sceneView, scene, sceneId) {
        for (let i = 0; i < scene.infoHotspots.length; i++) {
          this.attachSingleHotspot(sceneView, scene, sceneId, i)
        }
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

  .hotspot {
    background-color: gray;
    display: none;
  }

</style>