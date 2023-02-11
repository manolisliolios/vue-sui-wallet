<script setup>


// import SuiConnectButton from "../dist/vue-sui-wallet.es"

// import SuiConnectButton from "../lib/components/SuiConnectButton.vue"
import {useSuiWallet} from "../dist/vue-sui-wallet.es";
const suiWallet = useSuiWallet();

console.log(suiWallet)

const testWallet = () => {
  console.log(suiWallet.suiWallet);
}
// const wallet = suiWallet();
//

</script>

<template>
  <div>
    <div style="justify-content: end;display:flex;">
      <sui-connect-button></sui-connect-button>
    </div>
    <button @click="testWallet">test wallet</button>
  </div>

</template>

