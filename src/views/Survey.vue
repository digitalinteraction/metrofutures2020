<template>

    <div class="survey">

        <b-container align="center" fluid>

            <MainHeader title="Configure Your Choices"/> 

            <b-row align-v="center" class="surveyBreadcrumb fullScreenMenu">
                <b-col class="firstMenuCol breadItem" id="breadcrumb0"
                       v-bind:class="[checkSelected(0), checkCompleted(0)]" v-on:click="clickBreadcrumb(0)">Floor, seats and glass partitions
                </b-col>
                <b-col class="breadItem" id="breadcrumb1" v-bind:class="[checkSelected(1), checkCompleted(1)]"
                       v-on:click="clickBreadcrumb(1)">Doors, grab poles and floor markings
                </b-col>
                <b-col class="breadItem" id="breadcrumb3" v-bind:class="[checkSelected(2), checkCompleted(2)]"
                       v-on:click="clickBreadcrumb(2)">Centre grab poles
                </b-col>
                <b-col class="breadItem" id="breadcrumb4" v-bind:class="[checkSelected(3), checkCompleted(3)]"
                       v-on:click="clickBreadcrumb(3)">Bike racks
                </b-col>
                <b-col class="breadItem" id="breadcrumb5" v-bind:class="[checkSelected(4), checkCompleted(4)]"
                       v-on:click="clickBreadcrumb(4)">Priority Seats
                </b-col>
                <b-col class="breadItem" id="breadcrumb6" v-bind:class="[checkSelected(5), checkCompleted(5)]"
                       v-on:click="clickBreadcrumb(5)">Lower side wall
                </b-col>
                <b-col class="breadItem" id="breadcrumb7" v-bind:class="[checkSelected(6), checkCompleted(6)]"
                       v-on:click="clickBreadcrumb(6)">End wall design
                </b-col>
                <b-col class="lastMenuCol breadItem" id="breadcrumb8"
                       v-bind:class="[checkSelected(7), checkCompleted(7)]" v-on:click="clickSummaryBreadcrumb(7)">Summary
                </b-col>
            </b-row>

            <b-row align-v="center" class="surveyBreadcrumb mobileMenu">
                <!--             <b-col @click="moveMobileMenuL()">Left</b-col>-->
                <b-col class="breadItem mobileBread"
                       id="mobileBreadcrumb1"
                       v-bind:class="[ checkSelected(0), checkCompleted(0), checkCentreMobile(0)] " v-on:click="clickBreadcrumb(0)">Floor, seats and glass partitions
                </b-col>
                <b-col class="breadItem mobileBread"
                       id="mobileBreadcrumb2"
                       v-bind:class="[ checkSelected(1), checkCompleted(1) , checkCentreMobile(1)]" v-on:click="clickBreadcrumb(1)">Doors, grab poles and floor
                    markings
                </b-col>
                <b-col class="breadItem mobileBread"
                       id="mobileBreadcrumb3"
                       v-bind:class="[ checkSelected(2), checkCompleted(2), checkCentreMobile(2)]" v-on:click="clickBreadcrumb(2)">Centre grab poles
                </b-col>
                <b-col class="breadItem mobileBread" id="mobileBreadcrumb4"
                       v-bind:class="[ checkSelected(3),checkCompleted(3), checkCentreMobile(3)]" v-on:click="clickBreadcrumb(3)">Bike racks
                </b-col>
                <b-col class="breadItem mobileBread" id="mobileBreadcrumb5"
                       v-bind:class="[ checkSelected(4),checkCompleted(4), checkCentreMobile(4)]" v-on:click="clickBreadcrumb(4)">Priority seats
                </b-col>
                <b-col class="breadItem mobileBread" id="mobileBreadcrumb6"
                       v-bind:class="[ checkSelected(5),checkCompleted(5), checkCentreMobile(5)]" v-on:click="clickBreadcrumb(5)">Lower side wall
                </b-col>
                <b-col class="breadItem mobileBread" id="mobileBreadcrumb7"
                       v-bind:class="[ checkSelected(6),checkCompleted(6), checkCentreMobile(6)]" v-on:click="clickBreadcrumb(6)">End wall design
                </b-col>
                <b-col class="breadItem mobileBread"
                       id="mobileBreadcrumb8"
                       v-bind:class="[ checkSelected(7), checkCompleted(7), checkCentreMobile(7)]" v-on:click="clickSummaryBreadcrumb(7)">Summary
                </b-col>
                <!--             <b-col @click="moveMobileMenuR()">Right</b-col>-->
                <b-col v-show="this.welcomeScreen === false">
                    <div>
                        <b-dropdown no-caret toggle-class="text-decoration-none">
                            <template v-slot:button-content>
                                <b-icon icon="three-dots"></b-icon>
                            </template>
                            <b-dropdown-item v-on:click="clickBreadcrumb(0)" class="dropdownBreadcrumb" v-bind:class="formatBreadcrumbDropdown(0)">Floor, seats and glass partitions</b-dropdown-item>
                            <b-dropdown-item v-on:click="clickBreadcrumb(1)" class="dropdownBreadcrumb" v-bind:class="formatBreadcrumbDropdown(1)">Doors, grab poles and floor markings</b-dropdown-item>
                            <b-dropdown-item v-on:click="clickBreadcrumb(2)"  class="dropdownBreadcrumb" v-bind:class="formatBreadcrumbDropdown(2)">Centre grab poles</b-dropdown-item>
                            <b-dropdown-item v-on:click="clickBreadcrumb(3)" class="dropdownBreadcrumb" v-bind:class="formatBreadcrumbDropdown(3)">Bike racks</b-dropdown-item>
                            <b-dropdown-item v-on:click="clickBreadcrumb(4)" class="dropdownBreadcrumb" v-bind:class="formatBreadcrumbDropdown(4)">Priority seats</b-dropdown-item>
                            <b-dropdown-item v-on:click="clickBreadcrumb(5)" class="dropdownBreadcrumb" v-bind:class="formatBreadcrumbDropdown(5)">Lower side wall</b-dropdown-item>
                            <b-dropdown-item v-on:click="clickBreadcrumb(6)" class="dropdownBreadcrumb" v-bind:class="formatBreadcrumbDropdown(6)">End wall design</b-dropdown-item>
                            <b-dropdown-item v-on:click="clickBreadcrumb(7)" class="dropdownBreadcrumb" v-bind:class="formatBreadcrumbDropdown(7)">Summary</b-dropdown-item>
                        </b-dropdown>
                    </div>

                </b-col>
            </b-row>

            <b-row v-if="welcomeScreen">
                <SurWelcome @finishedWelcome="welcomeScreen=false"></SurWelcome>
            </b-row>

            <span v-if="!summary && !welcomeScreen">
        <b-row
                :key="qindex"
                v-for="(question, qindex) in this.questions"
                v-show="screens[qindex]"
        >
          <SurveyQuestion
                  :answers="configAnswers"
                  :index="qindex"
                  :question="question"
          ></SurveyQuestion>

        </b-row>
      </span>

            <b-row v-if="summary && !welcomeScreen">
                <SurSummary></SurSummary>
            </b-row>


        </b-container>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    // @ is an alias to /src
    import SurveyQuestion from '@/components/SurveyQuestion.vue'
    // import PrivacyNotice from '@/components/PrivacyNotice.vue'
    import SurSummary from '@/components/SurSummary.vue'
    import router from "../router";
    import SurWelcome from "../components/SurWelcome";
    import MainHeader from '@/components/MainHeader.vue';

    export default {
        name: 'Home',
        components: {
            SurWelcome,
            SurveyQuestion,
            // PrivacyNotice,
            SurSummary,
            MainHeader,
        },
        data() {
            return {
                selections: [],
                welcomeScreen: true,
                screens: [
                    true,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                ]
            }
        },
        computed: {
            ...mapState([
                'questions',
                'index',
                'configAnswers'
            ]),
            ...mapGetters([
                'privacyNotice',
                'getConfigAnswers',
                'getUuid'
            ]),
            summary: function () {
                // view summary when question index shows the user has passed the final question
                return this.index >= this.questions.length;
            }
        },
        methods: {
            ...mapMutations([
                'setIndex'
            ]),
            toggleScreen(qindex) {
                this.screens[qindex] = !this.screens[qindex]
            },
            nextScreen(qindex) {
                if (qindex >= this.screens.length - 1) {
                    console.log("Endwall")
                } else {
                    this.toggleScreen(qindex)
                    this.toggleScreen(qindex + 1)
                }
            },
            prevScreen(qindex) {
                if (qindex > 0) {
                    this.toggleScreen(qindex)
                    this.toggleScreen(qindex - 1)
                } else {
                    console.log("Can't decrement as:", qindex)
                }
            },
            moveMobileMenul(breadcrumbIndex) {
                if (breadcrumbIndex !== 0) {
                    // make currently highlighted breadcrumb disapear

                    // show previous breadcrumb
                }

            },
            goToScreen(qindex) {
                // Disable all other screens and enable specified screen
                let i, n = this.screens.length
                for (i = 0; i < n; ++i) {
                    this.screens[i] = false
                }
                this.screens[qindex] = true
            },
            checkSelected: function (breadcrumbIndex) {
                if (breadcrumbIndex === 7 && this.summary === true) {
                    //highlight summary
                    return 'breadSelected';  // Delicious :-D
                }
                // don't highlight first breadcrumb until welcome screen is completed
                else if (breadcrumbIndex === 0 && this.welcomeScreen === false && this.index === breadcrumbIndex) {
                    return 'breadSelected';
                } else if (breadcrumbIndex !== 0 && this.index === breadcrumbIndex) {
                    return 'breadSelected';
                }
            },
            checkCompleted: function (breadcrumbIndex) {
                const answers = this.getConfigAnswers;
                // if answer is stored, apply different class to breadcrumb item
                if (answers[breadcrumbIndex] !== undefined) {
                    return 'qAnswered';
                }
            },
            formatBreadcrumbDropdown(breadcrumbIndex) {
                const answers = this.getConfigAnswers;
                // current breadcrumb
                if (breadcrumbIndex === this.index) {
                    return 'active';
                }

                // if answer is stored, apply different class to breadcrumb item
                if (answers[breadcrumbIndex] === undefined) {
                    return 'disabled';
                }
            },
            checkCentreMobile(breadcrumbIndex) {
                if (breadcrumbIndex === 7 && this.summary === true) {
                    //highlight summary
                    return 'displayBread';  // Delicious :-D
                }
                // don't highlight first breadcrumb until welcome screen is completed
                else if (breadcrumbIndex === 0 && this.welcomeScreen === false && this.index === breadcrumbIndex) {
                    return 'displayBread';
                } else if (breadcrumbIndex !== 0 && this.index === breadcrumbIndex) {
                    return 'displayBread';
                }
            },
            clickBreadcrumb(breadcrumbIndex) {
                console.log(breadcrumbIndex)
                // navigate to previously completed questions but not current index or uncompleted questions
                if (breadcrumbIndex !== this.index && this.configAnswers[breadcrumbIndex] !== undefined) {
                    this.setIndex(breadcrumbIndex);
                    this.goToScreen(breadcrumbIndex)
                }
            },
            clickSummaryBreadcrumb() {
                console.log('survey clicked');
                // Navigate to summary if the user has answered all questions
                if (this.surveyComplete()) {
                    this.setIndex(this.questions.length);
                }
            },
            surveyComplete() {
                for (const answer in this.getConfigAnswers) {
                    if (Object.prototype.hasOwnProperty.call(this.getConfigAnswers, answer)) {
                        if (this.getConfigAnswers[answer] === undefined) {
                            console.log('survey incomplete');
                            return false;
                        }
                    }
                }
                console.log('survey complete');
                return true;
            },
            goTo(route) {
                router.push(route);
            },
            moveMobileMenuL() {
                this.prevScreen(this.index);
                console.log('move to' + this.index - 1);
            },
            async analyticsPost() {
                // google analytics post

                const measurementID = process.env.VUE_APP_GA_ID;
                // const clientID = this.$cookies.get('mfsid');
                const clientID = this.getUuid;
                const page = this.$route.path;
                const pageName = this.$route.name;
                const documentHost = location.host;

                const fullURL = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=' + measurementID + '&cid=' + clientID + '&t=pageview&dh=' + documentHost + '&dp=' + page + '&dt=' + pageName;
                this.axios.post(fullURL);
            },
        },

        async mounted() {
            this.axios.get(`${process.env.VUE_APP_API_URL}/api/get-session`)

            this.analyticsPost()

            
        }
    }

</script>

<style lang="scss">

    #logo {
        height: 4em;
    }

    .calvert {
        font-family: Calvert, serif;
    }


    .privacy-text {
        border: 1px solid #000;
    }

    .surveyBreadcrumb {
        // padding: 1em;
        background-color: #00000029;
        font-size: small;
    }


    /*breadcrumb dropdown formatting*/



    li.dropdownBreadcrumb.disabled a {
        color: #6c757d;
        cursor: auto!important;
    }

    li.dropdownBreadcrumb.active a {
        color: black;
        font-weight: bold;
        border-bottom: 1px solid #FEC600;
    }

    // for mobiles, only show current breadcrumb in screen centre
    .mobileBread {
        display: none;
    }

    .displayBread {
        display: flex;
    }

    .hideBread {
        display: none;
    }

    .breadItem {
        font-family: "Open Sans", sans-serif;
        padding: 1em;
        color: grey;
    }

    .personasLink {
        border-bottom: 1px solid #FEC600;
        cursor: pointer;
    }

    .breadItem.breadSelected {
        /*  todo remove space between yellow line and bottom edge of grey bar*/
        border-bottom: 4px solid #FEC600;
        color: black;
        font-weight: bold;
    }



    /*class to add to breadcrumb items to show question has been completed so is now clickable*/
    .qAnswered {
        color: black;
        cursor: pointer;
    }

    .mobileMenu {
        display: flex;
    }

    @media only screen and (max-width: 764px) {
        .fullScreenMenu {
            display: none;
        }

    }

    @media only screen and (min-width: 765px) {
        /*centre menu columns on larger screens*/
        .firstMenuCol {
            margin-left: 4em;
        }

        .lastMenuCol {
            margin-right: 4em;
        }
        .mobileMenu {
            display: none;
        }


    }
</style>
