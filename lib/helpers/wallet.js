import {ethos_logo, logo} from "../components/icons";

export const localStorageKeys = {
    provider: 'sui.provider',
    address: 'sui.address'
}

export const requestWalletPermissions = async ({provider, walletProviders}) => {
    // if we don't have the wallet extension installed, redirect the user to the extension page.
    if(!window[provider]) return window.open(walletProviders[provider].url, '_blank').focus();

    return window[provider].requestPermissions().then( ()=>{
        return window[provider].getAccounts().then(accounts => {
            localStorage.setItem(localStorageKeys.provider, provider);
            localStorage.setItem(localStorageKeys.address, accounts[0]);
            return {
                provider: provider,
                userAddress: accounts[0]
            }
        });

    }).catch(e=>{
        return{
            error: `You need to give ${walletProviders[provider].title} permissions to continue`,
            userAddress: null
        }
    });
}

// check wallet permissions. We might already have a wallet address but our permissions
// are revoked by the wallet interface.
export const verifyWalletPermissions = async () => {
    const status = {isLoggedIn: false}

    // get saved provider from localstorage
    let provider = localStorage.getItem(localStorageKeys.provider);

    // return logged of status if window provider is not defined.
    if(!provider || !window[provider]) return status;

    return window[provider].hasPermissions().then(res=>{
        if(!res) return status;
        status.isLoggedIn = true;
        return status;
    }).catch(e=>{
        return status;
    });
}


// removes authentication from localStorage!
export const logout = () => {
    localStorage.removeItem(localStorageKeys.provider);
    localStorage.removeItem(localStorageKeys.address);
}


// returns the active provider's API if it exists.
export const getWalletProviderAPI = () => {
    let provider = localStorage.getItem(localStorageKeys.provider);
    if(provider) return window[provider]
    return null;

}

export const walletProviders = {
    suiWallet: {
        key: 'suiWallet',
        title: 'Sui Wallet',
        logo: logo,
        url: 'https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil'
    },
    ethosWallet: {
        key: 'ethosWallet',
        title: 'Ethos Wallet',
        logo: ethos_logo,
        url: 'https://chrome.google.com/webstore/detail/ethos-sui-wallet/mcbigmjiafegjnnogedioegffbooigli'
    }
}