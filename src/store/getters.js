export default {
    privacyNotice(state) {
        return state.privacyNotice
    },
    getInfoCompleted(state) {
        if (state.infoFormDone || state.demographic) {
            return true
        } else { 
            return false
        }
    },
    getIndex(state) {
        return state.index
    },
    getConfigAnswers(state) {
        return state.configAnswers;
    },
    getDemographic(state) {
        return state.demographic;
    }
}
