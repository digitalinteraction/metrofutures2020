export default {
  acknowledgePrivacy(state) {
    state.privacyNotice = true
  },
  incrementIndex(state) {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
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
    state.configAnswers[answer.q_id] = answer.option;
  }
}
