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
      <div ref="hotspot_0_0" class="hotspot" v-on:click="toggleHotspot()">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(0,0).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(0,0).text }}</span>
          </span>
      </div>
      <div ref="hotspot_0_1" class="hotspot">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(0,1).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(0,1).text }}</span>
          </span>
      </div>
      <div ref="hotspot_0_2" class="hotspot">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(0,2).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(0,2).text }}</span>
          </span>
      </div>

      <div ref="hotspot_1_0" class="hotspot" v-on:click="toggleHotspot()">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(1,0).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(1,0).text }}</span>
          </span>
      </div>
      <div ref="hotspot_1_1" class="hotspot">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(1,1).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(1,1).text }}</span>
          </span>
      </div>
      <div ref="hotspot_1_2" class="hotspot">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(1,2).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(1,2).text }}</span>
          </span>
      </div>

      <div ref="hotspot_2_0" class="hotspot" v-on:click="toggleHotspot()">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(2,0).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(2,0).text }}</span>
          </span>
      </div>

      <div ref="hotspot_2_1" class="hotspot" v-on:click="toggleHotspot()">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(2,1).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(2,1).text }}</span>
          </span>
      </div>

      <div ref="hotspot_2_2" class="hotspot" v-on:click="toggleHotspot()">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(2,2).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(2,2).text }}</span>
          </span>
      </div>

      <div ref="hotspot_2_3" class="hotspot" v-on:click="toggleHotspot()">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(2,3).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(2,3).text }}</span>
          </span>
      </div>

      <div ref="hotspot_2_4" class="hotspot" v-on:click="toggleHotspot()">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(2,4).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(2,4).text }}</span>
          </span>
      </div>

      <div ref="hotspot_2_5" class="hotspot" v-on:click="toggleHotspot()">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">{{ getHotspotData(2,5).title }}</span>
            <span class="hotspot_text">{{ getHotspotData(2,5).text }}</span>
          </span>
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
        previewUrl: process.env.VUE_APP_TILE_URL_TEST+"preview.jpg",
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
          { id: "8", visible: false, 0: "hotspot_8_0", 1: "hotspot_8_1", 2: "hotspot_8_2", 3: "hotspot_8_3", 4: "hotspot_8_4"},
          { id: "9", visible: false, 0: "hotspot_9_0", 1: "hotspot_9_1", 2: "hotspot_9_2", 3: "hotspot_9_3", 4: "hotspot_9_4"},
          { id: "10", visible: false, 0: "hotspot_10_0", 1: "hotspot_10_1", 2: "hotspot_10_2", 3: "hotspot_10_3", 4: "hotspot_10_4", 5: "hotspot_10_5"},
          { id: "11", visible: false, 0: "hotspot_11_0", 1: "hotspot_11_1", 2: "hotspot_11_2", 3: "hotspot_11_3", 4: "hotspot_11_4", 5: "hotspot_11_5"},
          { id: "12", visible: false, 0: "hotspot_12_0", 1: "hotspot_12_1", 2: "hotspot_12_2", 3: "hotspot_12_3", 4: "hotspot_12_4", 5: "hotspot_12_5", 6: "hotspot_12_5"},
          { id: "13", visible: false, 0: "hotspot_13_0", 1: "hotspot_13_1", 2: "hotspot_13_2", 3: "hotspot_13_3", 4: "hotspot_13_4", 5: "hotspot_13_5", 6: "hotspot_13_5"}
        ],
        hotspotData: []
      }
    },
    computed: {
      ...mapState([
        'pano_data',
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

        

        // Apply hotspots manually for now to scene 0
        // if(sceneId === 0) {
        //   this.attachSingleHotspot(sceneView, scene, sceneId, 0)
        //   this.attachSingleHotspot(sceneView, scene, sceneId, 1)
        //   this.attachSingleHotspot(sceneView, scene, sceneId, 2)
        //   // console.log(this.$refs)

        //   // Marzipano wants to directly manipulate the element.style, so if the elements are rendered with a v-for .style is unavailable (as it's handled by Vue itself), therefore it doesn't work with Marzipano!
        //   // let i = 0;
        //   // for (let item of scene.infoHotspots) {
        //   //   console.log("Hotspots",item.title, sceneId, i)
        //   //   let name = this.getHotspotName(sceneId, i)
        //   //   let el = this.$refs[name]
        //   //   console.log(el[0])
        //   //   let position = {
        //     //     "yaw": item.yaw,

        //   //     "pitch": item.pitch
        //   //   }
            
        //   //   sceneView.hotspotContainer().createHotspot(el, position)

        //   //   i++
        //   // }

        //   // for (let i = 0; i < scene.infoHotspots.length; i++) {
        //   //   console.log(i)
        //   // }

        //   // console.log("generating hotspots for scene", sceneId)
        //   // // let hotspotEl = this.$refs.hotspot1
        //   // let dynHotspot = this.$refs[this.fetchHotspot(sceneId,0)]
        //   // // console.log(dynHotspot)
        //   // // console.log("returned",this.findHotspot(sceneId,0))
        //   // let position = {
        //   //   "yaw": -0.14023522364884577,
        //   //   "pitch": 0.11475964612484191
        //   // }
        //   // sceneView.hotspotContainer().createHotspot(dynHotspot, position)

        //   // let hotspot2El = this.$refs.hotspot2
        //   // let hotspot2El = this.$refs[this.fetchHotspot(sceneId,1)]
        //   // let position2 = {
        //   //   "yaw": -0.8358385796154355,
        //   //   "pitch": 0.30236171550205526
        //   // }
        //   // sceneView.hotspotContainer().createHotspot(hotspot2El, position2)

        //   // let hotspot3El = this.$refs.imghotspot
        //   // let hotspot3El = this.$refs[this.fetchHotspot(sceneId,2)]
        //   // hotspot3El.classList.add('hotspot');
        //   // let position3 = {
        //   //   "yaw": -1.0892431152132307,
        //   //   "pitch": 0.43463794138405376
        //   // }
        //   // sceneView.hotspotContainer().createHotspot(hotspot3El, position3)
        // }
        
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
        // this.attachSingleHotspot(this.panoScenes[sceneId].scene, this.pano_data.scenes[sceneId], sceneId, 0)
        this.attachHotspots(this.panoScenes[sceneId].scene, this.pano_data.scenes[sceneId], sceneId)
        
        if(sceneId % 2 > 0) { console.log("odd") }
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
        console.log("attaching hotspot",index)
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
      // this.hotspotData = this.getAllHotspotData()  // This just becomes a proxy for pano_data.scenes - so not sure useful
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
    /* display: none; */

  }

  .hotspot_title {
    font-weight:bold;
    display: inline-block
  }

  .hotspot_text {
  }

</style>