<template>
    <div class="menu">
        <b-container>

            <b-img id="metroLogo" src="../assets/metroLogoTemp.png" fluid alt="Metro logo"></b-img>
            <b-row>
                <b-col v-on:click="goTo('/walkthrough')"
                       @mouseover="hoverYourMetro = true"
                       @mouseleave="hoverYourMetro = false"
                       class="menuCol">

                    <div v-if="!hoverYourMetro">
                        <b-img  class="menuImg" src="../assets/yourMetroTemp.png"
                                fluid alt="Responsive image"></b-img>
                        <p class="imgTitles">Your Metro</p>
                    </div>


                    <div v-if="hoverYourMetro" class="hoveredImg">
                        <b-img class="enlargeImg" src="../assets/yourMetroTemp.png" fluid
                               alt="Responsive image"></b-img>
                        <div class="moreInfo w-100">
                            <p>Your Metro</p>
                            <p>
                                Explore features of the new trains, tell us what you think, and help us check the trains work for you.
                            </p>
                        </div>
                    </div>
                </b-col>
                <b-col @click="goTo('/survey')"
                       @mouseover="hoverYourChoice = true"
                       @mouseleave="hoverYourChoice = false"
                       class="menuCol">
                    <b-img class="menuImg" src="../assets/yourChoiceTemp.png" fluid alt="Responsive image"></b-img>
                    <p class="imgTitles">Your Choice</p>
                </b-col>
                <b-col @click="goTo('/idoc')"
                       @mouseover="hoverYourJourney = true"
                       @mouseleave="hoverYourJourney = false"
                       class="menuCol">
                    <b-img class="menuImg" src="../assets/yourJourneyTemp.png" fluid alt="Responsive image"></b-img>
                    <p class="imgTitles">Your Journey</p>
                </b-col>
            </b-row>

            <br>
            <br>
            <Footer></Footer>
        </b-container>


    </div>
</template>

<script>
    // @ is an alias to /src
    import Footer from "@/components/Footer";
    import router from "../router";
    export default {
        name: 'Menu',
        components: {
            Footer
        },
        methods: {
            goTo(route) {
                router.push(route);
            }
        },
        data() {
            return {
                hoverYourMetro: false,
                hoverYourChoice: false,
                hoverYourJourney: false
            }
        }
    }
</script>

<style lang="scss">
    .menuCol {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
    .imgTitles {
        position: absolute;
        color: #FFFFFF;
        bottom: 8px;
        left: 10%;
        font-size: xx-large;
    }
    .moreInfo {
        position: absolute;
        color: #FFFFFF;
        bottom: 0;
        left: 0;
        /*font-size: xx-large;*/
        background-color: rgba(black, 0.5);
    }
    #metroLogo {
        text-decoration: none;
        position: relative;
        z-index: 10;
        top: 20px;
    }
    .menuImg {
        z-index: 3;
    }
    .hoveredImg {
        transform: scale(1.1);
        transform-origin: right;
        z-index: 5;
    }
</style>
