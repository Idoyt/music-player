import {createApp} from 'vue';
import App from './App.vue';
import router from '@/router/router.config';
import {initPlayer} from '@/utils/music_play_bus';
import audioManager from '@/store/audio_manager';
// import {useStore} from 'vuex';

// const store = useStore();
// if (!store.state.audioModule.loadedMainJs) {
//   initPlayer();
//   console.log('created a new Vue ');
//   createApp(App).use(router).use(audioManager).mount('#app');
//   store.commit('audioModule/updateLoadedMainJs');
// }
initPlayer().then((r) => {});
createApp(App).use(router).use(audioManager).mount('#app');
