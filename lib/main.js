import {ref} from "vue";
import {
    getWalletProviderAPI,
    localStorageKeys,
    logout,
    requestWalletPermissions, verifyWalletPermissions,
    walletProviders
} from "./helpers/wallet";

import SuiConnectButton from "./components/SuiConnectButton.vue";
export {useSuiWallet} from "./composables/useSuiWallet";

export default {
    install: (app, options) => {
        app.provide("suiAuthProvider", ref(localStorage.getItem(localStorageKeys.provider) || null));
        app.provide("suiAuthAccount", ref(localStorage.getItem(localStorageKeys.address) || null));
        app.provide("suiWalletProviders", walletProviders);
        app.provide("suiRequestWalletPermissions", requestWalletPermissions);
        app.provide("suiWallet", getWalletProviderAPI);
        app.provide("suiWalletLogout", logout);
        app.provide("suiVerifyWalletPermissions", verifyWalletPermissions);

        // register component globally
        app.component('sui-connect-button', SuiConnectButton);

    },
}
