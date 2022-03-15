import questions from "@/data/survey.js"
import pano_data from "@/data/pano_data.js"
import personas from "@/data/personas.js"
import personaStages from "@/data/persona_data.js"
import findings from "@/data/findings.js"
import likertFindings from "@/data/likert_findings.js"
import journeyComments from "@/data/journey_comments.js"
import { uuid } from 'vue-uuid';

export default {
    uuid: uuid.v1(),  // Sent to GA for tracking sessions
    questions,
    pano_data: pano_data[0],
    personas,
    personaStages,
    index: 0,
    configAnswers: {
        0: 2,
        1: 1,
        2: 1,
        3: 2,
        4: 0,
        5: 1,
        6: 2,
    },
    privacyNotice: false,  // Privacy and terms
    demographic: false,  // Mandatory demographics
    infoFormDone: false,  // The optional part of demographic info
    welcomeModal: true,  // Disaply the welcome modal on menu,
    findings,
    likertFindings,
    journeyComments,
}
