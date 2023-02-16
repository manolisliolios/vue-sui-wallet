import {inject} from "vue";

export function useSuiWallet(){

    const suiWallet = inject("suiWallet");
    const walletProviders = inject("suiWalletProviders");
    const suiAddress = inject("suiAddress");
    const suiProvider = inject("suiProvider");

    return {
        suiWallet,
        walletProviders,
        suiAddress,
        suiProvider
    };
}