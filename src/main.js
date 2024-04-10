import {createApp} from 'vue';
import App from './App.vue';
import router from '@/router/router.config';
import {initPlayer} from '@/utils/music_play_bus';
import audioManager from '@/store/audio_manager';

initPlayer();
createApp(App).use(router).use(audioManager).mount('#app');
