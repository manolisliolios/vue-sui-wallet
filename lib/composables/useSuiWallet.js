import {inject} from "vue";

export function useSuiWallet(){

    const provider = inject("suiAuthProvider");
    const account = inject("suiAuthAccount");
    const suiWallet = inject("suiWallet");

    return {
        suiWallet,
        provider,
        account,
    };
}