import questions from "@/data/survey.js"
import pano_data from "@/data/pano_data.js"
import personas from "@/data/personas.js"
import personaStages from "@/data/persona_data.js"
import { uuid } from 'vue-uuid';

export default {
    uuid: uuid.v1(),
    questions,
    pano_data: pano_data[0],
    personas,
    personaStages,
    index: 0,
    privacyNotice: false,
    infoFormDone: false,
    configAnswers: {
        0: undefined,
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined
    },
    demographic: false,
    welcomeModal: true,
}
