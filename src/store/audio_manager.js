import {createStore} from 'vuex';
import axios from 'axios';
import {API_BASE_URL} from '@/assets/constants';

const audioModule = {
  namespaced: true,
  state: {
    audioCurrentTime: -1,
    audioNowLine: -1,
    loginStatus: false,
    userInfo: JSON,
  },
  mutations: {
    updateAudioCurrentTime(state, domCurrentTime) {
      state.audioCurrentTime = parseFloat(domCurrentTime.toFixed(2));
    },
    updateAudioNowLine(state, nowLine) {
      state.audioNowLine = nowLine;
    },
    updateLoginState(state, status) {
      state.loginStatus = status;
      axios.get(API_BASE_URL + '/get_user_info')
          .then((response)=>{
            console.log(response);
          });
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
