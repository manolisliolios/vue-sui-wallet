import {ref} from "vue";
import {
    getWalletProviderAPI,
    localStorageKeys,
    logout,
    requestWalletPermissions, verifyWalletPermissions,
    walletProviders
} from "./helpers/wallet";

export { default as SuiConnectButton } from './components/SuiConnectButton.vue';
export { useSuiWallet } from './composables/useSuiWallet';

export default {
    install: (app, options) => {
        app.provide("authProvider", ref(localStorage.getItem(localStorageKeys.provider) || null));
        app.provide("authAccount", ref(localStorage.getItem(localStorageKeys.address) || null));
        app.provide("suiWalletProviders", walletProviders);
        app.provide("requestWalletPermissions", requestWalletPermissions);
        app.provide("suiWallet", getWalletProviderAPI);
        app.provide("suiWalletLogout", logout);
        app.provide("suiVerifyWalletPermissions", verifyWalletPermissions);
    },
}
