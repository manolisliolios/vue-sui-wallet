<script setup>
import {useSuiWallet} from "../dist/vue-sui-wallet.es";
const suiWallet = useSuiWallet();
const testWallet = () => {
  console.log(suiWallet.suiWallet());
}

</script>

<template>
  <div style="height:100vh;display:flex;align-items: center;justify-content: center">
<!--/*    <div style="justify-content: end;display:flex;">*/-->
      <sui-connect-button></sui-connect-button>
<!--    </div>-->
<!--    <button @click="testWallet">test wallet</button>-->
  </div>

</template>

