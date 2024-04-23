import {createStore} from 'vuex';

const audioModule = {
  namespaced: true,
  state: {
    audioCurrentTime: -1,
    audioNowline: -1,
    loginStatus: false,
  },
  mutations: {
    updateAudioCurrentTime(state, domCurrentTime) {
      state.audioCurrentTime = parseFloat(domCurrentTime.toFixed(2));
    },
    updateAudioNowLine(state, nowLine) {
      state.audioNowline = nowLine;
    },
    updateLoginStatus(state, status) {
      state.loginStatus = status;
    },
  },
  actions: {

  },
};

export default createStore({
  strict: true,
  modules: {
    audioModule,
  },
});
