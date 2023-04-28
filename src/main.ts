import { createApp } from 'vue';
import InstantSearch from 'vue-instantsearch/vue3/es';
import Oruga from '@oruga-ui/oruga-next';
import { bulmaConfig } from '@oruga-ui/theme-bulma';
import '@oruga-ui/theme-bulma/dist/bulma.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/* import specific icons */
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';

require('@/assets/main.scss');

/* add icons to the library */
library.add(faHeart);

const app = createApp(App);
app.use(InstantSearch);
app.use(Oruga, bulmaConfig);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router).mount('#app');
