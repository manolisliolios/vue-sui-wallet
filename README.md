# Vue Sui Wallet

[Explore the code on Github](https://github.com/manolisliolios/vue-sui-wallet)

A simple login/logout button that works with Vue3 & Sui/Ethos Wallet.

It saves the connected wallet address and is persistent on app restarts (Similar to "log in/logout" auth behavior).

**IMPORTANT NOTE:** This plugin doesn't wrap the API calls of the wallet. It only provides a reference
to the `window.suiWallet` or `window.ethosWallet`. It needs a bit more effort to get it to 
actually be a complete wallet wrapper. I might eventually do it once I have some free time.


![](https://admin.edl.gr/uploads/readme_video_f5de174a57.gif)

## Installation

1. Add the following code in the main.js file

```
import VueSuiWallet from "vue-sui-wallet";
import "../node_modules/vue-sui-wallet/dist/style.css";

// this can be safely skipped if already in your main.js
const app = createApp(App);

app.use(VueSuiWallet);

// this is probably skipped, it should be on your main.js file.
app.mount('#app')
```
## Features

### Login Button

The component is global, you don't need to import it per-component.
You can render it using the following code.

```
<sui-connect-button></sui-connect-button>
```

### Access current account and API

You can use the composable inside your "script setup" using the following code.

```
const suiWallet = useSuiWallet();
```

This composable exposes all the variables that are listed below. 
The syntax varies for simplicity of use (of the composable).

The `sui` prefix is used on all `provided` data to prevent namespace pollution.

### If you are not using the composition API

If you are not using the composition API, you can still inject all the variables that are provided by this plugin.

The following variables are available:

| Variable                                                           | Description                                                                                                                                                                                                                                                                                     |
|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| suiAuthProvider: String                                            | The wallet provider (sui wallet or ethos wallet) that the authentication happened with.                                                                                                                                                                                                         |
| suiAuthAccount: String                                             | The sui address of the user that was authenticated.                                                                                                                                                                                                                                             |
| suiWalletProviders: Array                                          | A list of supported sui wallet providers with their logos and window reference.                                                                                                                                                                                                                 |
| suiRequestWalletPermissions({provider, walletProviders}): Function | Call this to request permissions from the provider of your choice.<br/>This accepts 2 parameters, the "walletProviders" and the "provider" (the selected one)                                                                                                                                   |
| suiWalletLogout(): Function                                        | Logs the wallet out and clears authentication.                                                                                                                                                                                                                                                  |
| suiWallet(): Function                                              | If the wallet is authenticated, it returns a reference to access the extension. If not, it returns `null`.                                                                                                                                                                                        |
| suiVerifyWalletPermissions(): Function                             | If the user is authenticated (meaning that the localStorage contains a user object), it verifies that the permissions are not revoked by the wallet and the user is still active.<br/>This runs automatically after load of the client, if you use the button somewhere inside the application. |


This is an example of how the "useSuiWallet" composable injects these variables.

```
const provider = inject("suiAuthProvider");
const account = inject("suiAuthAccount");
const suiWalletProviders = inject("suiWalletProviders");
const requestWalletPermissions = inject("suiRequestWalletPermissions");
const logout = inject("suiWalletLogout");
const suiWallet = inject("suiWallet");
const verifyPermissions = inject("suiVerifyWalletPermissions");
```
Upon authentication, the system saves 2 variables in the localStorage that you can use
at any point.

| Variable     | Description                                   |
|--------------|-----------------------------------------------|
| sui.address  | The address of the authenticated wallet.      |
| sui.provider | The provider used to authenticate the wallet. |



## Props available

### SuiConnectButton:

| Variable                     | Description                                                                      |
|------------------------------|----------------------------------------------------------------------------------|
| startToggled: Boolean        | Controls whether the "select a wallet provider" modal is active or not upon rendering. Default value is `false`. |
| showInformationText: Boolean | Controls whether the information (wallet/address) will show in the left of the logout button |
| connectedWalletText: String  | Default value is `Connected Wallet`                                              |
| addressText: String          | Default value is `Address`                                                       |
| connectText: String          | Default value is `Connect Your Wallet`                                           |
| logoutText: String           | Default value is `Logout`                                                        |
| chooseProvider: String       | Default value is `Select wallet provider:`                                        |
| connect: String              | Default value is ``                                                          |


### Sui Wallet API

You can easily use the sui wallet API by importing it like:

```
const {suiWallet} = useSuiWallet();
```

Then, you can call any of the functions that sui wallet extension has.

For example:

```
const {suiWallet} = useSuiWallet();


// We always check if suiWallet() doesn't return null
// If the account is not authenticated, it returns null
// and it will break!
if(suiWallet()){
    suiWallet().getAccounts(); // that will return a list of accounts in the wallet.
    suiWallet().signAndExecuteTransaction({...params});
    suiWallet().hasPermissions();
    suiWallet().send();
}

```

A list of current functions supported.

- `getAccounts`
- `hasPermissions`
- `requestPermissions`
- `send`
- `sendAndExecuteTransaction`