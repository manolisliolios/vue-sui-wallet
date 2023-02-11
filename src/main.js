import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

import VueSuiWallet from "../dist/vue-sui-wallet.es"
import "../dist/style.css";

const app = createApp(App);

app.use(VueSuiWallet);

app.mount('#app');

