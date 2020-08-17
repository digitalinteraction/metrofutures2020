export default {
  acknowledgePrivacy(state) {
    state.privacyNotice = true
  },
  incrementIndex(state) {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
    }
  }
}