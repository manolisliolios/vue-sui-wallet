import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

import VueSuiWallet from "vue-sui-wallet";
import "../node_modules/vue-sui-wallet/dist/style.css";

const app = createApp(App);

app.use(VueSuiWallet);

app.mount('#app')
