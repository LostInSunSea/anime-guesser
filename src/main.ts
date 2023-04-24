import { createApp } from 'vue';
import InstantSearch from 'vue-instantsearch/vue3/es';
import App from './App.vue';
import router from './router';

require('@/assets/main.scss');

const app = createApp(App);
app.use(router).mount('#app');
app.use(InstantSearch);
