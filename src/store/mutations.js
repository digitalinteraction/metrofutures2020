export default {
  acknowledgePrivacy(state) {
    state.privacyNotice = true
  },
  completeInfo(state){
    state.infoFormDone = true
  },
  incrementIndex(state) {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
    } else {
      // return indicator to show end reached
      state.index = state.questions.length;
    }
  },
  reduceIndex(state) {
    if (state.index > 0) {
      state.index -= 1;
    }
  },
  setIndex(state, newValue) {
    state.index = newValue;
  },
  addConfigAnswer(state, answer) {
    // console.log('save answer ' + answer.qid + answer.option )
    state.configAnswers[answer.qid] = answer.resp;
  },
  completeDemographic(state) {
    state.demographic = true;
  },
  disableWelcomeModal(state) {
    state.welcomeModal = false;
  },
}
