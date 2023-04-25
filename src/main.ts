import { createApp } from 'vue';
import InstantSearch from 'vue-instantsearch/vue3/es';
import Oruga from '@oruga-ui/oruga-next';
import { bulmaConfig } from '@oruga-ui/theme-bulma';
import '@oruga-ui/theme-bulma/dist/bulma.css';
import App from './App.vue';
import router from './router';

require('@/assets/main.scss');

const app = createApp(App);
app.use(InstantSearch);
app.use(Oruga, bulmaConfig);
app.use(router).mount('#app');
