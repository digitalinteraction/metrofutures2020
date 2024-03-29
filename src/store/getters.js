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
    getOnlyInfo(state) {
        return state.infoFormDone
    },
    getIndex(state) {
        return state.index
    },
    getConfigAnswers(state) {
        return state.configAnswers;
    },
    getConfigAnswerFirst(state) {
        return state.configAnswers[0]
    },
    getDemographic(state) {
        return state.demographic;
    },
    getWelcome(state) {
        return state.welcomeModal;
    },
    getPersonas(state) {
        return state.personas;
    },
    // getPersonaByName(state, name) {
    //     // state.personas.find("name")
    //     console.log("Searching for", name)
    //     return state.personas[0]
    // },
    getPersonaByName: (state) => (name) => {
        let result = state.personas.find(persona => persona.name === name)
        return result
    },
    getPersonaStages: (state) => (name) => {
        // console.log("Fetching persona stages for", name)
        let result = state.personaStages.find(persona => persona.name === name)
        // console.log(result)
        return result
    },
    getUuid(state) {
        return state.uuid;
    },
    getFindings(state) {
        return state.findings;
    },
    getFindingsByName: (state) => (name) => {
        let result = state.findings.find(finding => finding.name === name)
        return result
    },
    getLikertFindings(state) {
        return state.likertFindings;
    },
    getLikertFindingsByName: (state) => (name) => {
        let result = state.likertFindings.find(finding => finding.name === name)
        return result
    },
    getJourneyCommentsByName: (state) => (name) => {
        let result = state.journeyComments.find(finding => finding.name === name)
        return result.comments
    },
    
}
