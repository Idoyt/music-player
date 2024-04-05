import {createApp} from 'vue';
import App from './App.vue';
import router from '@/router/router.config';

createApp(App).use(router).mount('#app');
