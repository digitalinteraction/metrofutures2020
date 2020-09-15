import questions from "@/data/survey.js"
import pano_data from "@/data/pano_data.js"

export default {
    questions,
    pano_data: pano_data[0],
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
    }

}
