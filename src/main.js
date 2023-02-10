import { createApp } from 'vue'
import App from './App.vue'

// import VueSuiWallet from "../lib/main";
import './assets/main.css'

import VueSuiWallet from "../dist/vue-sui-wallet.es"
import styles from "../dist/style.css";

const app = createApp(App);
app.use(VueSuiWallet);

app.mount('#app');

