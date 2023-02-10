import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

import VueSuiWallet from "../lib/main"
// import styles from "../lib/style.css";

const app = createApp(App);
app.use(VueSuiWallet);

app.mount('#app');

