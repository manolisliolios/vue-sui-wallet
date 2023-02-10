# Vue Sui Wallet

A simple login/logout button that works with Vue3 & Sui/Ethos Wallet.

It saves the account address that the user is connected to in the localStorage and maintains state when the app restarts.

## Installation

1. Add the following code in the main.js file

```
import VueSuiWallet from "vue-sui-wallet";
import "vue-sui-wallet/dist/style.css"; 

// this can be safely skipped if already in your main.js
const app = createApp(App);

app.use(VueSuiWallet);

// this is skipped, it should be on your main.js file.
app.mount('#app')
```
## Features

### Login Button

You can render a "connect to wallet" button using the following code:

```
// Inside script
import SuiConnectButton from "vue-sui-wallet";

// in your template
<sui-connect-button></sui-connect-button>
```
### Access current account and API

You can use the composable inside your "script setup" using the following code.
In order to use the wallet API, do the following:

```
const {suiWallet} = useSuiWallet();
```

This composable exposes all the variables that are listed below. 
The syntax varies for simplicity of use (of the composable).
the `sui` prefixed is used on most provided variables to prevent 

### If you are not using the composition API

If you are not using the composition API, you can 
still inject all the variables that are provider by this plugin.

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
