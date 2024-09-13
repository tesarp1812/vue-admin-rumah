// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './state/main';
// import { BootstrapVue3 } from 'bootstrap-vue-3';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

// Use BootstrapVue3
// app.use(BootstrapVue3);

// Use router and pinia
app.use(router);
app.use(pinia);

app.mount('#app');
