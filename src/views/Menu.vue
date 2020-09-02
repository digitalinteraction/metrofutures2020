<template>
    <div class="menu">
        <b-container>
            <b-row>
                <b-col>

                </b-col>
                <b-col>
                    <b-img id="metroLogo" src="../assets/metroLogoTemp.png" fluid alt="Metro logo"></b-img>
                </b-col>
                <b-col>
                    <p id="aboutText">About Metro Futures</p>
                </b-col>
            </b-row>


<!--todo what happens instead of hover on touch screens?-->
            <b-row>
<!--                --------------- Your Metro option-->
                <b-col v-on:click="goTo('/walkthrough')"
                       @mouseover="hoverYourMetro = true"
                       @mouseleave="hoverYourMetro = false"
                       class="menuCol">

                    <div v-if="!hoverYourMetro">
                        <b-img  class="menuImg" src="../assets/yourMetro.png"
                                fluid alt="Responsive image"></b-img>
                        <h3 class="imgTitles">Your Metro</h3>
                    </div>


                    <div v-if="hoverYourMetro" class="hoveredImg">
                        <b-img class="enlargeImg" src="../assets/yourMetro.png" fluid
                               alt="Responsive image"></b-img>
                        <div class="moreInfo w-100">
                            <h3>Your Metro</h3>
                            <p>
                                Explore features of the new trains, tell us what you think, and help us check the trains work for you.
                            </p>
                        </div>
                    </div>
                </b-col>

                <!--                --------------- Your Choice option-->
                <b-col @click="goTo('/survey')"
                       @mouseover="hoverYourChoice = true"
                       @mouseleave="hoverYourChoice = false"
                       class="menuCol">

                    <div v-if="!hoverYourChoice">
                    <b-img class="menuImg" src="../assets/yourChoiceTemp.png" fluid alt="Responsive image"></b-img>
                    <h3 class="imgTitles">Your Choice</h3>
                    </div>

                    <div v-if="hoverYourChoice" class="hoveredImg">
                        <b-img class="enlargeImg" src="../assets/yourChoiceTemp.png" fluid
                               alt="Responsive image"></b-img>
                        <div class="moreInfo w-100">
                            <h3>Your Choice</h3>
                            <p>
                                Some internal options are still to be decided. Customise your Metro to help us decide.
                            </p>
                        </div>
                    </div>

                </b-col>

                <!--                --------------- Your Journeys option-->
                <b-col @click="goTo('/idoc')"
                       @mouseover="hoverYourJourney = true"
                       @mouseleave="hoverYourJourney = false"
                       class="menuCol">

                    <div v-if="!hoverYourJourney">
                    <b-img class="menuImg" src="../assets/yourJourneys.png" fluid alt="Responsive image"></b-img>
                    <h3 class="imgTitles">Your Journeys</h3>
                    </div>

                    <div v-if="hoverYourJourney" class="hoveredImg">
                        <b-img class="enlargeImg" src="../assets/yourJourneys.png" fluid
                               alt="Responsive image"></b-img>
                        <div class="moreInfo w-100">
                            <h3>Your Journeys</h3>
                            <p>
                                New trains need to work for different people and different journeys. Put yourself in someone else’s shoes to help us check.
                            </p>
                        </div>
                    </div>

                </b-col>
            </b-row>

            <br>
            <br>
            <b-row>
                <Footer></Footer>
            </b-row>

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
        // todo Google Analytics check in
        // todo get session cookie
    }
</script>

<style lang="scss">
    #aboutText {
        color: black;
    }
    .menuCol {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
    .imgTitles {
        position: absolute;
        color: #FFFFFF;
        bottom: 8px;
        padding-left: 1.1em;
        /*font-size: xx-large;*/
        font-family: Calvert, serif;
    }

    /*todo this box should animate to rise from the bottom on hover rather than just appear*/
    .moreInfo {
        position: absolute;
        color: #FFFFFF;
        bottom: 0;
        left: 0;
        background-color: rgba(black, 0.5);
        font-family: "Open Sans", sans-serif;
        text-align: left;

        & p {
            margin: 1.5em 2em 2em 2em;

        }

        & h3 {
            font-family: Calvert, serif;
            margin-left: 1.1em;
            margin-top: 1em;
        }
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
