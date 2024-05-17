import {createApp} from 'vue';
import App from './App.vue';
import router from '@/router/router.config';
import {initPlayer} from '@/utils/music_play_bus';
import audioManager from '@/store/audio_manager';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

initPlayer().then((r) => {});
createApp(App).use(router).use(audioManager).use(ElementPlus).mount('#app');
