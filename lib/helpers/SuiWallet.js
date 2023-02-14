import walletProviders from "./walletProviders";

export const localStorageKeys = {
    provider: 'sui.provider',
    address: 'sui.address'
}

const SuiWallet = {

    /*
        If the wallet is not installed or the provider is not valid, return false;
        In the first case, we also redirect the user to chrome page.
    */
    verifyWalletIsValidAndInstalled: ( provider ) => {
        // Verify that the provider is valid and exists in the provider's list supplied.
        if (!provider || !walletProviders[provider]) return false;

        // If the chrome extension is not installed, we redirect the user to the extension installation page.
        if (!SuiWallet.api(provider)){
            window.open(walletProviders[provider]?.url, '_blank').focus();
            return false;
        }

        return true;
    },

    /*
        A function to logout users from the Sui Wallet.
        We just remove the keys from localStorage and we can consider it logged out.
     */
    logout: () => {
        localStorage.removeItem(localStorageKeys.provider);
        localStorage.removeItem(localStorageKeys.address);
    },

    /*
        A function to return a list of active accounts of the wallet.
     */
    getAccounts: async (provider) => {
        if(!SuiWallet.api(provider)) return {error: "You cannot execute this without being logged in."}
        return SuiWallet.api(provider).getAccounts();
    },

    /*
        Checks if the client has wallet permissions.
        Returns false if the provider is not specified or if the wallet returns false.
     */
    hasPermissions: async (provider = null) => {

        const status = {isLoggedIn: false};
        const api = SuiWallet.api(provider);

        if(!api) return status;

        try{
            const hasPermissions = await api.hasPermissions();
            if(hasPermissions) status.isLoggedIn = true;
            return status;
        }catch(e){
            return status;
        }


    },

    /*
        Signs and executes a smart contract transaction.
     */
    signAndExecuteTransaction: async ({provider, kind = "moveCall", data}) => {

        const api = SuiWallet.api(provider);

        // if we can't find the provider
        if(!api) throw new Error("Provider connection is not active.");

        return api.signAndExecuteTransaction({
            kind: kind,
            data: data
        });
    },


    /*
        Requests wallet permissions.
     */
    requestPermissions: async (provider) => {

        if(!SuiWallet.verifyWalletIsValidAndInstalled(provider)) {
            return false;
        }

        return SuiWallet.api(provider).requestPermissions();
    },

    /*
        Tries to connect the client to the wallet and get a valid wallet address.

        1. Saves the client account in localStorage if it's valid and returns the data
        2. Redirects to the wallet address if the wallet is valid (included in the list).

     */
    login: async ({provider}) => {

        // we request permissions.
        try{
            const hasPermissions = await SuiWallet.requestPermissions(provider);
            if(!hasPermissions) throw new Error();

            const accounts = await SuiWallet.getAccounts(provider);

            if(!accounts) throw new Error();

            localStorage.setItem(localStorageKeys.provider, provider);
            localStorage.setItem(localStorageKeys.address, accounts[0]);

            return {
                provider: provider,
                userAddress: accounts[0]
            }

        }catch(e){
            return {
                error: `You need to give ${walletProviders[provider].title} permissions to continue.`,
                userAddress: null
            };
        }

    },

    /*
        Returns an api reference to the window extension.
        If provider is not supplied, check for the loggedIn provider state.
     */
    api(provider = null){
        return window[provider || localStorage.getItem(localStorageKeys.provider)] || null;
    }
}

export default SuiWallet;