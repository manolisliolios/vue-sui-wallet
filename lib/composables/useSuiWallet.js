import {inject} from "vue";

export function useSuiWallet(){

    const provider = inject("suiAuthProvider");
    const account = inject("suiAuthAccount");
    const suiWalletProviders = inject("suiWalletProviders");
    const requestWalletPermissions = inject("suiRequestWalletPermissions");
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