<script setup>
import {useSuiWallet} from "vue-sui-wallet";

const {suiWallet} = useSuiWallet();

const test = () => {
  suiWallet.signAndExecuteTransaction({
        data: {
          packageObjectId: '0x0000000000000000000000000000000000000002',
          module: 'devnet_nft',
          function: 'mint',
          typeArguments: [],
          arguments: ["Example NFT", "An NFT created by Sui Wallet",
            "ipfs://QmZPWWy5Si54R3d26toaqRiqvCH7HkGdXkxwUgCm2oKKM2?filename=img-sq-01.png"],
          gasBudget: 5000
        }
      }
  ).then(res => {
    alert('Transaction completed successfully. <br>' + res.certificate.transactionDigest + '')
  }).catch(e => {
    console.log(e);
  });

}

</script>

<template>
  <div>
    <sui-connect-button></sui-connect-button>


    <div v-if="suiWallet.activeProvider" style="margin-top:30px">
      <button @click="test"> Mint an NFT</button>
    </div>

  </div>
</template>
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
