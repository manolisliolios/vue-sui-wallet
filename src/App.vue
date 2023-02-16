<script setup>
// import {useSuiWallet} from "../dist/vue-sui-wallet.es";
import {useSuiWallet} from "../lib/lib";

const {suiWallet, suiAddress, suiProvider} = useSuiWallet();

const testWallet = () => {

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
}

</script>

<template>
  <div style="height:100vh;display:flex;align-items: center;justify-content: center">
<!--/*    <div style="justify-content: end;display:flex;">*/-->
      <sui-connect-button></sui-connect-button>
<!--    </div>-->
    <button @click="testWallet" class="sui-login-button"> Try a transaction</button>

  </div>

</template>

