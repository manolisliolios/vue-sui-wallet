# Vue Sui Wallet

[Explore the code on Github](https://github.com/manolisliolios/vue-sui-wallet) |
[View example](https://vue-sui-wallet.liosoftware.com/)

![](https://admin.edl.gr/uploads/sui_wallet_adapter_v3_7e3cec7f1d.gif)

A simple login/logout button that works with Vue3 & Sui Wallets (support all sui-kit based wallets).

It exposes the functionality of the wallet in an easy to use composable. 
You can also inject the functionality if you are using the Options API.

It saves the connected wallet address and is persistent on app restarts (Similar to "log in/logout" auth behavior).

[//]: # (>  **Wallet is compatible with wallet-standard.**)

## Table of Contents

1. [Installation](#installation)
2. [Features](#features)
   1. [Login Button](#login-button)
   2. [Access logged in account, provider and API](#access-logged-in-account-provider-and-api)
   3. [Options Api](#options-api)
   4. [Client State](#client-state-account-provider)
3. [Sui Wallet API](#sui-wallet-api)
   1. [Optional Variables](#explaining-optional-in-variables)
   2. [Example](#example-of-usage)
4. [Props available](#props-available)
   1. [SuiConnectButton](#suiconnectbutton)

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

[Find a list of the button's props here](#props-available)

### Access logged in account, provider and API

You can use the composable inside your `<script setup>` using the following code.

```
const {suiWallet, account, provider} = useSuiWallet();
```

Scroll to [Sui Wallet API](#sui-wallet-api) section to view more information.


### Options API

If you are not using the composition API, you can still inject all the variables that are provided by this plugin.

The following variables are available:

| Variable               | Description                                                                                   |
|------------------------|-----------------------------------------------------------------------------------------------|
| suiProvider: String    | The wallet provider's name (any of the available ones) that the authentication happened with. |
| suiAddress: String     | The sui address of the user that was authenticated.                                           |                                                                                                                                                                                                                                  |
| suiWallet: Object      | The list of wallet available functions listed [here](#sui-wallet-api).                        |
| walletProviders: Array | A list of wallet providers that are wallet-standard.                                          | 


This is an example of how the "useSuiWallet" composable injects these variables.
```
const provider = inject("suiAuthProvider");
const account = inject("suiAuthAccount");
const suiWallet = inject("suiWallet");
const walletProviders = inject("suiWalletProviders");
```

### Client State (account, provider)

Upon authentication, the system saves 2 variables in the localStorage that you can use
at any point.

| Variable     | Description                                          |
|--------------|------------------------------------------------------|
| sui.address  | The address of the authenticated wallet.             |
| sui.provider | The provider's name used to authenticate the wallet. |


## Sui Wallet API

You can easily use the sui wallet API by importing it like:

```
const {suiWallet} = useSuiWallet();
```

Then, you can call any of the functions that sui wallet extension has.

| Function                                         | Description                                                                                                                     |
|--------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| login(provider)                                  | Initializes the login behavior using the provider and if it's successful, it maintains the logged in state client-side.         |
| logout()                                         | Removes state information from client and calls disconnect functionality if it exists on the wallet features. |
| signAndExecuteTransaction({kind:optional, data}) | The de-facto way to send a transaction. "kind" has `default` value of `moveCall`.                                               |
| getAccount()                                     | Returns the available account of the active wallet. Throws error if it doesn't exist.                                           |
| connect(provider)                                | You can call this to execute the "standard:connect" functionality of a provided provider                                        |

### Example of usage

Using the composable as it follows, you can Mint an NFT by SUI.

```
// This will work only if you are already logged in using your wallet.
// Otherwise, an Error is thrown.

const {suiWallet} = useSuiWallet();

suiWallet.signAndExecuteTransaction({
  data:{
    packageObjectId: '0x0000000000000000000000000000000000000002',
    module: 'devnet_nft',
    function: 'mint',
    typeArguments: [],
    arguments: ["Example NFT","An NFT created by Sui Wallet",
      "ipfs://QmZPWWy5Si54R3d26toaqRiqvCH7HkGdXkxwUgCm2oKKM2?filename=img-sq-01.png"],
    gasBudget: 5000
  }}
).then(res=>{
  alert('Transaction completed successfully. <br>' +res.certificate.transactionDigest+ '')
  console.log(res);
}).catch(e=>{
  console.log(e);
});

```


## Props available

### SuiConnectButton

| Variable                     | Description                                                                                                      |
|------------------------------|------------------------------------------------------------------------------------------------------------------|
| startToggled: Boolean        | Controls whether the "select a wallet provider" modal is active or not upon rendering. Default value is `false`. |
| showInformationText: Boolean | Controls whether the information (wallet/address) will show in the left of the logout button                     |
| connectedWalletText: String  | Default value is `Connected Wallet`                                                                              |
| addressText: String          | Default value is `Address`                                                                                       |
| connectText: String          | Default value is `Connect Your Wallet`                                                                           |
| logoutText: String           | Default value is `Logout`                                                                                        |
| chooseProvider: String       | Default value is `Select wallet provider:`                                                                       |
| connect: String              | Default value is ``                                                                                              |
| noWalletExtensionInstalled: String              | Default value is `No wallet extensions found. Maybe try Sui's default one?`                                        |