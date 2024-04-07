import {createApp} from 'vue';
import App from './App.vue';
import router from '@/router/router.config';
import {initPlayer} from '@/utils/music_play_bus';

initPlayer();
createApp(App).use(router).mount('#app');

