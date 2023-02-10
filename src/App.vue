<script setup>


import {SuiConnectButton} from "../lib/main";
import {useSuiWallet} from "../lib/main";

const suiWallet = useSuiWallet();

</script>

<template>
  <div style="justify-content: end;display:flex;">
    <sui-connect-button></sui-connect-button>
  </div>
</template>

