import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import axios from '@/plugins/axios';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

// Initialize Pinia
app.use(createPinia());

// Initialize Router
app.use(router);

// Initialize Vuetify
app.use(vuetify);

// Initialize Vue3Toastify
app.use(Vue3Toastify, { autoClose: 3000, position: 'top-right' });

// Provide axios instance
app.provide('axios', axios);

app.mount('#app');
