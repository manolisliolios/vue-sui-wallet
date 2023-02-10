import {inject} from "vue";

export function useSuiWallet(){

    const provider = inject("authProvider");
    const account = inject("authAccount");
    const suiWalletProviders = inject("suiWalletProviders");
    const requestWalletPermissions = inject("requestWalletPermissions");
    const logout = inject("suiWalletLogout");
    const getWalletProviderAPI = inject("getWalletProviderAPI");
    const verifyPermissions = inject("suiVerifyWalletPermissions");

    return {getWalletProviderAPI,
        verifyPermissions,
        logout, provider,
        suiWalletProviders,
        account,
        requestWalletPermissions};
}