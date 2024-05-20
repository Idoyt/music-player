import {createStore} from 'vuex';

const audioModule = {
  namespaced: true,
  state: {
    audioCurrentTime: -1,
    userInfo: {
      'email': null,
      'username': null,
      'avatar_url': null,
      'is_creator': null,
      'follower_id_list': [],
      'following_id_list': [],
      'dislikes_music': [],
      'dislikes_list': [],
    },

    busPlaylist: [1],
    busPlaylistPointer: 0,

    navigateTo: {
      component: 'recommendationPage',
      data: {},
    },
  },
  mutations: {
    updateAudioCurrentTime(state, domCurrentTime) {
      state.audioCurrentTime = parseFloat(domCurrentTime.toFixed(2));
    },
    updateUserInfo(state, data) {
      if (data !== undefined) {
        Object.keys(data).forEach(function(key) {
          state.userInfo[key] = data[key];
        });
      }
    },
    updateNavigate(state, {to, data}) {
      state.navigateTo.component = to;
      state.navigateTo.data = data;
    },
  },
};

export default createStore({
  strict: true,
  modules: {
    audioModule,
  },
});
