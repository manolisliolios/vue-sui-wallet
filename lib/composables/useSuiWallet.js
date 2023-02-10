import {inject} from "vue";

export function useSuiWallet(){

    const provider = inject("authProvider");
    const account = inject("authAccount");
    const suiWalletProviders = inject("suiWalletProviders");
    const requestWalletPermissions = inject("requestWalletPermissions");
    const logout = inject("suiWalletLogout");
    const suiWallet = inject("suiWallet");
    const verifyPermissions = inject("suiVerifyWalletPermissions");

    return {
        suiWallet,
        verifyPermissions,
        logout,
        provider,
        suiWalletProviders,
        account,
        requestWalletPermissions
    };
}