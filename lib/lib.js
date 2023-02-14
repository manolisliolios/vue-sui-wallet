import {ref} from "vue";

import SuiConnectButton from "./components/SuiConnectButton.vue";
import SuiWallet, {localStorageKeys} from "./helpers/SuiWallet";

export default {
    install: (app, options) => {
        app.provide("suiAuthProvider", ref(localStorage.getItem(localStorageKeys.provider) || null));
        app.provide("suiAuthAccount", ref(localStorage.getItem(localStorageKeys.address) || null));
        app.provide("suiWallet", SuiWallet);

        // register component globally
        app.component('sui-connect-button', SuiConnectButton);

    },
}

export {useSuiWallet} from "./composables/useSuiWallet";