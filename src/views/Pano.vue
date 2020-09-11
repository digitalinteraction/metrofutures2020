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


      <!-- <div ref="hotspot1" class="hotspot" v-on:click="toggleHotspot()">
          <img src="/favicon.ico" alt="">
          <span v-show="showHotspot">
            <span class="hotspot_title">Livery</span>
            <span class="hotspot_text">Tyne and Wear Metro has a completely new livery!<br>[Free text comment]</span>
          </span>
      </div>
      <div ref="hotspot2" class="hotspot">
          <img src="/favicon.ico" alt="">
          <span hidden>
            <span class="hotspot_title">Lights</span>
            <span class="hotspot_text">Your new Metro features a state-of-the-art LED head and tail light system, and a glowing "M".<br>[Free text comment]</span>
          </span>
      </div> -->
      <!-- <img src="/favicon.ico" alt="" ref="imghotspot">  -->


      <!-- Can't use auto generation of hotspots -->
      <!-- <div 
        v-for="(scene, index) of pano_data.scenes"
        v-bind:key="index"  
      >
        <strong>{{ scene.id }}</strong>
        <div
          class="hotspot"
          v-for="(spot, index1) of scene.infoHotspots"
          v-bind:key="index1"
          :ref="getHotspotName(index, index1)"
        > 
          <img src="/favicon.ico" alt="">
          <span class="hotspot_title">{{ spot.title }}</span>
          <span class="hotspot_text">{{ spot.text }}</span>
        </div>
      </div> -->
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
        showHotspot: true,
        allHotspots: [
          { id: "0", visible: false, 0: "hotspot_0_0", 1: "hotspot_0_1", 2: "hotspot_0_2"},
          { id: "2", visible: false, 0: "hotspot_0_0", 1: "hotspot_0_1", 2: "hotspot_0_2", 3: "hotspot_0_3", 4: "hotspot_0_4", 5: "hotspot_0_5"},
          { id: "4", visible: false, 0: "hotspot_0_0", 1: "hotspot_0_1", 2: "hotspot_0_2", 3: "hotspot_0_3", 4: "hotspot_0_4", 5: "hotspot_0_5"},
          { id: "6", visible: false, 0: "hotspot_0_0", 1: "hotspot_0_1", 2: "hotspot_0_2", 3: "hotspot_0_3", 4: "hotspot_0_4", 5: "hotspot_0_5"},
          { id: "8", visible: false, 0: "hotspot_0_0", 1: "hotspot_0_1", 2: "hotspot_0_2", 3: "hotspot_0_3", 4: "hotspot_0_4"},
          { id: "10", visible: false, 0: "hotspot_0_0", 1: "hotspot_0_1", 2: "hotspot_0_2", 3: "hotspot_0_3", 4: "hotspot_0_4", 5: "hotspot_0_5"},
          { id: "12", visible: false, 0: "hotspot_0_0", 1: "hotspot_0_1", 2: "hotspot_0_2", 3: "hotspot_0_3", 4: "hotspot_0_4", 5: "hotspot_0_5", 6: "hotspot_0_5"}
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
      initSinglePano(sceneId) {
        let levels = this.pano_data.scenes[sceneId].levels
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

        

        // Apply hotspots manually for now to scene 0
        if(sceneId === 0) {
          // console.log(this.$refs)

          // Marzipano wants to directly manipulate the element.style, so if the elements are rendered with a v-for .style is unavailable (as it's handled by Vue itself), therefore it doesn't work with Marzipano!
          // let i = 0;
          // for (let item of scene.infoHotspots) {
          //   console.log("Hotspots",item.title, sceneId, i)
          //   let name = this.getHotspotName(sceneId, i)
          //   let el = this.$refs[name]
          //   console.log(el[0])
          //   let position = {
          //     "yaw": item.yaw,
          //     "pitch": item.pitch
          //   }
            
          //   sceneView.hotspotContainer().createHotspot(el, position)

          //   i++
          // }

          console.log("generating hotspots for scene", sceneId)
          // let hotspotEl = this.$refs.hotspot1
          let dynHotspot = this.$refs[this.fetchHotspot(sceneId,0)]
          // console.log(dynHotspot)
          // console.log("returned",this.findHotspot(sceneId,0))
          let position = {
            "yaw": -0.14023522364884577,
            "pitch": 0.11475964612484191
          }
          sceneView.hotspotContainer().createHotspot(dynHotspot, position)

          // let hotspot2El = this.$refs.hotspot2
          let hotspot2El = this.$refs[this.fetchHotspot(sceneId,1)]
          let position2 = {
            "yaw": -0.8358385796154355,
            "pitch": 0.30236171550205526
          }
          sceneView.hotspotContainer().createHotspot(hotspot2El, position2)

          // let hotspot3El = this.$refs.imghotspot
          let hotspot3El = this.$refs[this.fetchHotspot(sceneId,2)]
          hotspot3El.classList.add('hotspot');
          let position3 = {
            "yaw": -1.0892431152132307,
            "pitch": 0.43463794138405376
          }
          sceneView.hotspotContainer().createHotspot(hotspot3El, position3)
        }
        

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
      findHotspot(sceneId, index) {
        let hotspotRef = "hotspot_"+sceneId+"_"+index
        console.log("Searching for", hotspotRef)
        return this.$refs['dynamicHotspot'].find(
              el => el.$attrs['data-key'] === hotspotRef
          );
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