import {createStore} from 'vuex';
import {initPlayer} from '@/utils/music_play_bus';

const audioModule = {
  state: {
    audioInfo: {},
    audioList: [],
    domAudio: null,
  },
  mutations: {
    updateAudioInfo() {

    },
    addEventListener(state) {
      state.domAudio.addEventListener('loadedmetadata' );
    },

  },
  actions: {
    initAudioPlayer(context) {
      context.state.domAudio = new Audio();
      context.commit('addEventListener');
      initPlayer();
    },
  },
};

export default createStore({
  strict: true,
  modules: {
    audioModule,
  },
});
